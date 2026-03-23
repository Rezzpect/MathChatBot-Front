import { useState, useEffect } from "react";
import Uppy from "@uppy/core";
import supabaseClient from "../../utils/SupabaseClient";
import Tus from "@uppy/tus";
import toast from "react-hot-toast";

const anon_key = import.meta.env.VITE_ANON_KEY;
const upload_url = import.meta.env.VITE_SUPABASE_UPLOAD_URL;

export const useUppyWithSupabase = ({ bucketName, course_id }: { bucketName: string, course_id: string | undefined }) => {
    // Initialize Uppy instance only once
    const [uppy] = useState(() => new Uppy({
        restrictions: {
            allowedFileTypes: [
                'text/plain',
                'text/markdown',
                'application/pdf',
                'application/json',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ],
        },
        logger: {
            debug: () => { },
            warn: () => { },
            error: () => { } // suppress errors
        },
        onBeforeFileAdded: (currentFile) => {
            const thaiPattern = /[\u0E00-\u0E7F]/;

            if (thaiPattern.test(currentFile.name)) {
                toast.error(
                    `File "${currentFile.name}" was rejected: Thai characters are not allowed in the filename.`
                );
                return false;
            }

            return true;
        },
    }));
    // Initialize Supabase client with project URL and anon key
    useEffect(() => {
        const initializeUppy = async () => {

            // Retrieve the current user's session for authentication
            const { data: { session }, } = await supabaseClient.auth.getSession();

            uppy.use(Tus, {
                // Supabase TUS endpoint (with direct storage hostname)
                endpoint: upload_url,
                retryDelays: [0, 3000, 5000, 10000, 20000], // Retry delays for resumable uploads
                headers: {
                    authorization: `Bearer ${session?.access_token}`, // User session access token
                    apikey: anon_key, // API key for Supabase
                },
                uploadDataDuringCreation: true, // Send metadata with file chunks
                removeFingerprintOnSuccess: true, // Remove fingerprint after successful upload
                chunkSize: 6 * 1024 * 1024, // Chunk size for TUS uploads (6MB)
                allowedMetaFields: [
                    "bucketName",
                    "objectName",
                    "contentType",
                    "cacheControl",
                    "metadata",
                ], // Metadata fields allowed for the upload
                onError: (error) => console.error("Upload error:", error.message), // Error handling for uploads
            }).on("file-added", (file) => {
                // Attach metadata to each file, including bucket name and content type
                file.meta = {
                    ...file.meta,
                    bucketName, // Bucket specified by the user of the hook
                    objectName: `${course_id}/${file.name}`, // Use file name as object name
                    contentType: file.type, // Set content type based on file MIME type
                    metadata: JSON.stringify({ // custom metadata passed to the user_metadata column
                        yourCustomMetadata: true,
                    }),
                };
            }).on("upload-error", (file, error) => {
                toast.error('Failed to upload file');
            }).on("restriction-failed", (error) => {
                toast.error('Please upload supported files only: .txt .md .pdf .json .docx');
            });
        };

        // Initialize Uppy with Supabase settings
        initializeUppy();

        return () => uppy.destroy();
    }, [uppy, bucketName]);

    // Return the configured Uppy instance
    return uppy;
};
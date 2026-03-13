import ReactQuill from "react-quill-new";

export interface UploadedImage {
    url: string;
    file: File
}

export interface ExistingImage {
    url: string;
    path: string;
}

export interface EditorProps extends ReactQuill.ReactQuillProps {
    setImagesToUpload:React.Dispatch<React.SetStateAction<UploadedImage[]>>
}

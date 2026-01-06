import { useState, useRef } from "react";
import ReactQuill  from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'formula'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];

export default function RichEditor({ placeholder }: ReactQuill.ReactQuillProps) {
    const [value, setValue] = useState("");
    const quillRef = useRef<ReactQuill>(null);

    return (
        <div className="text-editor border border-neutral rounded-lg [&>div]:flex [&>div]:flex-col-reverse">

            <ReactQuill
                ref={quillRef}
                value={value}
                onChange={setValue}
                placeholder={placeholder}
                modules={{
                    toolbar: toolbarOptions
                }}

                className="
                [&_.ql-container]:rounded-t-lg
                [&_.ql-editor]:min-h-[200px]
                [&_.ql-editor]:p-4
                [&_.ql-toolbar]:rounded-b-lg
                "

            />
        </div>
    );
}
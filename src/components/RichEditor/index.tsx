import { useRef } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./quill-fix.css"
import type { EditorProps } from "../../@types/richeditor";
import toast from "react-hot-toast";

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote'],
    ['image'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],

    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'color': [] }, { 'background': [] }],          
    [{ 'align': [] }],

    ['clean']
];

const Image = Quill.import('formats/image') as any;

class CustomImage extends Image {
  static create(value: string) {
    const node = super.create(value);
    // Allow blob URLs and regular URLs through without sanitization
    node.setAttribute('src', value);
    return node;
  }

  static value(node: HTMLElement) {
    return node.getAttribute('src');
  } 

  static sanitize(url: string) {
    // Bypass Quill's built-in URL sanitizer entirely
    return url;
  }
}

CustomImage.blotName = 'image';
CustomImage.tagName = 'IMG';

Quill.register(CustomImage, true);

export default function RichEditor({ setImagesToUpload,placeholder, value, onChange, readOnly }:  EditorProps) {
    const quillRef = useRef<ReactQuill>(null);

    const imageHandler = async () => {
        if(value?.toString().includes('img')){
            toast.error('Only one image can be uploaded');
            return;
        }
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;

            const blob_url = URL.createObjectURL(file);
            setImagesToUpload((prev) => ([...prev, { url: blob_url, file: file }]));

            const quill = quillRef.current?.getEditor();
            if (!quill) return;

            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, 'image', blob_url);
            quill.setSelection(range.index + 1);
        }
    }

    return (
        <div className="text-editor border border-neutral rounded-lg [&>div]:flex [&>div]:flex-col-reverse">

            <ReactQuill
                readOnly={readOnly}
                ref={quillRef}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                modules={{
                    toolbar: {
                        container: toolbarOptions,
                        handlers: {
                            image: imageHandler,
                        }
                    }
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
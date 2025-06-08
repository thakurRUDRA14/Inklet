import { useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
    title: string;
    setTitle: (title: string) => void;
    content: string;
    setContent: (content: string) => void;
    charCount: number;
    setCharCount: (count: number) => void;
}

const Editor = ({ title, setTitle, content, setContent, charCount, setCharCount }: EditorProps) => {
    const quillRef = useRef<ReactQuill>(null);
    useEffect(() => {
        if (quillRef.current) {
            const text = quillRef.current.getEditor().getText().trim();
            setCharCount(text.length);
        }
    }, [content]);

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike", "blockquote", "code"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
        ],
        clipboard: {
            matchVisual: false,
        },
    };

    const formats = ["header", "bold", "italic", "underline", "strike", "blockquote", "code", "list", "bullet", "link"];

    return (
        <>
            <div className='space-y-2'>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Enter blog title here...'
                    className='w-full text-xl font-semibold border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-1  focus:border-transparent'
                />
            </div>
            <div className='space-y-2'>
                <div className='border border-gray-300 rounded-lg overflow-visible'>
                    <ReactQuill
                        ref={quillRef}
                        theme='snow'
                        value={content}
                        onChange={setContent}
                        placeholder='Write something amazing...'
                        modules={modules}
                        formats={formats}
                        className='h-96'
                    />
                </div>
                <div className='flex justify-between items-center text-sm text-gray-500'>
                    <div>Character count: {charCount}</div>
                </div>
            </div>
        </>
    );
};

export default Editor;

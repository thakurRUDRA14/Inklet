import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import { useGetBlogByIdQuery, useUpdateBlogMutation } from "../features/api/blogApiSlice";
import EditBlogSkeleton from "../components/skeletons/EditBlogSkeleton";
import { toast } from "react-toastify";

const EditBlog = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const {
        isLoading: isFetching,
        data,
        isError: isFetchError,
        error: fetchError,
    } = useGetBlogByIdQuery(id || "", {
        skip: !id, // Skip if no ID
        refetchOnMountOrArgChange: true,
    });

    const [updateBlog, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] = useUpdateBlogMutation();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [charCount, setCharCount] = useState(0);

    // Initialize form with fetched data
    useEffect(() => {
        if (data?.blog) {
            setTitle(data.blog.title);
            setContent(data.blog.content);
            setCharCount(data.blog.content.length);
        }
    }, [data]);

    const handlePublish = async () => {
        if (!id || !title.trim() || !content.trim()) {
            toast.warn("Title and content are required");
            return;
        }

        try {
            await updateBlog({
                id,
                updatedBlog: {
                    title,
                    content,
                },
            }).unwrap();

            toast("Blog updated successfully");
            navigate(`/blogs/${id}`);
        } catch (err) {
            console.error("Failed to update blog:", err);
            toast.error("Failed to update blog");
        }
    };

    if (isFetching) {
        return <EditBlogSkeleton />;
    }

    if (isFetchError) {
        return (
            <div className='max-w-4xl mx-auto p-6'>
                <div className='text-red-500 text-center py-10'>
                    {fetchError && "data" in fetchError
                        ? (fetchError.data as { message?: string })?.message || "Failed to load blog"
                        : "Failed to load blog"}
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'>
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className='w-full lg:w-5xl mx-auto p-6 space-y-6'>
            <h1 className='text-center text-5xl font-bold text-gray-800'>Edit Blog</h1>

            <Editor
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                charCount={charCount}
                setCharCount={setCharCount}
            />

            {isUpdateError && (
                <div className='text-red-500 text-sm'>
                    {updateError && "data" in updateError
                        ? (updateError.data as { message?: string })?.message || "Failed to update blog"
                        : "Failed to update blog"}
                </div>
            )}

            <div className='flex justify-center gap-4'>
                <button
                    onClick={() => navigate(-1)}
                    className='px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition'>
                    Cancel
                </button>
                <button
                    onClick={handlePublish}
                    disabled={!title || !content || isUpdating}
                    className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${
                        !title || !content || isUpdating ? "opacity-50 cursor-not-allowed" : ""
                    }`}>
                    {isUpdating ? (
                        <span className='flex items-center'>
                            <Spinner className='h-6 w-6 text-white mr-2' />
                            Publishing...
                        </span>
                    ) : (
                        "Save and Publish"
                    )}
                </button>
            </div>
        </div>
    );
};

export default EditBlog;

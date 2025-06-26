import Spinner from "./Spinner";

const FullScreenLoader = () => {
    return (
        <div className='h-screen w-screen flex items-center justify-center bg-white dark:bg-slate-900'>
            <div className='flex flex-col items-center gap-4'>
                <Spinner className='w-14 h-14 text-green-500 ' />
                <span className='text-xl font-medium text-gray-700 dark:text-gray-200'>Authenticating...</span>
            </div>
        </div>
    );
};

export default FullScreenLoader;

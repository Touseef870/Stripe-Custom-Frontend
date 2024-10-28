const Loader = ({ text }) => {
    return (
        <div className="flex justify-center items-center space-x-4">
            <p className="text-lg font-semibold text-white">{text}</p>
            <div className="relative flex items-center justify-center">
                <div className="w-6 h-6 border-4 border-t-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        </div>



    );
};

export default Loader;

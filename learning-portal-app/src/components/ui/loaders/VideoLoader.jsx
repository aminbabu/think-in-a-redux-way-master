const VideoLoader = () => {
  return (
    <div className="w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2 py-3">
      <span className="w-8 h-8 placeholder rounded-full"></span>
      <div className="flex-1 flex flex-col w-full">
        <span className="block placeholder"></span>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="w-12 h-2.5 placeholder mt-1"></span>
          <span className="text-gray-400 text-xs"> | </span>
          <span className="w-12 h-2.5 placeholder mt-1"></span>
        </div>
      </div>
    </div>
  );
};

export default VideoLoader;

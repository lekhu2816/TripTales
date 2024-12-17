import React from "react";

const Loader1 = () => {
  return (
    <div className="py-2 flex gap-2 justify-center items-center bg-primary ">
      <div className="text-white">Please Wait</div>
      <div className="w-4 h-4 border-2 border-t-primary border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
};

const Loader2 = () => {
  return (
    <div className="rounded-lg text-sm px-3 py-3 bg-gray-100">
      <div className="flex flex-row gap-1">
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-.5s]"></div>
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-.3s]"></div>
      </div>
    </div>
  );
};

export { Loader1, Loader2 };

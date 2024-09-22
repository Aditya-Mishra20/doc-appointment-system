import React from "react";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-[999] bg-black bg-opacity-40 backdrop-blur-md">
      <div class="flex flex-row gap-2 p-4  backdrop-blur-md rounded-lg">
        <div class="w-4 h-4 rounded-full bg-[#DAFF96] animate-bounce"></div>
        <div class="w-4 h-4 rounded-full bg-[#DAFF96] animate-bounce [animation-delay:-.3s]"></div>
        <div class="w-4 h-4 rounded-full bg-[#DAFF96] animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </div>    
  );
};

export default Spinner;

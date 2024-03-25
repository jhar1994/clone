import { useState } from "react";
export default function SearchQuest({ click, quest, setQuest, Option, hover }) {
  const [color, setColor] = useState(false);
  const handleIncrement = () => {
    setQuest(quest + 1);
  };

  const handleDecrease = () => {
    if (quest > 0) {
      setQuest(quest - 1);
    }
  };

  return (
    <div className="relative ">
      <div className="text-left w-40 pl-4 cursor-pointer" onClick={click}>
        <div className="mt-[7.1px]">
          <span className="text-[1.8vh] font-semibold">Quien ?</span>
          <div className="relative">
            {quest > 0 ? (
              <p className="text-[14px] font-semibold">
                {quest + " huespedes"}
              </p>
            ) : (
              <p className="text-gray-700 mt-0 truncate"> Cuantos?</p>
            )}
          </div>
        </div>
      </div>

      {Option && (
        <div className="absolute flex bg-white w-full h-full mt-7 z-5  px-5 py-3  shadow shadow-gray-500 rounded-full">
          <div className="flex items-center py-4  mt-1 w-10 h-10 gap-2">
            <button
              className="rounded-full bg-white hover:bg-gray-100  "
              onClick={handleDecrease}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={0.7}
                stroke="gray"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            <button
              className="rounded-full bg-white hover:bg-gray-100"
              onClick={handleIncrement}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={0.7}
                stroke="gray"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

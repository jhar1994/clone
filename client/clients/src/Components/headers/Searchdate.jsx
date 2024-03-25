import moment from "moment";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
export default function Searchdate({
  dateIn,
  dateOut,
  setDateIn,
  setDateOut,
  click,
  Option,
  hover,
}) {
  const [style, setStyle] = useState(false);
  

  return (
    <div
      className={`relative flex rounded-full px-3 text-center ${
        Option
          ? "border border-gray-200 shadow shadow shadow-gray-300 transition duration-150 ease-in-out"
          : ""
      } ${Option == hover ? "bg-white" : "bg-gray-200"}`}
    >
      <div
        className="text-left px-2 transition duration-300 ease-in-out"
        onClick={click}
      >
        <div className="mt-2">
          <span className="text-[1.8vh] font-semibold">Llegada</span>
          <div className="relative">
            {dateIn !== " " ? (
              <p className="text-[14px] font-semibold">
                {moment(dateIn).format("YYYY-MM-DD")}
              </p>
            ) : (
              <p className="text-gray-700 truncate">Agregar fecha ... </p>
            )}
          </div>
        </div>
      </div>
      <div className="border-l border-gray-300 h-10 mt-4"></div>
      <div
        className="cursor-pointer text-left px-2 rounded-full transition duration-300 ease-in-out"
        onClick={click}
      >
        <div className="mt-2">
          <span className="text-[1.8vh] font-semibold">Salida</span>
          <div className="relative">
            {dateOut !== " " ? (
              <p className="text-[14px] font-semibold">
                {moment(dateOut).format("YYYY-MM-DD")}
              </p>
            ) : (
              <p className="text-gray-700 truncate">Agregar fecha ...</p>
            )}
          </div>
        </div>
      </div>

      {Option && (
        <div className="absolute flex mt-20 z-5 left-1/2 transform -translate-x-1/2 border border-gray-100 shadow shadow-gray-500 rounded-2xl">
          <div className="flex gap-4 bg-white w-full h-full rounded-2xl py-4 px-4">
            <Calendar
              onChange={(dateIn) => setDateIn(dateIn)}
              value={dateIn}
              className="rounded-2xl w-[260px]  text-gray-500 font-semibold mt-2
 "
            />
            <Calendar
              onChange={(dateOut) => setDateOut(dateOut)}
              value={dateOut}
              className="rounded-2xl  text-gray-500 font-semibold mt-2 w-[260px]
 "
            />
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
export default function Searchwhere({
  where,
  setWhere,
  Option,
  hover,
  click,
  scrollPosition,
}) {
  const [Optiona, setOptiona] = useState(false);

  return (
    <div className="relative">
      <div
        className={`rounded-full cursor-pointer px-4 ${scrollPosition < 1? "m-auto":""} ${
          hover === Option ? "bg-white" : "bg-gray-200"
        }`}
        onClick={click}
      >
        <div className="pt-[6.8px] pb-[11px]">
          <span className="text-[1.8vh] font-semibold pl-6">Donde</span>

          <input
            type="text"
            onChange={(ev) => setWhere(ev.target.value)}
            placeholder="Explorar lugares maravillosos..."
            className={` font semibold text-gray-900 text-[2.3vh] border-none ${scrollPosition <1 ? "hidden":""}   ${
              hover === Option ? "bg-white" : "bg-gray-200"
            }`}
            style={{ height: "12px", marginLeft: "12px", marginTop: "0" }}
          />
        </div>
      </div>
    </div>
  );
}

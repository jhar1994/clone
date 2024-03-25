import { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchQuest from "./SearchQuest";
import Searchdate from "./Searchdate";
import SearchsUser from "./SearchsUser";
import Searchwhere from "./Searchwhere";

export default function Header() {
  const [Options, setOptions] = useState(false);
  const [Option, setOption] = useState(false);
  const [optionDate, setOptionDate] = useState(false);

  const [dateIn, setDateIn] = useState(" ");
  const [dateOut, setDateOut] = useState(" ");
  const [quest, setQuest] = useState(0);
  const [where, setWhere] = useState(" ");
  const [hover, setHover] = useState(false);
  const [color, setColor] = useState(false);
  const [optionPlace, setOptionPlace] = useState(false);

  console.log(hover);
  console.log(optionDate);

  const navigate = useNavigate();
  const location = useLocation();
  const urlActual = location.pathname;
  console.log(urlActual);

  useEffect(() => {
    if (urlActual === "/") {
      setDateIn(" ");
      setDateOut(" ");
      setWhere(" ");
      setQuest(0);
      setHover(false);
    }
  }, [urlActual]);

  const clickQuest = () => {
    setOption(!Option);
    setOptionDate(false);
    setOptionPlace(false);
    setHover(true);
  };

  const clickdate = () => {
    setDateIn(new Date());
    setDateOut(new Date());
    setOptionDate(!optionDate);
    setOption(false);
    setOptionPlace(false);
    setHover(true);
  };

  const clickPlace = () => {
    setOption(false);
    setOptionDate(false);
    setOptionPlace(true);
    setHover(true);
  };

  const searchButton = () => {
    let queryParams = [];

    if (dateIn !== " " && dateOut !== " ") {
      queryParams.push(`dateIn=${dateIn}`, `dateOut=${dateOut}`);
    }

    if (quest !== 0) {
      queryParams.push(`quest=${quest}`);
    }

    if (where !== " ") {
      queryParams.push(`where=${where}`);
    }

    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
    const dirr = `/search/result/${queryString}`;

    navigate(dirr);
    setOption(false);
    setOptionDate(false);
    setOptionPlace(false);
    setWhere(" ");
    setHover(false);
  };

  let style = " ";
  let styles = " ";
  if (urlActual === "/" || urlActual === "/search/result/") {
    style =
      " px-28 py-4 fixed top-0 left-0 right-0 bg-white z-25 border-b border-gray-300 shadow shadow-gray-400";
  } else {
    style = " mx-40";
    styles = " hidden";
  }

  return (
    <header className={"py-8 flex justify-between overflow " + style}>
      <div className=" realtive px-1">
        <Link to={"/"} className="flex items-center gap-2">
          <div className="font-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2.em"
              height="2.2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="#F40B67"
                d="M12.001 18.275c-1.353-1.697-2.148-3.184-2.413-4.457c-.263-1.027-.16-1.848.291-2.465c.477-.71 1.188-1.056 2.121-1.056s1.643.345 2.12 1.063c.446.61.558 1.432.286 2.465c-.291 1.298-1.085 2.785-2.412 4.458zm9.601 1.14c-.185 1.246-1.034 2.28-2.2 2.783c-2.253.98-4.483-.583-6.392-2.704c3.157-3.951 3.74-7.028 2.385-9.018c-.795-1.14-1.933-1.695-3.394-1.695c-2.944 0-4.563 2.49-3.927 5.382c.37 1.565 1.352 3.343 2.917 5.332c-.98 1.085-1.91 1.856-2.732 2.333c-.636.344-1.245.558-1.828.609c-2.679.399-4.778-2.2-3.825-4.88c.132-.345.395-.98.845-1.961l.025-.053c1.464-3.178 3.242-6.79 5.285-10.795l.053-.132l.58-1.116c.45-.822.635-1.19 1.351-1.643c.346-.21.77-.315 1.246-.315c.954 0 1.698.558 2.016 1.007c.158.239.345.557.582.953l.558 1.089l.08.159c2.041 4.004 3.821 7.608 5.279 10.794l.026.025l.533 1.22l.318.764c.243.613.294 1.222.213 1.858zm1.22-2.39c-.186-.583-.505-1.271-.9-2.094v-.03c-1.889-4.006-3.642-7.608-5.307-10.844l-.111-.163C15.317 1.461 14.468 0 12.001 0c-2.44 0-3.476 1.695-4.535 3.898l-.081.16c-1.669 3.236-3.421 6.843-5.303 10.847v.053l-.559 1.22c-.21.504-.317.768-.345.847C-.172 20.74 2.611 24 5.98 24c.027 0 .132 0 .265-.027h.372c1.75-.213 3.554-1.325 5.384-3.317c1.829 1.989 3.635 3.104 5.382 3.317h.372c.133.027.239.027.265.027c3.37.003 6.152-3.261 4.802-6.975"
              ></path>
            </svg>
          </div>
          <span className="text-xl text-[#F40B67] font-bold">Airbnb</span>
        </Link>
      </div>

      <div
        className={` flex gap-2 m-auto border border-gray-300 rounded-full h-[4.5rem] px-0 py-0 mt-12 shadow shadow-gray-300 +
          ${styles} ${!hover ? "bg-white" : "bg-gray-200"} `}
      >
        <Searchwhere
          where={where}
          setWhere={setWhere}
          Option={optionPlace}
          hover={hover}
          click={clickPlace}
        />

        <div className="border-l border-gray-300 h-10 mt-4 "></div>
        <Searchdate
          dateIn={dateIn}
          dateOut={dateOut}
          setDateIn={setDateIn}
          setDateOut={setDateOut}
          click={clickdate}
          Option={optionDate}
          hover={hover}
        />
        <div className="border-l border-gray-300 h-10 mt-4"></div>

        <div
          className={`relative flex rounded-full ${
            Option
              ? "border border-gray-200 shadow shadow shadow-gray-300 z-1 "
              : ""
          } ${hover === Option ? "bg-white" : "bg-gray-200"}`}
        >
          <SearchQuest
            quest={quest}
            setQuest={setQuest}
            Option={Option}
            click={clickQuest}
            OptionDate={optionDate}
            hover={hover}
          />
          <div className="relative m-auto">
            <div
              onClick={searchButton}
              className="bg-primary text-white h-[50px] w-[7rem] px-2  mx-2 cursor-pointer rounded-full flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="currentColor"
                className="w-6 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <div className="pl-2 justify-center">
                <p className="font-semibold text-[18px]">Buscar</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <SearchsUser />
      </div>
    </header>
  );
}

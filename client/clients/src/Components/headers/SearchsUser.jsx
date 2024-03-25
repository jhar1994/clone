import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
export default function SearchsUser() {
  const [Options, setOptions] = useState(false);
  const { user, setUser } = useContext(UserContext);
  async function logout() {
    await axios.post("/logout");
    setOptions(false);
    setUser(null);
    console.log("2");
  }

  return (
    <>
      <button
        to={user ? "/account" : "/login"}
        onClick={() => setOptions(!Options)}
        className="flex items-center gap-2 border border-gray-300  bg-white rounded-full py-2 px-4 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="gray-900"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>

        <div className=" flex bg-gray-200 text-white border-2 border-gray-500 rounded-full w-8 h-8 item-center justify-center">
          {!!user ? (
            <div className="bg-gray-500 w-full h-full rounded-full ">
              {user.name.slice(0, 1)}
            </div>
          ) : (
            <div className="mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="black"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
          )}
        </div>
      </button>
      {Options && (
        <div className=" mt-4 grid absolute right-1 top-12 bg-white border border-white-300 rounded-2xl rounded-lg shadow-lg p-4 z-10">
          <Link
            className="mb-4"
            to={"/login"}
            onClick={() => setOptions(false)}
          >
            Iniciar sesion
          </Link>

          <Link className="mb-4" to={"/"} onClick={logout}>
            Cerrar sesion
          </Link>
          <Link
            className="mb-4"
            to={"/register"}
            onClick={() => setOptions(false)}
          >
            Registrar cuenta
          </Link>
          <div
            className="mb-4 border-b border-gray-400"
            onClick={() => setOptions(false)}
          ></div>
          <br></br>
          <Link
            className="mb-4"
            to={"/account/bookings"}
            onClick={() => setOptions(false)}
          >
            Reservaciones
          </Link>
          <div className="mb-4 border-b border-gray-400"></div>
          <br></br>
          <Link
            className="mb-4"
            to={"/account/places"}
            onClick={() => setOptions(false)}
          >
            Accommodations
          </Link>
        </div>
      )}
    </>
  );
}

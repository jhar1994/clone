import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNavegation from "../components/Places/AccountNavegation";

export default function PlacePage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  console.log({ places });
  return (
    <div>
      <AccountNavegation />

      <div className="text-center">
        List of all added places <br></br>
        <Link
          className="inline-flex bg-primary gap-1 text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
          Add new places
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              key={place.id}
              to={"/account/places/" + place._id}
              className="flex cursor-pointer gap-4 bg-gray-200 p-4 mt-4 rounded-2xl"
            >
              <div className=" flex w-32 h-32 bg-gray-300 grow shrink-0">
                <img
                  className="object-cover aspect-square"
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                />
              </div>

              <div className="grow-0">
                <h2 className="text-xl">{place.title}</h2>
                <p>{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

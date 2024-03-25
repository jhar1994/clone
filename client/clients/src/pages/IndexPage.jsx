import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const contador = searchParams.get("quest");
  const dateIn = searchParams.get("dateIn");
  const dateOut = searchParams.get("dateOut");
  const where = searchParams.get("where");

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);
  console.log(where);
  function calendar(fecha) {
    const options = {
      month: "short",
      day: "numeric",
    };
    return new Date(fecha).toLocaleDateString("es-ES", options);
  }

  const filteredPlacess = places.filter(
    (place) =>
      (!contador || place.maxGuest == contador) &&
      (!dateIn ||
        !dateOut ||
        (new Date(dateIn) <= new Date(place.checkIn) &&
          new Date(dateOut) >= new Date(place.checkOut))) &&
      (!where ||
        place.address.toLowerCase().includes(where.toLowerCase().trim()))
  );

  return (
    <div className="mt-[240px] mx-20">
      {/* Lista de lugares filtrados */}
      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredPlacess.map((place) => (
          <Link key={place.id} to={"/place/" + place._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl gap-4 aspect-square">
              {place.photos?.[index] && (
                <img
                  className="rounded-2xl object-cover w-full h-full"
                  src={"http://localhost:4000/uploads/" + place.photos?.[index]}
                  alt={place.title}
                />
              )}
            </div>

            <h2 className="text-sm truncate">{place.title}</h2>

            <h3 className="text-sm text-gray-500">{place.address}</h3>
            <div className="flex">
              <h3 className="text-sm text-gray-500">
                {calendar(place.checkIn)}
              </h3>
              <>&nbsp;-&nbsp;</>

              <h3 className="text-sm text-gray-500">
                {calendar(place.checkOut)}
              </h3>
            </div>
            <div className="mt-1">
              <span className="font-bold">${place.prices}</span> por noche
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

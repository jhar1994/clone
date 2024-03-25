import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdressLink from "../Components/Places/AdressLink";
import PlacesGallery from "../Components/Places/PlacesGallery";
import BookingWidget from "./BookingWidget";


export default function PlaceSinglePage() {
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setAllShowPhotos] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  function calendar(fecha) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(fecha).toLocaleDateString("es-ES", options);
  }

  return (
    <div className="mt-4 bg-gray-100 mx-40 px-8 py-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AdressLink>{place.address}</AdressLink>
      <div className="relative">
        <PlacesGallery place={place}/>
      </div>
      <div className="mt-10 gap-8 grid grid-cols-2 md:grid grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Descripcion</h2>
            <p className="font-light">{place.description}</p>
          </div>
          Llegada: {calendar(place.checkIn)} <br></br>
          Salida: {calendar(place.checkOut)} <br></br>
          Numero de huespedes: {place.maxGuest}
        </div>

        <div className="round">
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white px-4 py-5 mt-2 -mx-5">
        <div>
          <h2 className="font semibold text-2xl">El espacio</h2>
        </div>
        <div className="my-4 mt-1 text-sm text-gray-900 leading-4">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}

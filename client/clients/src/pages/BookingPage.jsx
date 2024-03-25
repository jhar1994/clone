import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingDates from "../BookingDates";
import AdressLink from "../Components/Places/AdressLink";
import PlacesGallery from "../Components/Places/PlacesGallery";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="my-8 mx-40">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AdressLink className="my-2 block">{booking.place.address}</AdressLink>
      <div className="flex bg-gray-200 p-6 my-6 justify-between rounded-2xl">
        <div>
          <h2 className="text-xl mb-2">Informacion del lugar:</h2>
          <BookingDates booking={booking} />
        </div>
        <div>
          <div className="pb-2">Precion total</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>

      <PlacesGallery place={booking.place} />
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {bookings.length > 0 &&
          bookings.map((booking) => (
            <Link className="mt-8" to={"/account/bookings/" + booking._id} key={booking.id}>
              <div className="border-4 border-gray-100 shadow shadow--gray-800 rounded-2xl pb-2">
                <div className="bg-gray-200 rounded-t-2xl aspect-[27/20] object-cover">
                  {booking.place.photos?.[0] && (
                    <img
                      className="rounded-t-2xl object-cover w-full h-full"
                      src={
                        "http://localhost:4000/uploads/" +
                        booking.place.photos?.[0]
                      }
                    />
                  )}
                </div>
                <div className="mt-2 px-1">
                  <h2 className="text-[18px]">{booking.place.title}</h2>
                  <BookingDates booking={booking} />
                  <div className="flex gap-1 text-md items-center mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                      />
                    </svg>
                    Precio total:$ {booking.price}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

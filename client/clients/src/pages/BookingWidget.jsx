/* eslint-disable react/prop-types */
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuest, setNumberOfGuest] = useState(1);
  const [subTotal, setSubTOtal] = useState(0);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfDays = 0;

  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  let tarfiaLimpieza = 40;
  let tarifaP = 40;

  useEffect(() => {
    const calculateSubtotal = () => {
      setSubTOtal(place.prices * numberOfDays);
    };

    calculateSubtotal();
  }, [numberOfDays, place.prices]);

  async function BookThisPlace() {
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numberOfGuest,
      name,
      mobile,
      place: place._id,
      price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const totalAmouth = subTotal + tarfiaLimpieza + tarifaP;
  const price = totalAmouth;

  return (
    <div className="bg-white shadow shadow-gray-500 p-4 rounded-xl border-gray-500">
      <div className="text-2xl text-center">
        <span>$ {place.prices} USD noche</span>
      </div>

      <div className="border  rounded-2xl mt-4 border-gray-500">
        <div className="flex">
          <div className="px-3 py-4">
            <label>Lleagada: </label>
            <input
              className="rounded-2xl"
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            ></input>
          </div>
          <div className="px-3  py-4 border-l border-gray-500">
            <label>Salida: </label>
            <input
              className="rounded-2xl"
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            ></input>
          </div>
        </div>
        <div className="px-3  py-4 border-t border-gray-500">
          <label>Huespedes: </label>
          <input
            className="rounded-2xl"
            type="number"
            value={numberOfGuest}
            min={1}
            max={place.maxGuest}
            onChange={(ev) => setNumberOfGuest(ev.target.value)}
          ></input>
        </div>
      </div>

      {numberOfDays > 0 && (
        <div className="px-3 py-4 border-t">
          <div className="flex justify-between text-stone-500">
            <span className="text-left">
              ${place.prices} USD x {numberOfDays} noches
            </span>{" "}
            <span className="text-right">${subTotal}</span>
          </div>
          <div className="flex justify-between text-stone-500 ">
            <span className="text-left">Tarifa de limpieza</span>{" "}
            <span className="text-right">${tarfiaLimpieza}</span>
          </div>

          <div className="flex justify-between text-stone-500 mb-5">
            <span className="text-left">Tarifa por servicio Airbnb clone</span>{" "}
            <span className="text-right">${tarifaP}</span>
          </div>
          <hr className="p-2 mt-2 border-gray-500"></hr>
          <div className="flex  mb-2 justify-between text-stone-900">
            <span className="text-left">Total</span>
            <span className="text-right">$ {totalAmouth}</span>
          </div>

          <label className="">Nombre completo</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="your name"
          ></input>
          <label className="">Numero de contacto</label>
          <input
            type="tel"
            value={mobile}
            onChange={(ev) => setMobile(ev.target.value)}
            placeholder="your mobile"
          ></input>
        </div>
      )}

      <button onClick={BookThisPlace} className="primary mt-2">
        Reservar
      </button>
    </div>
  );
}

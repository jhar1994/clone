import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNavegation from "./AccountNavegation";
import Perks from "./Perks";
import PhotoUploader from "./PhotoUploder";

export default function PlacesFormPage() {
  const { id } = useParams();
  console.log({ id });

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addPhotos, setaddPhotos] = useState([]);
  //const [photosLink, setphotosLink] = useState('');
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setextraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setmaxGuest] = useState(1);
  const [prices, setPrices] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setaddPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setextraInfo(data.extraInfo);
      setCheckIn(format(new Date(data.checkIn), "yyyy-MM-dd"));
      setCheckOut(format(new Date(data.checkOut), "yyyy-MM-dd"));
      setmaxGuest(data.maxGuest);
      setPrices(data.prices);
    });
  }, [id]);
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(description) {
    return <p className="text-gray-500 text-sm">{description}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addNewPlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
      prices,
    };
    if (id) {
      await axios.put("/places", {
        id,
        ...placeData,
      });
    } else {
      await axios.post("/places", placeData);
    }

    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/account/places"}></Navigate>;
  }

  console.log(setAddress);
  return (
    <div>
      <AccountNavegation />
      <div className="text">
        <form onSubmit={addNewPlace}>
          {preInput("Nombre del lugar", "nombre del lugar")}
          <input
            type="text"
            value={title}
            onChange={(ev) => {
              setTitle(ev.target.value);
            }}
            placeholder="Ejemplo para el titulo: Apartamento acojedor, un maraviloso sitio , etc"
          />
          {preInput("Direccion del lugar", "Direccion del lugar")}
          <input
            type="text"
            value={address}
            onChange={(ev) => {
              setAddress(ev.target.value);
            }}
            placeholder="direccion"
          />
          {preInput("Fotos", "entre mas = mejor resultados !")}
          <PhotoUploader addPhotos={addPhotos} onChange={setaddPhotos} />

          {preInput("Descripcion", "descripcion del lugar")}

          <textarea
            value={description}
            onChange={(ev) => {
              setDescription(ev.target.value);
            }}
          />
          {preInput("Servicios", "Selecciona los servicios que tiene el lugar")}

          <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <Perks selected={perks} onChange={setPerks} />
          </div>
          {preInput(
            "El espacio",
            "Descripcion mas detallada y reglas del lugar"
          )}

          <textarea
            value={extraInfo}
            onChange={(ev) => {
              setextraInfo(ev.target.value);
            }}
          />
          {preInput(
            "Dia de llegada y de salida, huespedes",
            "Agrga llegada y salida , huespedes"
          )}

          <div className="grid gap-4 inline sm:grid-cols-4">
            <div>
              <h3 className="mt-2 mb-1">fecha de llegada</h3>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => {
                  setCheckIn(ev.target.value);
                }}
                placeholder="14:00"
              />
            </div>
            <div className="mt-2 mb-1">
              <h3>fecha de salida</h3>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                placeholder="11:00"
              />
            </div>
            <div>
              <h3 className="mt-2 mb-1">cantidad de huespedes</h3>
              <input
                type="number"
                value={maxGuest}
                onChange={(ev) => setmaxGuest(ev.target.value)}
                placeholder=""
              />
            </div>
            <div>
              <h3 className="mt-2 mb-1">precio por noche</h3>
              <input
                type="number"
                value={prices}
                onChange={(ev) => setPrices(ev.target.value)}
              />
            </div>
          </div>
          <button className="primary my-4">Guardar</button>
        </form>
      </div>
    </div>
  );
}

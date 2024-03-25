import { useState } from "react";

export default function PlacesGallery({ place }) {
  const [showAllPhotos, setAllShowPhotos] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState(0);

  function showPhoto(number) {
    return (
      place.photos?.[0] && (
        <img
          onClick={() => setAllShowPhotos(true)}
          className="object-cover w-full h-full cursor-pointer"
          src={"http://localhost:4000/uploads/" + place.photos?.[number]}
          alt="Place 1"
        />
      )
    );
  }
  const PrevPhoto = () => {
    if (selectedPhotos > 0) {
      setSelectedPhotos(selectedPhotos - 1);
    }
  };

  const nextPhoto = () => {
    if (selectedPhotos < place.photos.length - 1) {
      setSelectedPhotos(selectedPhotos + 1);
    }
  };

  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 py-6 min-w-full min-h-screen z-10 overflow-y-auto overflow-x-auto">
        <div className="p-8 grid">
          Show photos
          <div>
            <h2>Photos</h2>
          </div>
          <button
            onClick={() => setAllShowPhotos(false)}
            className="fixed top-8 left-12 flex gap-1 py-2 px-4  text-white bg-black bg-opacity-0 hover:bg-gray-500 rounded-2xl shadow shadow-gray-500"
          >
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
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            Cerrar
          </button>
          {place?.photos?.length > 0 && (
            <div className="flex justify-between items-center">
              <button
                onClick={PrevPhoto}
                className="bg-black opacity-60 text-white rounded-full p-4 mb-40"
              >
                Anterior
              </button>
              <div className="aspect-square">
                <img
                  className="w-[680px] h-[530px]"
                  src={
                    "http://localhost:4000/uploads/" +
                    place.photos[selectedPhotos]
                  }
                />
              </div>
              <button
                onClick={nextPhoto}
                className="bg-black opacity-60 text-white rounded-full mt-5 mb-40 p-4"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-[2fr_1fr_1fr] gap-2 rounded-2xl overflow-hidden">
        <div className="aspect-[17/12]">
          {place.photos?.[0] && (
            <img
              onClick={() => setAllShowPhotos(true)}
              className="object-cover w-full h-full cursor-pointer"
              src={"http://localhost:4000/uploads/" + place.photos?.[0]}
              alt="Place 1"
            />
          )}
        </div>

        <div className="grid gap-2">
          {place.photos?.[1] && (
            <div className="aspect-[17/12]">
              <img
                onClick={() => setAllShowPhotos(true)}
                className="object-cover w-full h-full cursor-pointer"
                src={"http://localhost:4000/uploads/" + place.photos?.[1]}
                alt="Place 2"
              />
            </div>
          )}

          {place.photos?.[2] && (
            <div className="aspect-[17/12]">
              <img
                onClick={() => setAllShowPhotos(true)}
                className="object-cover w-full h-full cursor-pinter"
                src={"http://localhost:4000/uploads/" + place.photos?.[2]}
                alt="Place 3"
              />
            </div>
          )}
        </div>

        <div className="grid gap-2">
          {place.photos?.[3] && (
            <div className="aspect-[17/12]">
              <img
                onClick={() => setAllShowPhotos(true)}
                className="object-cover w-full h-full cursor-pointer"
                src={"http://localhost:4000/uploads/" + place.photos?.[3]}
                alt="Place 3"
              />
            </div>
          )}

          {place.photos?.[4] && (
            <div className="aspect-[17/12]">
              <img
                onClick={() => setAllShowPhotos(true)}
                className="object-cover w-full h-full cursor-pointer"
                src={"http://localhost:4000/uploads/" + place.photos?.[4]}
                alt="Place 4"
              />
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setAllShowPhotos(true)}
            className="flex gap-1 absolute bottom-6 right-4 rounded-xl py-1 px-4 bg-white opacity-70 border-2 border-gray-500 shadow shadow-md shadow-black-500 cursor-pointer"
          >
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
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Mostrar todas las fotos
          </button>
        </div>
      </div>
    </div>
  );
}

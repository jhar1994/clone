/* eslint-disable react/prop-types */
export default function PlaceImage({ place, index = 0, className=null }) {
  if (!place.photos?.length > 0) {
    return "";
  }
  if(className){
    return 'object-cover'
  }
  return (
    <img
      className={className}
      src={"http://localhost:4000/uploads/" + place.photos[index]}
      alt=""
    />
  );
}

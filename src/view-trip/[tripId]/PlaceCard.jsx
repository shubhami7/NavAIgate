import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { CiClock1 } from "react-icons/ci";
import { IoMdPricetag } from "react-icons/io";
import { Link } from "react-router-dom";

function PlaceCard({ place }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName,
    };
    const result = await GetPlaceDetails(data).then((res) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[0].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <div className="border rounded-xl p-3 mt-1 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
      <img
        src={photoUrl ? photoUrl : "/placeholder.jpg"}
        className="w-[140px] h- rounded-xl"
      />
      <div>
        <h2 className="font-bold text-lg text-black">{place.placeName}</h2>
        <p className="text-sm text-gray-500 leading-4">{place.placeDetails}</p>
        <div className="flex flex-row mt-1">
          <CiClock1 className="mt-1 text-black" />
          <h2 className="mx-1 text-black">{place.timeToTravel}</h2>
        </div>
        <div className="flex">
          <IoMdPricetag className="mt-1 text-black" />
          <h2 className="mx-1 text-black">{place.ticketPricing}</h2>
        </div>
      </div>
    </div>
  );
}

export default PlaceCard;

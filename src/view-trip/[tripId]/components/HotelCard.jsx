import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa6";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function HotelCard({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
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
    <div>
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" +
          hotel?.hotelName +
          hotel?.hotelAddress
        }
        target="_blank"
      >
        <div className="hover:scale-105 transition-all cursor-pointer">
          <img
            src={photoUrl ? photoUrl : "/placeholder.jpg"}
            className="rounded-xl h-[180px] w-full object-cover"
          ></img>
          <div className="my-2 flex flex-col gap-1">
            <h2 className="font-medium text-black">{hotel?.hotelName}</h2>
            <div className="flex">
              <IoLocationSharp className="text-gray-500" />
              <h2 className="text-xs text-gray-500">{hotel?.hotelAddress}</h2>
            </div>
            <h2 className="text-sm text-black">{hotel?.price}</h2>
            <div className="flex flex-row gap-1">
              <FaRegStar className="text-black" />
              <h2 className="text-sm text-black">{hotel?.rating}</h2>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCard;

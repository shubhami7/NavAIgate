import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCard({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
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
    <Link to={"/view-trip/" + trip?.id}>
      <div className="hover:scale-105 transition-all">
        <img
          src={photoUrl ? photoUrl : "/placeholder.jpg"}
          className="object-cover rounded-xl h-[200px] w-[200px]"
        />
        <div>
          <h2 className="font-bold text-lg text-black">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection.numberOfDays}{" "}
            {trip?.userSelection.numberOfDays == 1 ? "Day" : "Days"} trip with{" "}
            {trip?.userSelection.budget} Budget and{" "}
            {trip?.userSelection.travelSize}{" "}
            {trip?.userSelection.travelSize == 1 ? "person" : ""}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCard;

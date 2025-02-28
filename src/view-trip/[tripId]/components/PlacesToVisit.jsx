import React from "react";
import PlaceCard from "../PlaceCard";

function PlacesToVisit({ trip }) {
  if (!trip?.tripData?.itinerary || !Array.isArray(trip.tripData.itinerary)) {
    return <p className="text-red-500">No itinerary available.</p>;
  }

  return (
    <div>
      <h2 className="font-bold text-xl">Places to Visit</h2>
      <div>
        {trip.tripData?.itinerary.map((item, index) => (
          <div key={index}>
            <h2 className="font-medium text-lg mt-5">{item.day}</h2>
            <div className="grid lg:grid-cols-2 gap-5">
              {item.plan?.map((place, index) => (
                <div key={index}>
                  <h2 className="font-medium text-md text-blue-700">
                    {place.time}
                  </h2>
                  <PlaceCard place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;

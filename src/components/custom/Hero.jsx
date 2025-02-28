import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#1b9dfb]">
          Plan Your Next Trip With Ease Using AI:
        </span>{" "}
        Personalized Agendas at Your Fingertips
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Your personal trip planner that creates custom itineraries curated to
        your specific needs.
      </p>

      <Link to={"/create-trip"}>
        <Button>Plan Your Trip!</Button>
      </Link>
    </div>
  );
}

export default Hero;

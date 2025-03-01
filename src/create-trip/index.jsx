/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModel";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (res) => getUserProfile(res),
    onError: (err) => console.log(err),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
    }

    if (formData?.numberOfDays > 7) {
      alert("Enter less than 7 days.");
      return;
    } else if (formData?.numberOfDays < 1) {
      alert("Enter a positive amount of days.");
      return;
    }

    if (
      !formData?.location ||
      !formData.budget ||
      !formData.numberOfDays ||
      !formData?.travelSize
    ) {
      alert("Pleas fill out all the inputs.");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location.label
    )
      .replace("{numberOfDays}", formData?.numberOfDays)
      .replace("{travelSize}", formData?.travelSize)
      .replace("{budget}", formData?.budget)
      .replace("{numberOfDays}", formData?.numberOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user ? user.email : "NO_USER",
      id: docId,
    });
    setLoading(false);
    router("/view-trip/" + docId);
  };

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Select your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">Fill the information below </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            Select your travel destination
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Select your trip length in number of days
          </h2>
          <Input
            placeholder={"Ex. 3"}
            type="number"
            onChange={(e) => handleInputChange("numberOfDays", e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl mt-10 font-medium">Select Your Budget</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                ${formData?.budget == item.title && "shadow-lg border-black"}
              `}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl mt-10 font-medium">Select Your Travel Size</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("travelSize", item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                ${
                  formData?.travelSize == item.people &&
                  "shadow-lg border-black"
                }
                `}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? (
            <>
              <p>Planning</p>
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            </>
          ) : (
            "Lets Plan!"
          )}
        </Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent onClick={() => setOpenDialog(false)} className="">
          <DialogHeader>
            <DialogDescription>
              <h1 className="font-semibold text-3xl text-[#1b9dfb]">
                NavAIgate
              </h1>
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>
                Would you like to sign in with Google authentication to save
                your trip?
              </p>
              <div className="flex gap-5">
                <Button
                  className="w-full mt-5 flex gap-4 items-center"
                  onClick={login}
                >
                  <FcGoogle className="h-7 w-7" />
                  Sign In With Google
                </Button>
                <Button
                  className="w-full mt-5 flex gap-4 items-center"
                  onClick={() => setOpenDialog(false)}
                >
                  No Thanks, View Trip
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;

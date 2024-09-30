import React, { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Button } from '@/components/ui/button';
import { AI_PROMPT, SelectBudgetOption, SelectTravelersList } from '@/constants/options';
import { toast } from "sonner";
import Input from '../components/ui/input';
import { chatSession } from '@/service/AIModal';
import { FaNfcDirectional } from "react-icons/fa6";



import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { LogIn } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseconfig';
import { useNavigate } from 'react-router-dom';


// Google Maps Loader Component
const GoogleMapsLoader = () => {
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Google Maps script loaded");

        script.onload = () => {
          console.log("Google Maps script loaded");
        };

        script.onerror = () => {
          console.error("Error loading Google Maps script");
        };

        document.body.appendChild(script);
      };

      loadGoogleMapsScript();

      return () => {
        const scripts = document.querySelectorAll('script[src^="https://maps.googleapis.com/maps/api/js"]');
        scripts.forEach(script => script.remove());
      };
    }
  }, []);

  return null;
};


function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tripDetails, setTripDetails] = useState(null); // New state for trip details
  
  const naviigate=useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const LogIn = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log("Login successful:", codeResp);
      GetUserProfile(codeResp);
    },
    onError: (error) => console.log("Login error:", error),
  });


  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      header: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((Resp) => {
      console.log(Resp);
      localStorage.setItem('user', JSON.stringify(Resp.data));
      setOpenDailog(false);
      OnGenerateTrip();
    })
  };

  const SaveAiTrip = async (TripData) => {

    setLoading(true);

    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
    naviigate('/view-trip/'+docId)

  }

  const OnGenerateTrip = async () => {

    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDailog(true);
      return;
    }
    if (!formData?.noOfDays || !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all details.");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays);



    const result = await chatSession.sendMessage(FINAL_PROMPT)
    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());



  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-10 mt-10 flex-col gap-9'>
      <GoogleMapsLoader />
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

      <div className='mt-20'>
        <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
          selectProps={{
            place,
            onChange: (v) => { setPlace(v); handleInputChange('location', v) }
          }}
        />
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
        <Input placeholder={'Ex. 3'} type='number'
          onChange={(e) => handleInputChange('noOfDays', e.target.value)}
        />
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOption.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 cursor-pointer rounded-lg hover:shadow-lg ${formData.budget === item.title ? 'shadow-lg border-black' : ''}`}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-600'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelersList.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('traveler', item.people)}
              className={`p-4 cursor-pointer rounded-lg hover:shadow-lg ${formData.traveler === item.people ? 'shadow-lg border-black' : ''}`}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-600'>{item.desc}</h2>
              <h2 className='text-lg'>{item.people}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button
          disabled={loading}
          onClick={OnGenerateTrip} >
          {loading ? <FaNfcDirectional className='h-7 w-7 animate-spin'  /> : "Generate Trip!"}
        </Button>
      </div>

      <Dialog open={openDialog}>

        <DialogContent>
          <DialogHeader>

            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className='font-bold text-lg mt-7 flex gap-4 items-center'>Sign In with Google</h2>
              <h2>Sign in with the google authentication app securly</h2>
              <Button
                disabled={loading}
                onClick={LogIn}
                className='w-full mt-5'><FcGoogle className='h-7 w-7' />Sign in with google</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>
  );
}

export default CreateTrip;

import { db } from '@/service/firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfoSection from './components/infoSection';
import Hotels from './components/Hotels';
import { Hotel } from 'lucide-react';
import PlaceToVisit from './components/PlaceToVisit';
import Footer from './components/Footer';

function Viewtrip() {
  const {tripid}=useParams();
  const [trip,setTrip]=useState([]);
  useEffect(()=>{
    tripid&&GetTripData();
  },[tripid])

  //use to get trip info from firebase
  const GetTripData=async()=>{
    const docRef=doc(db,'AITrips',tripid);
    const docSnap=await getDoc(docRef);

    if(docSnap.exists()){
      console.log('Document :',docSnap.data());
      setTrip(docSnap.data());
    }
    else{
      console.log("No such document");
      toast('no trip found')
    }
  }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* Information Section */}
            < InfoSection trip={trip}/>
        {/* Recommended Hotel */}
            <Hotels trip={trip}/>            
        {/* Daily Plan */}
            <PlaceToVisit trip={trip}/>
        {/* Footer */}
            <Footer trip={trip}/>
    </div>
  )
}

export default Viewtrip

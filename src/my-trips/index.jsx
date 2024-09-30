import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom';
import { db } from '@/service/firebaseconfig';
import UserTripCardItem from './components/UserTripCardItem';



function MyTrips() {

    const navigation = useNavigation();
    const [userTrips, setUserTrips] = useState([]);


    useEffect(() => {
        GetUserTrips();
    }, [])

    // used to get all users trips
    const GetUserTrips =async()=>{
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            navigation('/')
            return;
        }
        
        const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setUserTrips(preVal => [...preVal, doc.data()])
        });
    }
    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-10 mt-10 flex-col gap-9'>
            <h2 className='font-bold text-3xl'>My Trips</h2>
            <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5 '>
                {userTrips?.length>0?userTrips.map((trip, index)=>(
                    <UserTripCardItem trip={trip} key={index}/>
                ))
                :[1,2,3,4,5,6,7,8,9].map((item,index)=>(
                    <div key={index} className='h-[250px] w-full bg-slate-200 animate-pulse rounded-xl'>

                    </div>

                ))
            
            }
            </div>
        </div>
    )
}

export default MyTrips

import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';




function HotelCardItem({ item }) {

    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        item && GetPlacePhoto();
    }, [item])
    const GetPlacePhoto = async () => {
        const data = {
            textQuery: item.hotelName
        }
        const result =await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[3].name);

            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl);
        })
    }

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + item.hotelName + "," + item.hotelAddress + "," + item.price} target='_blank'>

            <div className='hover:scale-110 transition-all cursor-pointer'>
                <img src={photoUrl ? photoUrl : '/placeholder.jpg'} className='rounded-xl h-[100px] w-full object-cover' />
                <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-medium'>{item.hotelName}</h2>
                    <h2 className='text-xs text-gray-500'>📍{item.hotelAddress}</h2>
                    <h2 className='text-sm'>💸{item.price}</h2>
                    <h2 className='text-sm'>⭐{item.rating}</h2>


                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem

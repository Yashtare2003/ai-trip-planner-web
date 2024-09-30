import React from 'react'
import { Link } from 'react-router-dom'; // Import Link from React Router

function Hero() {
  return (
    <div className='flex  flex-col items-center mx-56 gap-9'>
      <h1
      className='font-extrabold text-[50px] text-center mt-15'
      ><span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span><br></br>Personalized Itineraries at Your Fingertips

</h1>
<p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
<Link to={'/create-trip'}>
<button className='bg-black text-white px-4 py-2 rounded'>Get Started, Its Free</button>
</Link>
    </div>
  )
}

export default Hero

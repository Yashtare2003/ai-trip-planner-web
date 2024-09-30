import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'; // Import React
import ReactDOM from 'react-dom/client';// Import ReactDOM for the root
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'  // Import necessary router components
import CreateTrip from './create-trip/index.jsx' // Import your CreateTrip component
import Header from './components/ui/custom/Header.jsx';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripid]/index.jsx';
import MyTrips from './my-trips/index.jsx';



const router = createBrowserRouter([

  {
    path: '/',
    element: <App />
  },
  {
    path: '/create-trip',
    element: <CreateTrip />
  },
  {
    path: '/view-trip/:tripid',
    element: <Viewtrip />
  },
  {
    path: '/my-trips',
    element:<MyTrips />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIEND_ID}>
      <Header />
      <Toaster />

      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)

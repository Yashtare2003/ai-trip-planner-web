import React, { useEffect, useState } from 'react'
import { Button } from '../button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';


function Header() {

  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDailog] = useState(false);

  useEffect(() => {
    console.log(user);

  }, [])

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
      window.location.reload();
    })
  };

  return (
    <div className='p-5 shadow-sm flex justify-between items-center px-5'>
      <img src='/logo.svg '></img>
      <div>
        {user ?
          <div className='flex items-center gap-5'>
            <a href='/create-trip'>
            <Button variant='outline' className='rounded-full'>Create Trip</Button>
            </a>
            <a href='/my-trips'>
            <Button variant='outline' className='rounded-full'>My Trip</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload('/');

                }}>Logout</h2>

              </PopoverContent>
            </Popover>

          </div>
          :
          <Button onClick={() => setOpenDailog(true)}>Sign In</Button>
        }
      </div>
      <Dialog open={openDialog}>

        <DialogContent>
          <DialogHeader>

            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className='font-bold text-lg mt-7 flex gap-4 items-center'>Sign In with Google</h2>
              <h2>Sign in with the google authentication app securly</h2>
              <Button


                onClick={LogIn}
                className='w-full mt-5'><FcGoogle className='h-7 w-7' />Sign in with google</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>
  )
}

export default Header

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookie from "cookie-universal";
import Loader from "../../../../components/loader/components/Loader";

import './contact.css'

export default function Contact() {

    const cookie = Cookie();
    const token = cookie.get("userToken");
    const[user, setUser] = useState({});
    const [isLoader, setIsLoader] = useState(true);



    const getProfileInfo = async () =>{
        const {data} = await axios.get(`${import.meta.env.VITE_API}/user/profile`,
            {
                headers: {
                    Authorization: `Tariq__${token}`,
                  },
            }
        )
        setUser(data.user);
        setIsLoader(false);

    }



    useEffect(() => {
        getProfileInfo();
    }, [])



  return (
    <>
    <div className="contact">
        {isLoader ? <Loader /> : 
        <div className="container">
            <div className="userInfo">
            <h1>Contact</h1>

            <p><span>Email: </span> {user.email}</p>
            </div>
            </div>

}
        </div>
    </>
  )
}





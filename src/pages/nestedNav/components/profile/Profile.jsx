import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookie from "cookie-universal";
import Loader from "../../../../components/loader/components/Loader";

import './profile.css'

function Profile() {

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
    <div className="profile">
        {isLoader ? <Loader /> : 
        <div className="container">
            <div className="userInfo">
            <div className="userImg">
            <img src={user.image.secure_url}/>
            </div>
            <div className="userInfoDetails">
            <p><span>Name: </span>{user.userName}</p>
            <p><span>Email: </span> {user.email}</p>
            <p><span>Account created at: </span>{user.createdAt.slice(0,10)}</p>

            </div>
            </div>

            </div>
}
        </div>
    </>
  )
}

export default Profile




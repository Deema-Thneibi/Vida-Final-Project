

import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { object, string } from 'yup'; // npm i yup
import { Slide, toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import Cookie from  'cookie-universal'
import { UserContext } from "../../../context/User";
import './forgotPassword.css'

export default function ForgotPassword() {
    const [user, setUser] = useState(
        {
            email: '',
            password: '',
            code: '',
        }
    )
    const [errors, setErrors] = useState([])

    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();

    const cookie =  Cookie();

    const {setUserToken} = useContext(UserContext);


    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser(
            {
                ...user,
                [name]: value,
            }
        )
    }

    const validateData = async () =>{
        let forgotPasswordSchema = object({
            email: string().email().required(),
            password: string().required(),
            code: string().required(),

          });

          try{
            await forgotPasswordSchema.validate(user, {abortEarly: false})
            return true;
          } catch(error){
            const validationError = {};
            error.inner.forEach(err => {
                validationError[err.path] = err.message;
                setErrors(validationError);
            });
            return false;
          }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        if(await validateData()){
        try{
        const {data} = await axios.patch(`${import.meta.env.VITE_API}/auth/forgotPassword`,
          {
            email: user.email,
            password: user.password,
            code: user.code,
        });
        console.log(data);

        if(data.message == 'success') {
        
              cookie.set('userToken', data.token);
              setUserToken(data.token);

              setUser(
                {
                  email: '',
                  password: '',
                  code: '',
              });
              
        navigate('/signIn');
      }

    } catch(error){
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        });
     }finally{
        setLoader(false);
    }
}  
setLoader(false);

    }


  return (
    <>
    <div className='forgotPassword'>
    <form onSubmit={handleSubmit}>
        <h1>Forgot Password</h1> <br/>
        <p className='message'>Please enter the code to verify it and change the password</p><br/>

        <label>Enter your email</label> 
        <input type='email' name='email' value={user.email} onChange={handleChange} />
        <p>{errors.email}</p> <br/>

        <label>Enter new password</label>
        <input type='password' name='password' value={user.password} onChange={handleChange} />
        <p>{errors.password}</p>  <br/>

        <label>Enter the code</label>
        <input type='text' name='code' value={user.code} onChange={handleChange} />
        <p>{errors.code}</p>  <br/>

        <button type='submit' name='submit' value='submit' disabled={loader??'disabled'}>{!loader?'Submit': 'Wait...'}</button>
    </form>
    </div>

    </>
  )
    }

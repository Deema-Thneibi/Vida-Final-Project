import './signIn.css'
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { object, string } from 'yup'; // npm i yup
import { Slide, toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import Cookie from  'cookie-universal'
import { UserContext } from "../../../context/User";

export default function SignIn() {
    const [user, setUser] = useState(
        {
            email: '',
            password: '',
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
        // make object for validation
        let signInSchema = object({
            email: string().email().required(),
            password: string().required(),
          });

          try{
            await signInSchema.validate(user, {abortEarly: false})
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
        const {data} = await axios.post(`${import.meta.env.VITE_API}/auth/signin`,
          {
            email: user.email,
            password: user.password,
        });

        if(data.message == 'success') {
          toast.success(`Welcome`, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Slide,
              });
              cookie.set('userToken', data.token);
              setUserToken(data.token);

              setUser(
                {
                  email: '',
                  password: '',
              });
              
        navigate('/');
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
    <div className='signIn'>
    <form onSubmit={handleSubmit}>
        <h1>Sign In </h1> <br/>

        <label>Enter your email</label> 
        <input type='email' name='email' value={user.email} onChange={handleChange} />
        <p>{errors.email}</p> <br/>

        <label>Enter your password</label>
        <input type='password' name='password' value={user.password} onChange={handleChange} />
        <p>{errors.password}</p>  <br/>


        <button type='submit' name='submit' value='submit' disabled={loader??'disabled'}>{!loader?'Submit': 'Wait...'}</button>
        <p className='code'><Link to='/sendCode' >Forgot password?</Link></p> <br/>
    </form>
    </div>

    </>
  )
    }

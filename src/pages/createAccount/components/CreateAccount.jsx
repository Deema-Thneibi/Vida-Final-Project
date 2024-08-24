import './createAccount.css'
import { useState } from 'react';
import axios from 'axios';
import { object, string } from 'yup'; // npm i yup
import { Slide, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function CreateAccount() {
    const [user, setUser] = useState(
        {
            userName: '',
            email: '',
            password: '',
            image: '',

        }
    )
    const [errors, setErrors] = useState([])

    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();



    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser(
            {
                ...user,
                [name]: value,
            }
        )
    }

    const handleImageChange = (e) => {
        const {name, files} = e.target;
        setUser(
            {
                ...user,
                [name]: files[0],
            }
        );
            
    }

    const validateData = async () =>{
        // make object for validation
        let registerSchema = object({
            userName: string().required(),
            email: string().email().required(),
            password: string().required(),
            image: string().required(),
          });

          try{
            await registerSchema.validate(user, {abortEarly: false})
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
        const formdata = new FormData();
        formdata.append('userName', user.userName);
        formdata.append('email', user.email);
        formdata.append('password', user.password);
        formdata.append('image', user.image);

        try{
        const {data} = await axios.post(`${import.meta.env.VITE_API}/auth/signup`, formdata);

        if(data.message == 'success') { 
            toast.success('We have sent you an email, please confirm it', {
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

                navigate('/signIn');

        }
    } catch(error){
        if(error.response.status === 409){
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
        }
    }finally{
        setLoader(false);
    }
}  
setLoader(false);

    }


  return (
    <>
    <div className='register'>
    <form onSubmit={handleSubmit}>
        <h1>Create an Account</h1> <br/>
        <label>Enter your name</label> 
        <input type='text' name='userName' value={user.userName} onChange={handleChange} />
        <p>{errors.userName}</p><br/>

        <label>Enter your email</label> 
        <input type='email' name='email' value={user.email} onChange={handleChange} />
        <p>{errors.email}</p> <br/>

        <label>Enter your password</label>
        <input type='password' name='password' value={user.password} onChange={handleChange} />
        <p>{errors.password}</p> <br/>

        <label>Enter your img</label> 
        <input type='file' name='image' onChange={handleImageChange} />
        <p>{errors.image}</p> <br/>

        <button type='submit' name='submit' value='submit' disabled={loader??'disabled'}>{!loader?'Submit': 'Wait...'}</button>
    </form>
    </div>

    </>
  )
    }

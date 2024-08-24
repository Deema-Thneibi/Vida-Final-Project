
import {  useState} from 'react';
import axios from 'axios';
import { object, string } from 'yup'; // npm i yup
import { Slide, toast } from 'react-toastify';
import { useNavigate} from 'react-router-dom';
import './sendcode.css'

export default function SendCode() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([])

    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();



    const handleChange = (e) =>{
        setEmail(e.target.value);
    }

    const validateData = async () => {
        let sendCodeSchema = object({
            email: string().email().required(),
        });
     
        try {
            await sendCodeSchema.validate({ email }, { abortEarly: false }); 
            return true;
        } catch (error) {
            const validationError = {};
            error.inner.forEach(err => {
                validationError[err.path] = err.message;
            });
            setErrors(validationError);
            return false;
        }
     }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        if(await validateData()){
        try{
        const {data} = await axios.patch(`${import.meta.env.VITE_API}/auth/sendcode`,
          {
            email: email,
        });

        if(data.message == 'success') {
          toast.success(`Please check your email to get the code`, {
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

              setEmail('');
              
        navigate('/forgotPassword');
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
    <div className='sendCode'>
    <form onSubmit={handleSubmit}>
        <h1>Forgot Password</h1> <br/>

        <label>Enter your email</label> 
        <input type='email' name='email' value={email} onChange={handleChange} />
        <p>{errors.email}</p> <br/>

        <button type='submit' name='submit' value='submit' disabled={loader??'disabled'}>{!loader?'Submit': 'Wait...'}</button>
    </form>
    </div>

    </>
  )
    }

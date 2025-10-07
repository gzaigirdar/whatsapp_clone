import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup';
import { signupSchema } from '../../validation/Validation.js';
import AuthInput from './AuthInput.jsx';
import {useDispatch, useSelector} from 'react-redux'
import {PacmanLoader} from 'react-spinners';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import { changeStatus, registerUser } from '../../features/userSlice.js';
import { useState } from 'react';
import Picture from './Picture.jsx';
import axios from 'axios';
function RegisterForm() {
    const {status,error} = useSelector((state) => state.user)
    // use to redirect to another page
    const navigate = useNavigate()
    const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;
    const cloud_name = process.env.REACT_APP_CLOUD_NAME;
    
    const {register,handleSubmit,watch,formState: {errors}} = useForm({resolver: yupResolver(signupSchema)});
    
    const dispatch = useDispatch()
    const [picture,setPicture] = useState()
    const [readableimage, setReadableimage] = useState('')
    
    console.log(cloud_secret)
    const onSubmit = async (data) => {
        
        dispatch(changeStatus("loading"))
        if(picture){
            // if picture is submitted upload then called the reducers to add secure url return by cloudniary to slice for picture
           const response =  await uploadImage(picture);
           let res = await dispatch(registerUser({...data,picture:response.secure_url}))
           console.log(response)
           if (res?.payload?.user) {
            navigate("/");
            }
        
        } else{
            // if no picture set it to none 
           let res = await dispatch(registerUser({...data, picture: ""}))
           if (res?.payload?.user) {
               navigate("/");
           }
        }
        
        

      
    }

    const uploadImage = async (picture)=>{
        console.log('the upload function has been fired');
        let formdata = new FormData()
        formdata.append("upload_preset",cloud_secret)
        formdata.append("file",picture);
        
        const {data} = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
                formdata
        )
        console.log(data)
        return data

       

    }



    
    console.log(status)
    return ( 
        <div className="h-screen w-full max-w-md flex items-center justify-center overflow-auto ">
            {/*container */}
            <div className=" max-h-md max-w-md space-y-10 mt-3 p-10 dark:bg-dark_bg_2 rounded-xl">
                <div className="text-center dark:text-dark_1">
                    <h2 className="mt-4 text-3xl text-white  font-bold">
                        Welcome
                    </h2>
                    <p className="mt-4 text-sm text-white"> Sign Up </p>
                </div>
                {/* Form */}
               <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                <AuthInput name="name" type="text" PlaceHolder="Full name" register={register} error={errors?.name?.message}/>
                <AuthInput name="email" type="email" PlaceHolder="Email" register={register} error={errors?.email?.message}/>
                <AuthInput name="status" type="text" PlaceHolder="Status" register={register} error={errors?.status?.message}/>
                <AuthInput name="password" type="password" PlaceHolder="Password" register={register} error={errors?.password?.message}/>

                <Picture  readablepicture={readableimage}  setReadableimage={setReadableimage} setPicture={setPicture}/>
           

              {
                error? <div>
                    <p className='text-red-400'> {error} </p>
                </div>:null
              }  
                
                
                <button className=" w-full jusitfy-center bg-green_1 p-4 hover:bg-green_2 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition
                ease-in duration-300 focus: outline-none" type='submit'>
                    {status == "loading"?(
                        <PacmanLoader color='red' size={16}/>
                    )
                    :"sign up"}
                    
                    </button>
                


               {/* signi in link */}
                <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
                    <span> have an account?</span>
                    <Link to="/login" className='hover:underline cursor-pointer transition ease-in duration-300'> Sign in </Link>
                </p>
          
          
               </form>
              </div>

        </div>
     );
}

export default RegisterForm; 
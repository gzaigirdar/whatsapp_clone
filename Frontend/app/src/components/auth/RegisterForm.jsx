import {useForm} from 'react-hook-form'
function RegisterForm() {
    const {register,handleSubmit,watch,formState: {errors}} = useForm();
    const onSubmit = (data) => console.log(data); 
    console.log("values",watch());
    console.log("errors",errors)
    return ( 
        <div className="h-screen w-full flex  items-center justify-center overflow-hidden">
            {/*container */}
            <div className="max-w-md space-y-10 p-10 dark:bg-dark_bg_2 rounded-xl">
                <div className="text-center dark:text-dark_1">
                    <h2 className="mt-6 text-3xl text-white  font-bold">
                        Welcome
                    </h2>
                    <p className="mt-4 text-sm text-white"> Sign Up </p>
                </div>
                {/* Form */}
               <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                <input type="test" {...register("name",{required:true})} />
                <button type='submit'> Submit </button>


               </form>

            </div>
          

        </div>
     );
}

export default RegisterForm; 
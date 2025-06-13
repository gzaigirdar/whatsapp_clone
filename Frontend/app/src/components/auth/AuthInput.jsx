function AuthInput({name,type,PlaceHolder,register,error}) {
  
    return (
    
        <div className=" mt-8 content-center dark:text-dark_text_1 space-y-1">
            <label htmlFor={name} className=" text-sm font-bold tracking-wide" > 
                {PlaceHolder}

            </label>
            <input type={type} PlaceHolder={PlaceHolder} {...register(name)} 
            className="w-full dark:bg-dark_bg_1 text-base py-2 px-4 outline-none">
            </input>
            {error && <p className="text-red-500"> {error}</p>}

            
        </div>
      );
}

export default AuthInput;

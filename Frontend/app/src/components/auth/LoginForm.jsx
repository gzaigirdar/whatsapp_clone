function Loginform() {
    return ( 
        <div className="h-screen w-full flex  items-center justify-center overflow-hidden">
            {/*container */}
            <div className="max-w-md space-y-10 p-10 dark:bg-dark_bg_2 rounded-xl">
                <div className="text-center dark:text-dark_1">
                    <h2 className="mt-6 text-3xl text-white  font-bold">
                        Welcome Back
                    </h2>
                    <p className="mt-4 text-sm text-white"> Sign in </p>
                </div>
                {/* Form */}
               <form className="mt-6 space-y-6"></form>

            </div>
          

        </div>
     );
}

export default Loginform;
import RegisterForm from "../components/auth/RegisterForm";
function register() {
    return (


       <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden ">
        {/*container*/}
        <div className="flex w-1600px mx-auto h-full">
         <RegisterForm/>
        </div>
      

       </div>
      );
}

export default register;
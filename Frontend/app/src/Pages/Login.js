import Loginform from "../components/auth/LoginForm";
function Login() {
    return ( 
        <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden ">
        {/*container*/}
        <div className="flex w-[1600px] mx-auto h-full">
            <Loginform/>
        </div>
      

       </div>
     
    

     
       
     );
}

export default Login;

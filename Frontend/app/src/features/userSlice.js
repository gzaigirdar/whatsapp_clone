import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:"",
    error:"",
    user:{
        id:"",
        name: "",
        email:"",
        picture:"",
        status:"",
        token: "",


    }
}
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        logout:(state)=>{
            state.status ="",
            state.user= {

                id:"",
                name: "",
                email:"",
                picture:"",
                status:"",
                token: "",
                id:"",
                name: "",
                email:"",
                picture:"",
                status:"",
                token: "",

            }
        }
    }

})
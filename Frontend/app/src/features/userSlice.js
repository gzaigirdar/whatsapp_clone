import { createSlice } from "@reduxjs/toolkit";

// seperate data for the store, that is handle by it's own reducers that updates it's state

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
            
            }
        }
    }

})

export const {logout} = userSlice.actions;
export default userSlice.reducer;

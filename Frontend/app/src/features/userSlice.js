import { createSlice } from "@reduxjs/toolkit";

// seperate data for the store, that is handle by it's own reducers that updates it's state
// object that holds initial states data
const initialState = {
    status:"",
    error:"",
    user:{
        id:"",
        name: "gman",
        email:"",
        picture:"",
        status:"",
        token: "",


    }
}
export const userSlice = createSlice({
    name: "user",
    initialState,

    // log out reducers
    reducers:{
        logout:(state)=>{
            state.status ="";
            state.user= {

                id:"",
                name: "gg",
                email:"",
                picture:"",
                status:"",
                token: "",
            
            }
        }
    }

})
// exporting logout reducer from user slice
export const {logout} = userSlice.actions;
// exporting user slice
export default userSlice.reducer;

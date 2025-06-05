import createHttpError from "http-errors";
import  UserModel  from "../models/userModel.js"

export const finduser = async (id)=>{
    const user = await UserModel.findById(id);
    if(!user) throw createHttpError.BadRequest('please fill all the fields');
    return user;
}
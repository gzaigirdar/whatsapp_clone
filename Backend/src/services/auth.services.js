import createHttpError from "http-errors"
import validator from "validator";
import { UserModel } from "../models/index.js";
import bcrypt from 'bcrypt'


// this functions are used by controller functions to perform diffirent tasks 
export const createUser= async(userData)=>{
    
        const {name,email,picture,status,password} = userData;

        if(!name || !email || !password){
            //throw createHttpError.BadRequest('please fill all the information');
            
            throw createHttpError.BadRequest("values not found")

        }

        if(status && status.length > 64){
            throw createHttpError.BadRequest("status has to be smaller than 64 characters");
        }
        
        if(!validator.isEmail(email)){
            throw createHttpError.BadRequest("plase enter email");

        }

        const checkdb= await UserModel.findOne({email});
        if(checkdb){
            throw createHttpError.Conflict("user already exits,use another email")
        }

        const user = await new UserModel({
            name,
            email,
            picture,
            status,
            password,
        });
        await user.save()
        return user;

    
}
export const signuser = async(email,password) =>{
   
    // lean returns a js object instead of mongo document
    const user = await UserModel.findOne({email: email.toLowerCase() }).lean()
    if(!user){
        throw createHttpError.NotFound("invaild credintals")

    }
    let match = await bcrypt.compare(password,user.password)
    if (!match){
        throw createHttpError.NotFound('invaild credntials')
    }
    return user;

   
}

import { createUser} from "../services/auth.services.js";
import { generateToken,verifyToken } from "../services/token.services.js";
import { signuser } from "../services/auth.services.js";
import { finduser } from "../services/user.services.js";
import createHttpError from "http-errors";

// these functinos are used in the routes to perform actions such get data,register and other tasks,
export const register = async(req,res,next) =>{
    try{
        const {name,email,picture,status,password} = req.body;
        const user = await createUser(req.body);
        
        const accessToken = await generateToken({userID: user._id},
            "1d",
            process.env.ACCESS_TOKEN_SECRET);
        const refreshToken  = await generateToken({userId:user._id},"20d",
            process.env.REFRESH_TOKEN_SECRET
        )
        res.cookie("refreshtoken",refreshToken,{
            httpOnly:true,
            path:"http://localhost:9000/api/auth/refreshtoken",
            maxAge: 30*24*60*1000, //30 days
        })
        res.json({
            message:"success",
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                picture:user.picture,
                status:user.status,
                accessToken,

    
            },
        
        });
        console.table({
            accessToken,
            refreshToken
        })

       


    }
    catch(error){
        next(error)
    }
}
export const login = async(req,res,next) =>{
    try{
        const {password,email} = req.body;
        const user = await signuser( email,password)
        const accessToken = await generateToken({userID: user._id},
            "1d",
            process.env.ACCESS_TOKEN_SECRET);
        const refreshToken  = await generateToken({userId:user._id},"20d",
            process.env.REFRESH_TOKEN_SECRET
        )
        res.cookie("refreshtoken",refreshToken,{
            httpOnly:true,
            path:"http://localhost:9000/api/auth/refreshtoken"
        })
        res.json({
            message:"success",
            accessToken,
        });



    }
    catch(error){
        next(error)
    }
}
export const logout = async(req,res,next) =>{
    try{
        res.clearCookie('refreshtoken',{
            path:"http://localhost:9000/api/auth/refreshtoken"

        })
        res.json("logged out")
    }
    catch(error){
        next(error)
    }
}
export const refresh_token = async(req,res,next) =>{
    try{
        const refresh_token = req.cookies.refreshtoken;
        if(!refresh_token) throw createHttpError.Unauthorized("Please log in");
        const check = await verifyToken(refresh_token,
            process.env.REFRESH_TOKEN_SECRET);
       
        // use the user id from the jwt token to check if the user exist
        const user = await finduser(check.userId)
        
        const accessToken = await generateToken({userID: user._id},
            "1d",
            process.env.ACCESS_TOKEN_SECRET);
        res.json({
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                picture:user.picture,
                status:user.status,
                accessToken,

    
            }
           


        })




    }
    catch (error){
        next(error)
    }
}
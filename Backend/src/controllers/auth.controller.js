
import { createUser} from "../services/auth.services.js";
import { generateToken,verifyToken } from "../services/token.services.js";
import { signuser } from "../services/auth.services.js";
import createHttpError from "http-errors";

// these functinos are used in the routes to perform actions such get data,register and other tasks,
export const regeister = async(req,res,next) =>{
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
            path:"http://localhost:9000/api/auth/refreshtoken"
        })
        res.json({
            message:"success",
            accessToken,
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
        console.log(check)
        res.json(check)




    }
    catch (error){
        next(error)
    }
}
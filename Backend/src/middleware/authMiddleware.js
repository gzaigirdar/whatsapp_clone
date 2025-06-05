import createHttpError from "http-errors";
import jwt from 'jsonwebtoken';


export default function async(req,res,next){
    if(!req.headers['authorization']){
       
       return next(createHttpError.Unauthorized());
       
    }
    const bearer_token = req.headers['authorization']
    const token = bearer_token.split(" ")[1];
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
        if(err){
            
     
            return next(createHttpError.Unauthorized(err.name));
        }

        // if successfull we add the payload(such as user id ) from jwt token into the request itself. 
        req.user = payload;
        next()
    })
    
 }
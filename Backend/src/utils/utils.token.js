import jwt from 'jsonwebtoken'
import logger from '../configs/logger.js';
// this function generates a jwt token
// utils functoins used by service provider functions 
export const sign = async(data,expiresin,secret) => {
    return new Promise((resolve,reject)=> {

        jwt.sign(data,secret,{
            expiresIn:expiresin,
        },(error,token)=>{
            if(error){
                logger.error(error)
                reject(error)
            } else{
                resolve(token)
            }
        });
  

     
    })
        
        
    
}
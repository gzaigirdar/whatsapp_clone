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
export const verify = async (token,secret) => {
    // have to create a promise here since this function does requires time to verify
    return new Promise((resolve,reject) => {
        // jwt function takes secret and token and returns error and payload
        jwt.verify(token,secret,(error,payload)=>{
            if(error){
                logger.error(error)
                resolve(null);
            }
            else{
                resolve(payload)
            }
        })


    })
}
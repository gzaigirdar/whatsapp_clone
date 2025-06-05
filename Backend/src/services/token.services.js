import { sign,verify } from "../utils/utils.token.js";

export async function generateToken(data,expriesIn,secret){
    let token = await sign(data,expriesIn,secret)
    return token;

}
export const verifyToken = async (token,secret) =>{
    let check = await verify(token,secret);
    return check;
}

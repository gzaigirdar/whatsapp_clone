import { sign } from "../utils/utils.token.js";
export async function generateToken(data,expriesin,secret){
    let token = await sign(data,expriesin,secret)
    return token;

}
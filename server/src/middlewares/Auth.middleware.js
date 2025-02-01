import  jwt from "jsonwebtoken";
import { Asynchandler } from "../utlis/Asynchandler.js";
import { User } from "../modal/User.modal.js";
import { ApiError } from "../utlis/ApiError.js";


const verifyToken = Asynchandler(async (req , _, next )=>{
    const Token = await req.cookies?.accessToken;


    if(!Token){
        throw new ApiError(401 , "token is unavailable"); 
    }
    try {
        const verify = jwt.verify(Token, process.env.ACCESS_TOKEN_SCRECT);
        const user =  await User.findById(verify?.id)
    
        if (!user) {
            throw new ApiError(401 , "can not find the user");
        }

        req.user = user ;
        next()

    } catch (err) {
        console.error(err.message); 
        throw new ApiError(401, "Invalid or tampered token");
    }

    

  
})


export default verifyToken;
import  Jwt from "jsonwebtoken";
import { Asynchandler } from "../utlis/Asynchandler.js";
import { User } from "../modal/User.modal.js";


const verifyToken = Asynchandler(async (req , _, next )=>{
    const Token = req.cookies?.accessToken;
    
    if(!Token){
        res.status(401)
        throw new Error("unAuthorized Token"); 
    }

    const verify = Jwt.verify(Token ,process.env.ACCESS_TOKEN_SCRECT)
    const user =  await User.findById(verify.id)

    if (!user) {
        res.status(401)
        throw new Error("unAuthorized user");        
    }

    req.user = user ;
    next()
})


export default verifyToken;
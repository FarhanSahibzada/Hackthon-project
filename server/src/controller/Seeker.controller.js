import { Recipation } from "../modal/Seeker.modal.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Asynchandler } from "../utlis/Asynchandler.js";
import { ApiError } from "../utlis/ApiError.js";
import sendEmail from "../utlis/sendEmail.js";

const generateUniqueToken = async (nic) => {
    try{
        const token = jwt.sign({ Cnic: nic }, process.env.SECRET_KEY_FOR_Token);
        
        return {
            token
        }

    }catch(error){
        console.log("error when creating a token")
    }
}

const createSeeker = Asynchandler(async (req, res) => {

    const { name, email, phoneNumber, Cnic, address, purpose } = req.body;

    if (
        [name, email, phoneNumber, Cnic, address, purpose].some((field) => field?.trim() == "")
    ) {
        throw new Error(401, " All fields are required ");
    }

    const {token}  = await generateUniqueToken(Cnic)

    if (!token) {
        throw new ApiError(403 , "Can not getting the token ")
    }

    const seeker = await  Recipation.create({
        name,
        email,
        phoneNumber,
        Cnic,
        address,
        token: token,
        purpose,
    })

    sendEmail(email)

    const findseeker  = await Recipation.findById(seeker._id)
    
    return res
        .status(200)
        .json(new ApiResponse(200, findseeker , "Seeker is Successfully created"))
})


export {
    createSeeker
}

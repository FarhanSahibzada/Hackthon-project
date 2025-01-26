import { Recipation } from "../modal/Seeker.modal.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import Jwt from "jsonwebtoken";
import { Asynchandler } from "../utlis/Asynchandler.js";

const generateUniqueToken = async (username) => {

    const token = Jwt.sign({ name: username }, process.env.SECRET_KEY_FOR_Token);

    return {
        token
    }
}

const createSeeker = Asynchandler(async (req, res) => {

    const { name, email, phoneNumber, Cnic, address, purpose } = req.body;

    if (
        [name, email, phoneNumber, Cnic, address, purpose].some((field) => field?.trim() == "")
    ) {
        throw new Error(401, "409, 'All fields are required '");
    }

    const { token } = generateUniqueToken(name)

    if (!token) {
        res.status(401);
        throw new Error( "cen not getting the token");
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

    const findseeker  = await Recipation.findById(seeker._id)
    
    return res
        .status(200)
        .json(new ApiResponse(200, findseeker , "Seeker is Successfully created"))
})


export {
    createSeeker
}

import { Recipation } from "../modal/Seeker.modal.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import { Asynchandler } from "../utlis/Asynchandler.js";


const getSeekerDetail = Asynchandler(async (req, res) => {

    const { Cnic } = req.params;
    if (!Cnic) {
        res.status(400)
        throw new Error("cannot find the cnic number");
    }

    const seeker = await Recipation.find({ Cnic })

    if (!seeker || seeker.length === 0) {
        res.status(404); // Not Found
        throw new Error("No seekers found with this CNIC.");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, seeker, "sekker is successflu fetch"))

})


const DeletSeeker = Asynchandler(async (req, res) => {

    const { id } = req.params;
  
    if (!id) {
        res.status(400)
        throw new Error("cannot  delet the seeker");
    }

    const seeker = await Recipation.deleteOne({ _id : id }) 

    return res
        .status(200)
        .json(new ApiResponse(200,"sekker is successfully deleted"))

})


export {
    getSeekerDetail,
    DeletSeeker
}
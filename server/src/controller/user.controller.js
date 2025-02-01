import { User } from '../modal/User.modal.js'
import { ApiError } from '../utlis/ApiError.js'
import { ApiResponse } from '../utlis/ApiResponse.js'
import { Asynchandler } from '../utlis/Asynchandler.js'

const generateAccessTokenAndResfreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const AccessToken = user.generatedAccessToken()
        const RefrehToken = user.generatedRefreshToken()
        user.refreshToken = RefrehToken;
        await user.save({ validateBeforeSave: false })

        return {
            AccessToken,
            RefrehToken
        }
    } catch (error) {
        throw new Error("Something Went Wrong while Generating Access and Refreh token");

    }
}

const registerUser = Asynchandler(async (req, res) => {

    const { username, email, password, role} = req.body;

    if (
        [username, email, password].some((field) => field?.trim() == "")
    ) {
        throw new ApiError(401 , "can not getting the data ");
    }

    const existedUser = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (existedUser) {
        throw new Error("user is already exist");
    }

    const user = await User.create({
        email,
        password,
        username: username.toLowerCase(),
        role,
    })

    const createdbyuser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdbyuser) {
        throw new Error("something went while registering the user");
    }

    return res.status(200).json(
        new ApiResponse(200, createdbyuser, "user registered successfully")
    )

})

const loginUser = Asynchandler(async (req, res) => {

    const { email, username, password, role } = req.body


    if (!username && !email) {
        throw new Error("data is not coming");

    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new Error("User docs not Exist");
    }

    const ispasswordValid = await user.isPasswordCorrected(password)
    if (!ispasswordValid) {
        throw new Error("Invalid user Credientials");

    }

    const { AccessToken, RefrehToken } = await generateAccessTokenAndResfreshToken(user._id)
    const loggedInUser = await User.findOne(user._id).select("-password  -refreshToken")

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV == "production" ? "None" : "Lax"
    }

    return res
        .status(200)
        .cookie("accessToken", AccessToken, options)
        .cookie("refreshToken", RefrehToken, options)
        .json(new ApiResponse(
            200,
            { user: loggedInUser, AccessToken, RefrehToken },
            "User Logged In Successfully"
        ))
})

const logoutUser = Asynchandler(async (req, res) => {
    
    const user = await User.findByIdAndUpdate(req.user?._id,
        {
            $set: {
                refeshToken: null
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Logout Successfully "))
})

const refreshAccessToken = Asynchandler(async (req, res) => {

    const Token = await req.cookies?.refreshToken;
    if (!Token) {
        throw new Error("unAuthorized Token");
    }
    try {
        console.log(Token)
        const verifyToken = jwt.verify(Token, process.env.REFRESH_TOKEN_SECRET)
        console.log(verifyToken)
        const user = await User.findOne(verifyToken?._id)

        if (!user) {
            throw new Error("Invalid Refresh token");
        }

        const { AccessToken, RefrehToken } = await generateAccessTokenAndResfreshToken(user._id)

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV == 'production' ? "None" : "Lax"
        }

        return res
            .status(200)
            .cookie("accessToken", AccessToken, options)
            .cookie("refreshToken", RefrehToken, options)
            .json(
                new ApiResponse(
                    200,
                    { AccessToken, RefrehToken },
                    "Access token refreshed"
                )
            )

    } catch (error) {
        throw new ApiError(401, error?.message || "invalid refresh token");
    }
})

const getCurrentUser = Asynchandler(async (req, res) => {
    
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.user,
            "currentUser was found "
        ))
})

const findUserWithId = Asynchandler(async (req, res) => {
    const {id} = req.params;

    if(!id){
        throw new Error("cannot get the id")
    }

    const user = await User.findById({_id : id}).select("-refreshToken -passowrd")

    if(!user){
        throw new Error("error when find the user");
        
    }
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            user,
            "currentUser was found "
        ))
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    findUserWithId
}
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AlertBox from "@/components/AlertBox";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import PurposeDropdown from "@/components/PurposeDropdown";

export interface FormData {
    name: string;
    email: string;
    Cnic: string;
    phoneNumber: string;
    address: string;
    purpose: string;
    token: string;
}

export interface userData {
    username: string,
    email: string,
    role: string
}

function Support() {
    const [isOpen, setIsOpen] = useState(true)
    const navigate = useNavigate()
    const [alertOpen, setAlertOpen] = useState(false)
    const userdata = useSelector((state: RootState) => state.auth.userLogin)

    useEffect(() => {
        if (isOpen == false) {
            navigate('/Home')
        }
    }, [isOpen, navigate])

    const onSubmit = async (data: FormData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}recipation/register`, data,
                { withCredentials: true }
            )
            if (response.status == 200) {
                console.log("seeker is successfully updated")
                setAlertOpen(true)
            }
        } catch (error) {
            console.log("error when submitting the data", error)
            alert("error please try again")
        }
    };

    const { register, handleSubmit, control, getValues, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            name: userdata?.username,
            email: userdata?.email
        }
    });

    return (
        <>
            <AlertBox title="Registerd" description="Your response is successfully registered" isopen={alertOpen} setIsOpen={setAlertOpen} />
            <Dialog open={isOpen} onOpenChange={setIsOpen} >
                <DialogContent  className="max-h-[80vh] overflow-y-auto ">
                    <DialogHeader>
                        <DialogTitle>Seeker Information</DialogTitle>
                        <DialogDescription>
                            Please Fill Correct the Corrected Information.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="Cnic">CNIC</Label>
                            <Input
                                id="Cnic"
                                type="number"
                                placeholder="Enter your CNIC"
                                {...register("Cnic",
                                    {
                                        required: "CNIC is required",
                                        minLength: {
                                            value: 13,
                                            message: "Minimum length must be 13 characters"
                                        },
                                        maxLength: {
                                            value: 13,
                                            message: "Maximum length must be 13 characters"
                                        }
                                    })}
                            />
                            {errors.Cnic && <p className="text-red-500 text-sm">{errors.Cnic.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                type="number"
                                placeholder="Enter your phone number"
                                {...register("phoneNumber",
                                    {
                                        required: "Phone number is required",
                                        minLength: {
                                            value: 11,
                                            message: "Minimum length must be 13 characters"
                                        }
                                    })}
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                type="text"
                                placeholder="Enter your address"
                                {...register("address", { required: "Address is required" })}
                            />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="purpose">Purpose</Label>
                            <PurposeDropdown
                                control={control}
                                defaultValue={getValues('purpose')}
                            />
                            {errors.purpose && <p className="text-red-500 text-sm">{errors.purpose.message}</p>}
                        </div>

                        <DialogFooter >
                            <Button type="submit" className="mt-20">Submit</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Support
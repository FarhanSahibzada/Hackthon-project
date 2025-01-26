import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface FormData {
    name: string;
    email: string;
    Cnic: string;
    phoneNumber: string;
    address: string;
    purpose: string;
    token: string;
}

export interface userData {
    username :string ,
    email : string,
    role : string
}

function Support() {
    const { id } = useParams()
    const [data , setData] = useState<userData>() 
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues : {
            name : data?.username,
            email : data?.email
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/find-user/${id}`, { withCredentials: true })
                if (response && response.data) {
                    setData(response.data?.data)
                } else {
                    console.log("Can't register your account")
                }
            } catch (error) {
                console.log("error when getting the user data" , error)
            }
        }

        fetchData()
    }, [id])

    const onSubmit = async(data: FormData) => {
     try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/recipation/create-user` , data ,
            {withCredentials: true}
        )        
        if(response.status == 200){
            console.log("seeker is successfully updated")
        }
     } catch (error) {
        console.log("error when submitting the data" , error)
     }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">Open Form</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Seeker Information</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                            type="text"
                            placeholder="Enter your CNIC"
                            {...register("Cnic", { required: "CNIC is required" })}
                        />
                        {errors.Cnic && <p className="text-red-500 text-sm">{errors.Cnic.message}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                            id="phoneNumber"
                            type="text"
                            placeholder="Enter your phone number"
                            {...register("phoneNumber", { required: "Phone number is required" })}
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
                        <Input
                            id="purpose"
                            type="text"
                            placeholder="Enter the purpose"
                            {...register("purpose", { required: "Purpose is required" })}
                        />
                        {errors.purpose && <p className="text-red-500 text-sm">{errors.purpose.message}</p>}
                    </div>

                    <DialogFooter>
                        <Button type="submit" >Submit</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default Support
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import AlertBox from "@/components/AlertBox";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import PurposeDropdown from "@/components/PurposeDropdown";
import domtoimage from 'dom-to-image'
import saylaniImage from '@/assets/saylanilog.png'

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
    const [seekerData, setSeekerData] = useState<FormData | null>(null)
    const [qrcode, setQrcode] = useState('')
    const cardRef = useRef(null)

    useEffect(() => {
        if (!seekerData) {
            if (isOpen == false) {
                navigate('/Home')
            }
        }
    }, [isOpen, navigate, seekerData])

    const onSubmit = async (data: FormData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}seeker/register`, data,
                { withCredentials: true }
            )
            if (response && response.data) {
                console.log("seeker is successfully updated")
                setSeekerData(response.data?.data)
                setIsOpen(false)
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

    useEffect(() => {
        const code = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + seekerData?.token;
        setQrcode(code);
    }, [seekerData])

    const handledownloadBtn = () => {
        if (cardRef.current) {
            domtoimage.toPng(cardRef.current)
                .then((dataUrl: string) => {
                    const link = document.createElement("a");
                    link.href = dataUrl;
                    console.log(dataUrl);
                    link.download = seekerData?.name || "";
                    link.click();
                    navigate('/Home')
                }).catch((error: string) => {
                    console.log("error when downloading the card ", error)
                })
        }
    }

    return (
        <>
            <AlertBox title="Registerd" description="Your response is successfully registered please download your Slip and check you email" isopen={alertOpen} setIsOpen={setAlertOpen} />
            <Dialog open={isOpen} onOpenChange={setIsOpen} >
                <DialogContent className="max-h-[80vh] overflow-y-auto ">
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
                                            message: "Minimum length must be 13 Numbers"
                                        },
                                        maxLength: {
                                            value: 13,
                                            message: "Maximum length must be 13 Numbers"
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
                                            message: "Minimum length must be 11 Numbers"
                                        },
                                        maxLength: {
                                            value: 12,
                                            message: "Maximum length must be 12  Numbers"
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
            {seekerData && (
                <div className="flex  justify-center items-center  min-h-screen -mt-8 ">
                    <div className="max-w-6xl  shadow-xl" >
                        <div className="w-full flex flex-col md:flex-row py-20 rounded-2xl px-10  gap-6 bg-white relative"
                            ref={cardRef}
                        >
                            <img src={saylaniImage} alt=""
                                className="absolute w-40 top-4 left-4"
                            />
                            <figure className="mt-6">
                                <img src={qrcode || ""} alt=""
                                    className="w-full"
                                />
                            </figure>
                            <div className="mt-6">
                                <h1 className="font-bold mb-1">Name :  <span className="font-semibold text-neutral-400 ms-1">{seekerData?.name}</span> </h1>
                                <h1 className="font-bold mb-1">email :  <span className="font-semibold text-neutral-400 ms-1">{seekerData?.email}</span> </h1>
                                <h1 className="font-bold mb-1">CNiC :  <span className="font-semibold text-neutral-400 ms-1">{seekerData?.Cnic}</span> </h1>
                                <h1 className="font-bold mb-1">phoneNumber :  <span className="font-semibold text-neutral-400 ms-1">{seekerData?.Cnic}</span> </h1>
                                <h1 className="font-bold mb-1">Address :  <span className="font-semibold text-neutral-400 ms-1">{seekerData?.address}</span> </h1>
                            </div>
                        </div>
                        <div className="text-right mb-4 me-4">
                            <Button
                                onClick={handledownloadBtn}>
                                Download
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Support
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { UserRound, MailIcon, LockIcon, EyeIcon, EyeOffIcon, Contact, ChevronDown, ChevronUp } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { userLogin } from '@/store/authSlice'
import axios from 'axios'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import AlertBox from '@/components/AlertBox'

interface formData {
    username: string,
    email: string,
    password: string,
    role: string,
}

function SignUp() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [selectedRole, setSelectedRole] = React.useState<string>('user')
    const { register, handleSubmit, control, formState: { errors } } = useForm<formData>({
        defaultValues: {
            role: "user"
        }
    })
    const [isOpen, setIsOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false)

    const signup = async (data: formData) => {
        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}user/register`, data, { withCredentials: true })
            if (response.status == 200) {
                dispatch(userLogin(response.data.data))
                navigate('/Home')
            }
        } catch (error) {
            console.log("error when register", error)
            setAlertOpen(true)
        } finally {
            setLoading(false)
        }

    }

    return (
        <>
            <AlertBox isopen={alertOpen} setIsOpen={setAlertOpen} title='Error' description='Can t register your account please try again!' />
            <div className="mt-10 w-full py-4 flex items-center justify-center  px-4 sm:px-6 lg:px-8">
                <div className="w-full bg-gray-50 rounded-lg px-10 md:w-[50%] shadow-xl space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
                    </div>
                    <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserRound className="h-12 w-12 text-primary" />
                    </div>
                    <form onSubmit={handleSubmit(signup)} className="space-y-8">
                        <div>
                            <div className='relative'>
                                <Contact className="absolute left-3 top-1/2 transform -translate-y-[37%] text-gray-400" size={20} />
                                <Input
                                    type="text"
                                    {...register("username", { required: "Username is required" })}
                                    className="pl-10 focus:ring-primary rounded-lg shadow-md"
                                    placeholder="Full name"
                                />
                            </div>
                            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                        </div>

                        <div>
                            <div className="relative">
                                <MailIcon className="absolute left-3 top-1/2 transform -translate-y-[40%] text-gray-400" size={20} />
                                <Input
                                    placeholder="Email address"
                                    type="email"
                                    required
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: "Enter a valid email",
                                        },
                                    })}
                                    className="pl-10 focus:ring-primary rounded-lg shadow-md"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        <div>
                            <div className="relative">
                                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-[40%] text-gray-400" size={20} />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 3, message: "Password must be at least 3 characters" }, maxLength: { value: 8, message: "Password must not exceed 8 characters" }
                                    })}
                                    className="pl-10 focus:ring-primary rounded-lg shadow-md"
                                    placeholder="Password"
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-[40%] text-gray-400"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <Controller
                                name="role"
                                control={control}
                                rules={{ required: "Role is required" }}
                                render={({ field }) => (
                                    <DropdownMenu
                                        onOpenChange={(open) => setIsOpen(open)}
                                    >
                                        <DropdownMenuTrigger asChild>
                                            <Button className="w-full text-left bg-base-200  hover:bg-base-300 text-black relative">
                                                {selectedRole}
                                                <span className='absolute right-8'>{isOpen ? (<ChevronDown size={24} />) : (<ChevronUp size={24} />)}</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-full">
                                            {["admin", 'department', "user"].map((role) => (
                                                <DropdownMenuItem
                                                    key={role}
                                                    onClick={() => {
                                                        setSelectedRole(role);
                                                        field.onChange(role);
                                                    }}
                                                >
                                                    {role}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            />
                            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 ease-in-out transform hover:scale-105"
                            >
                                {loading ? (
                                    <div className="flex space-x-3 py-1 ">
                                        <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                                        <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-100"></div>
                                        <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
                                    </div>
                                ) : 'Signup'}
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-base pb-10 text-gray-600">
                        Already have an account?{' '}
                        <Link to={"/sign-in"} className="font-medium text-primary hover:text-primary/80 transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default SignUp;

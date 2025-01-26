import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { LockIcon, MailIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { userLogin } from '@/store/authSlice'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button'


interface formData {
    username: string,
    email: string,
    password: string,
    role: string,
}

function SingIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [selectedRole, setSelectedRole] = React.useState("user");
    const { register, handleSubmit, control, formState: { errors } } = useForm<formData>()

    const log = async (data: formData) => {
        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login-user`, data,
                { withCredentials: true });
            if (response && response.data) {
                const res = response.data.data.user
                dispatch(userLogin(res));
                navigate('/Home');
                setLoading(false)
            } else {
                console.log("Can't get any data");
                setLoading(false)
            }
        } catch (error) {
            console.error("Login failed", error);
            alert('Login failed. Please check your credentials and try again.');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center shadow-xl bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-600">Login to your account</p>
                </div>
                <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <LockIcon className="h-12 w-12 text-primary" />
                </div>

                <form onSubmit={handleSubmit(log)} className="space-y-6">
                    {/* Email or Username Field */}
                    <div>
                        <div className="relative">
                            <MailIcon className="absolute left-3 top-1/2 transform -translate-y-[-40%] text-gray-400" size={20} />
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
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <div className="relative">
                            <LockIcon className="absolute left-3 top-1/2 transform -translate-y-[-40%] text-gray-400" size={20} />
                            <Input
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 3,
                                        message: "Password must be at least 3 characters",
                                    },
                                    maxLength: {
                                        value: 8,
                                        message: "Password must not exceed 8 characters",
                                    },
                                })}
                                className="pl-10 focus:ring-primary rounded-lg shadow-md"
                                placeholder="Password"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Controller
                            name="role"
                            control={control}
                            rules={{ required: "Role is required" }}
                            render={({ field }) => (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className="w-full text-left">
                                            {selectedRole || "Select Role"}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full">
                                        {["Admin", "User"].map((role) => (
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
                        {errors.role && (
                            <p className="text-red-500 text-sm">{errors.role.message}</p>
                        )}
                    </div>

                    {/* Forgot Password Link */}
                    <div className="flex items-center justify-end">
                        <div className="text-sm">
                            <a className="font-medium text-primary hover:text-primary/80 transition-colors">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md
                         shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 ease-in-out transform hover:scale-105"
                    >
                        {loading ? (
                            <div className="flex space-x-3 py-1 ">
                                <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                                <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-100"></div>
                                <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
                            </div>
                        ) : 'Login'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Don't Have an Account?{' '}
                    <Link to={"/Signup"} className="font-medium text-primary hover:text-primary/80 transition-colors">
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default SingIn;

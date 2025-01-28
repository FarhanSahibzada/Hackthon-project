import { RootState } from '@/store/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
    const userdata = useSelector((state: RootState) => state.auth.userLogin)
    const navigate = useNavigate()

    useEffect(() => {
        if (!userdata) {
            navigate('/sign-in')
        }
    }, [userdata , navigate])

    return (
        <div className="mt-10 md:-mt-10 md:min-h-screen flex items-center justify-center bg-white relative">
            <div className="flex flex-col md:flex-row items-center md:justify-between w-full max-w-7xl px-6">
                {/* Left Section: Text and Button */}
                <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Welcome to the <span className="font-bold text-orange-500">Saylani</span> Welfare
                        Non-Governmental Organization in Pakistan
                    </h1>
                    <p className="sm:text-2xl text-gray-600">
                        The largest NGO offering free{" "}
                        <span className="font-bold text-blue-600">healthcare and much more!</span>
                    </p>
                    <Link to={`/support/${userdata?._id}`} className="px-6 py-2 w-40  bg-blue-500 text-white rounded-lg hover:bg-blue-400 
                    transition-all duration-200 ease-in-out font-semibold  text-center">
                        Get Support
                    </Link>
                </div>

                {/* Right Section: Images */}
                <div  className=" flex-col items-center justify-center space-y-6 w-full md:w-1/2 mt-8 md:mt-0 
             hidden md:flex">
                    <div className="flex justify-center py-4">
                        <img
                            src={"https://res.cloudinary.com/saylani-welfare/image/upload/v1646926708/website-images/static/38.png"}
                            alt="Image 1"
                            className="w-[70%]  h-[70%]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

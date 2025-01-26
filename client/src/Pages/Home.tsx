import MaulanaSaab from '@/assets/mulana saab.jpg'

export default function Home() {
    return (
        <div className="-mt-10 min-h-screen flex items-center justify-center bg-gray-50">
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
                    <button className="px-6 py-2 w-40  bg-blue-500 text-white rounded-lg hover:bg-blue-400 
                    transition-all duration-200 ease-in-out font-semibold ">
                        Get Started
                    </button>
                </div>

                {/* Right Section: Images */}
                <div className="flex flex-col items-center justify-center space-y-6 w-full md:w-1/2 mt-8 md:mt-0">
                    <div className="flex justify-center space-x-6">
                        <img
                            src={MaulanaSaab}
                            alt="Image 1"
                            className="w-72 h-72 rounded-full border-4 border-gray-300 shadow-lg object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

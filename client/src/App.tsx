import { useState } from "react"
import Navber from "./components/Navber"
import Home from "./Pages/Home"


function App() {
  const [loading , setLoading] = useState<boolean>(false)
 
 
 
  return !loading ? (
    <div className='w-full flex gap-1 flex-col-reverse  bg-white'>
      <div className='w-full'>
        <Navber/>
        <Home/>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-slate-200 
    to-base-300 ">
      <div className="flex space-x-3 mb-6">
        <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-100"></div>
        <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  )
}

export default App

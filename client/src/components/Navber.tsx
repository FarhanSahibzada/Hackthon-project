import saylaniImage from '@/assets/saylanilog.png'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Navber() {

  const userStatus = useSelector((state: RootState) => state.auth.userLogin)
  return (
    <div className="navbar bg-base-100 border-b-4 border-slate-200 relative z-10">
      <div className="navbar-start flex items-center">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to={'/Home'} >Home</Link></li>
            <li><Link to={'/Support'}>Support</Link></li>
          </ul>
        </div>
        <div className=" btn btn-ghost text-xl -mt-3">
          <img src={saylaniImage} alt=""
            className='w-50 h-20 object-cover'
          />
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to={'/Home'} className='font-semibold'>Home</Link></li>
          <li><Link to={`support/${userStatus?._id}`} className='font-semibold'>Get Support</Link></li>
          <li><a></a></li>
        </ul>
      </div>
      <div className="navbar-end gap-2  pe-3">
        {userStatus ? (
          <Link to={'/'} className="px-3 py-1.5 bg-orange-400 text-white font-semibold ">Donate Now</Link>
        ) : (
          <>
            <Link to={'/sign-up'} className="px-3 py-1.5 bg-gray-700 text-white font-semibold ">Sign Up</Link>
            <Link to={'sign-in'} className="px-3 py-1.5  text-white font-semibold ">Sign In</Link>
          </>
        )}
      </div>
    </div>
  )
}

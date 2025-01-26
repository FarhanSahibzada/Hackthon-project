import saylaniImage from '@/assets/saylanilog.png'
import { Link } from 'react-router-dom'

export default function Navber() {

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
          <li><a>Home</a></li>
          {/* <li>
            <a>Parent</a>
            <ul className="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li> */}
          <li><a>Contact</a></li>
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
        <li><a>Home</a></li>
        {/* <li>
          <details>
            <summary>Parent</summary>
            <ul className="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </details>
        </li> */}
        <li><a>Contact</a></li>
        <li><a></a></li>
      </ul>
    </div>
    <div className="navbar-end gap-2  pe-3">
      <button  className="px-3 py-1.5 bg-gray-700 text-white font-semibold rounded-xl">Sign Up</button>
      <button className="px-3 py-1.5 bg-orange-400 text-white font-semibold rounded-xl">Sign In</button>
    </div>
  </div>
  )
}

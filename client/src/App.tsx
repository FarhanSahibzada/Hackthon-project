import { useCallback, useEffect, useState } from "react"
import Navber from "./components/Navber"
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { userLogin } from "./store/authSlice";
import { RootState } from "./store/store";


function App() {
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userData = useSelector((state: RootState) => state.auth.userLogin)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${BACKEND_URL}user/current-user`, {
        withCredentials: true,
      });
      if (response && response.data) {
        dispatch(userLogin(response.data?.data))
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log("Error fetching current user:", error);
      throw error;
    }
  }, [BACKEND_URL, dispatch]);

  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL} user/refresh-token`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.log("Error refreshing token:", error);
      throw error;
    }
  }, [BACKEND_URL]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        await fetchUser();
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404 || error.response?.status === 401) {
            console.log("Access token expired. Attempting to refresh token...");
            try {
              const isRefreshed = await refreshAccessToken();
              if (isRefreshed) {
                await fetchUser();
              }
            } catch (refreshError) {
              console.log("No user found. Please login.", refreshError);
              navigate("/sign-in");
            }
          }
        }
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, [navigate, dispatch, fetchUser, refreshAccessToken]);


  useEffect(() => {
    if (userData?.role === "user") {
      navigate("/Home");
    } else if (userData?.role === "department") {
      navigate("/user-data");
    } else if (userData?.role === "admin") {
      navigate("/admin");
    } 
  }, [userData, navigate])

  return !loading ? (
    <div className='w-full flex gap-1 flex-col-reverse  bg-white'>
      <div className='w-full'>
        <Navber />
        <Outlet />
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

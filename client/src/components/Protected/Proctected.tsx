import { RootState } from "@/store/store"
import {  ReactNode } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


interface proctededprops {
    allowedRoles? : string[]
    children  : ReactNode
}

export default function Proctected({allowedRoles , children} : proctededprops) {
    const userData = useSelector((state  : RootState)=> state.auth.userLogin)

    if(allowedRoles?.includes(userData?.role || "")){
        return children
    }

    return <Navigate to="/sign-in" />;
}

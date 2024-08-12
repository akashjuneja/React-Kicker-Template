import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/auth/AuthContext"

export const PrivateRoutes:React.FC=()=>{
    const {isAuthenticated}=useAuth()
    return isAuthenticated ?<Outlet/>:<Navigate to="/login"/>
}

import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/auth/AuthContext"

export const PublicRoutes:React.FC=()=>{
    const {isAuthenticated}=useAuth()
    return isAuthenticated ?<Navigate to="/home"/>:<Outlet/>
}

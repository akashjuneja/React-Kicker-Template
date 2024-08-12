import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/auth/AuthContext"
interface ProtectedRouteProps {
    role: string;
  }
export const ProtectedRoutes:React.FC<ProtectedRouteProps>=({role})=>{
    const {isAuthenticated,userRole}=useAuth()
    if(isAuthenticated){
      return userRole===role ? <Outlet/>:<Navigate to="/home"/>
    }else{
      return <Navigate to="/login"/>
    }
}
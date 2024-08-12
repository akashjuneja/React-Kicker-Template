import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../features/landing-page/LandingPage";
import Login from "../features/login/Login";
import Products from "../features/products/Products";
import Users from "../features/users/Users";
import Main from "../features/main/Main";
import { PrivateRoutes } from "./PrivateRoutes";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { PublicRoutes } from "./PublicRoutes";
import Home from "../features/home/Home";

const router = createBrowserRouter([
    {
        path:"",
        element:<PublicRoutes/>,
        children:[
            {path:"",element:<LandingPage/>},
            {
                path: '/login',
                element: <Login />
            },
        ]
    },  
    {
        path: '/home',
        element: <PrivateRoutes />,
        children: [
            {path:"",element:<Home/>,children:[
                {
                    path:'',
                    element:<Main/>
                },
                {
                    path: 'products',
                    element: <Products />
                },{
                    path:'users',
                    element:<Users/>
                },{
                    path:'dashboard',
                    element:<ProtectedRoutes role="admin"/>
                }
            ]},
            
        ]
    }
]);

const AppRouter: React.FC = () => <RouterProvider router={router} />;

export default AppRouter;

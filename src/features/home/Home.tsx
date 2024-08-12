import { Outlet } from "react-router-dom"
import Footer from "../../common/footer/Footer"
import Navbar from "../../common/navbar/Navbar"

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Home
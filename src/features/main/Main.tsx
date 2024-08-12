import { useNavigate } from "react-router-dom"

const Main = () => {
  const navigate=useNavigate()
  return (
    <div>
      <button onClick={() => navigate("/home/products")}>Products</button>
      <button onClick={()=>navigate("/home/users")}>Users</button>
    </div>
  )
}

export default Main
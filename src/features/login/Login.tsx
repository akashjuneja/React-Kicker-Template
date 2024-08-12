import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";

const createMockJwtToken = (user: { name: string, role: string }) => {
  // Create a simple base64 encoded payload
  const header = {
    alg: "HS256",
    typ: "JWT"
  };

  const payload = {
    name: user.name,
    role: user.role,
    iat: Math.floor(Date.now() / 1000) // issued at time
  };

  // Convert to JSON string and then to base64
  const encodeBase64 = (obj: object) => btoa(JSON.stringify(obj));
  const token = `${encodeBase64(header)}.${encodeBase64(payload)}.signature`;

  return token;
};
const Login: React.FC = () => {
  const {setIsAuthenticated}=useAuth()
  const [login, setLogin] = React.useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLogin({
      ...login,
      [name]: value
    });
    
  };

  const handleSubmit=()=>{
    // this is if i am successfluy authenticated , 
    const user = { name: login.email, role: "user" };
    const mockJwtToken = createMockJwtToken(user);
    setIsAuthenticated(true)
    localStorage.setItem("token", mockJwtToken);
    
   
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '30vh', gap: '10px', border: '1px solid black', padding: '10px', margin: '10px auto' }}>
      <input 
        type="email" 
        name="email" 
        placeholder="Enter email" 
        value={login.email} 
        onChange={handleChange} 
      />
      <input 
        type="password" 
        name="password" 
        placeholder="Enter password" 
        value={login.password} 
        onChange={handleChange} 
      />
      <button onClick={handleSubmit}>Login</button> 
    </div>
  );
}

export default Login;

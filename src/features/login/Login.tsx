import React from "react";
import { useAuth } from "../../context/auth/AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [loginS, setLogin] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLogin({
      ...loginS,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginS.email, // assuming the API expects `username`
          password: loginS.password,
          expiresInMins: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const { token } = data;
      login(token);
      localStorage.setItem("token", token);
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error((error as Error).message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "30vh",
        gap: "10px",
        border: "1px solid black",
        padding: "10px",
        margin: "10px auto",
      }}
    >
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={loginS.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={loginS.password}
        onChange={handleChange}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;

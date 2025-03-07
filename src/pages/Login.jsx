import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("API Response:", data); // ✅ Log API response

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      if (!data.access_token) {
        throw new Error("Token not received. Check API response.");
      }

      localStorage.setItem("token", data.access_token); // ✅ Store token
      navigate("/products"); // ✅ Redirect after successful login

    } catch (err) {
      console.error("Login Error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleLogin} className="d-flex flex-column">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-2"
          required
        />
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;





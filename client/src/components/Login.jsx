import { useState } from "react";
import { useAuth } from "./AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {login} = useAuth();



  async function handleLogin(e) {
   e.preventDefault();
   const success = await login(username, password);
   if(!success){
    setError("login failed.");
   }
  }

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <input
        required
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        required
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

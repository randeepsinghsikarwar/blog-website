import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const passwordRequirements =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-type": "application/json" },
      });
      if (response.status === 200) {
        alert("successful registered");
      } else {
        alert("failed to register");
      }
    }
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h1>Signup</h1>
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
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        required
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Signup</button>
    </form>
  );
}

import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Header() {
 const {username, logout} = useAuth();

 function handleLogout(e){
    e.preventDefault();
    logout()
 }

  return (
    <header>
      <Link to="/" className="logo">
        <span>Log</span>
        <span style={{color:'gray'}}>It.</span>
      </Link>
      <nav>
        {username ? (
          <>
            <Link to="/create-blog">Write a blog</Link>
            <span className="logout" onClick={handleLogout}>Logout</span>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}

import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const { user,logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/">
          <img alt="Rocket logo" className="h-10 inline" src="/R2.png"></img>
        </NavLink>      
        <div className="flex space-x-4">
          <h4> Welcome, {user.first_name} {user.last_name}</h4>
          <NavLink to="/login" className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </NavLink>

        </div>
      </nav>
    </div>
  );
}


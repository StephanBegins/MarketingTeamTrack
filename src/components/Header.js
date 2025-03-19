import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  // Redirect to login if not authenticated
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/", { replace: true }); // Redirect to login
  };

  return (
    <div className="header">
      <h1>Marketing Team Tracker</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;

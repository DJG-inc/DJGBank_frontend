import logo from "../../assets/logo.svg";
import { useAuth } from "../../../Context/AuthContext";
import Swal from "sweetalert2";

export const Header = ({userName}) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    const confirm = await Swal.fire({
      title: "Logout",
      text: `Do you want to logout?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      logout();
    }
  }
  
  return (
    <header className="app-header">
      <div className="app-header-logo">
        <div className="logo">
          <span className="logo-icon">
            <img src={logo} />
          </span>
        </div>
      </div>
      <div className="app-header-navigation">
        <div className="tabs">
          <a href="#" className="active">Overview</a>
          <a href="#">
            Payments
          </a>
          <a href="#">Cards</a>
          <a href="#">Account</a>
          <a href="#">System</a>
          <a href="#">Business</a>
        </div>
      </div>
      <div className="app-header-actions">
        <button className="user-profile">
          <span style={{ color: "white" }}> {userName} </span>
          <span onClick={handleLogout}>
            {/* Exit icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20"><path fill="currentColor" d="M10.24 0c3.145 0 6.057 1.395 7.988 3.744a.644.644 0 0 1-.103.92a.68.68 0 0 1-.942-.1a8.961 8.961 0 0 0-6.944-3.256c-4.915 0-8.9 3.892-8.9 8.692c0 4.8 3.985 8.692 8.9 8.692a8.962 8.962 0 0 0 7.016-3.343a.68.68 0 0 1 .94-.113a.644.644 0 0 1 .115.918C16.382 18.564 13.431 20 10.24 20C4.583 20 0 15.523 0 10S4.584 0 10.24 0Zm6.858 7.16l2.706 2.707c.262.261.267.68.012.936l-2.644 2.643a.662.662 0 0 1-.936-.01a.662.662 0 0 1-.011-.937l1.547-1.547H7.462a.662.662 0 0 1-.67-.654c0-.362.3-.655.67-.655h10.269l-1.558-1.558a.662.662 0 0 1-.011-.936a.662.662 0 0 1 .936.011Z"/></svg>

          </span>
        </button>
        <div className="app-header-actions-buttons">
          <button className="icon-button large">
            <i className="ph-magnifying-glass"></i>
          </button>
          <button className="icon-button large">
            <i className="ph-bell"></i>
          </button>
        </div>
      </div>
      <div className="app-header-mobile">
        <button className="icon-button large">
          <i className="ph-list"></i>
        </button>
      </div>
    </header>
  );
};

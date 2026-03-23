import { useNavigate } from "react-router-dom";

export default function Sidebar({ role }) {
  const navigate = useNavigate();

  return (
    <div style={{
      width: "220px",
      background: "#111827",
      color: "white",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <h5>Menu</h5>

      <div onClick={() => navigate("/")}>Dashboard</div>

      <div onClick={() => navigate("/create-load")}>
        Create Load
      </div>

      {role === "BUYSELL" && (
        <div onClick={() => navigate("/my-loads")}>
          My Loads
        </div>
      )}

      {role === "TRANSPORTER" && (
        <>
          <div onClick={() => navigate("/available-loads")}>
            Available Loads
          </div>

          <div onClick={() => navigate("/notifications")}>
          Notifications 🔔
          </div>
        
        </>
      )}
    </div>
  );
}
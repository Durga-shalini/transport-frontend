import Sidebar from "./Sidebar";

export default function Layout({ children, role }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar role={role} />
      <div style={{ flex: 1, padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}
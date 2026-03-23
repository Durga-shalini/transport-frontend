export default function Navbar() {
  return (
    <div className="d-flex justify-content-between p-3 bg-white shadow">
      <h5>Transport System</h5>
      <button className="btn btn-danger"
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}>
        Logout
      </button>
    </div>
  );
}
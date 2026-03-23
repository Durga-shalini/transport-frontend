export default function LoadCard({ load }) {
  return (
    <div
      className="p-3 mb-3"
      style={{
        borderRadius: "16px",
        background: "linear-gradient(135deg, #ffffff, #f9fafb)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        border: "1px solid #e5e7eb",
        transition: "0.3s",
        cursor: "pointer"
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 style={{ margin: 0, fontWeight: "600" }}>
          {load.origin}
        </h6>

        <span style={{ fontSize: "14px", color: "#6b7280" }}>
          ➝
        </span>

        <h6 style={{ margin: 0, fontWeight: "600" }}>
          {load.destination}
        </h6>
      </div>

      <hr style={{ margin: "8px 0", opacity: 0.2 }} />

      <div className="d-flex justify-content-between align-items-center">

        <div style={{ fontSize: "13px", color: "#6b7280" }}>
           {load.material || "Material"} <br />
           {load.weight || "--"} tons
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#16a34a"
            }}
          >
            ₹{load.price}
          </div>

          <small style={{ color: "#9ca3af" }}>
            {load.date
              ? new Date(load.date).toLocaleDateString()
              : ""}
          </small>
        </div>

      </div>
    </div>
  );
}
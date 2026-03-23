import { useEffect, useState } from "react";
import api from "../api/axios";
import LoadCard from "../components/LoadCard";

export default function MyLoads() {
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/load/my")
      .then(res => {
        const data = res.data?.data || res.data || [];
        setLoads(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error("Error fetching my loads:", err);
        setLoads([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h5>Loading your loads...</h5>;
  }

  if (!loads || loads.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h4>No Loads Found</h4>
        <p>You haven’t created any loads yet </p>
      </div>
    );
  }

  return (
    <div>
      {loads.map(l => (
        <LoadCard key={l._id} load={l} />
      ))}
    </div>
  );
}
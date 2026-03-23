// pages/Notifications.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import socket from "../socket/socket";

export default function Notifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    socket.emit("join", "TRANSPORTER");

    api.get("/notifications")
      .then(res => setNotifications(res.data.data));

    socket.on("new_load", (data) => {
      setNotifications(prev => [{
        message: data.message,
        createdAt: data.createdAt,
        read: false
      }, ...prev]);
    });

    return () => socket.off("new_load");

  }, []);

  return (
    <div className="card-modern p-4 bg-white">

      <h4>🔔 Notifications</h4>

      {notifications.length === 0 && <p>No notifications</p>}

      {notifications.map((n, i) => (
        <div
          key={i}
          className={`p-3 mb-2 rounded ${
            n.read ? "bg-light" : "bg-warning-subtle"
          }`}
        >
          <div>{n.message}</div>
          <small>{new Date(n.createdAt).toLocaleString()}</small>
        </div>
      ))}

    </div>
  );
}
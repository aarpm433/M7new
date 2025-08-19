import React from "react";
import { Link } from "react-router-dom";

export default function AgentCard() {
  return (
    <div className="card" style={{ width: "18rem", margin: "20px" }}>
      <div className="card-body">
        <h5 className="card-title">Agent Management</h5>
        <p className="card-text">Manage your agents efficiently.</p>
        <Link to="/agent-management" className="btn btn-primary">
          Go to Agents
        </Link>
      </div>
    </div>
  );
}

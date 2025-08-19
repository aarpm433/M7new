import React from "react";
import { Link } from "react-router-dom";

export default function TransactionCard() {
  return (
    <div className="card" style={{ width: "18rem", margin: "20px" }}>
      <div className="card-body">
        <h5 className="card-title">Transactions</h5>
        <p className="card-text">Manage your transactions efficiently.</p>
        <Link to="/transactions" className="btn btn-primary">
          Go to Transactions
        </Link>
      </div>
    </div>
  );
}

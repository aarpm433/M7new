import React from "react";
import AgentCard from "./AgentCard";
import TransactionCard from "./TransactionCard";

export default function Cards() {
  return (
    <div className="d-flex flex-wrap">
      <AgentCard />
      <TransactionCard />
    </div>
  );
}

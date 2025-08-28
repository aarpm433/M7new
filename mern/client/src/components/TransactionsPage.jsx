import { useEffect, useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";

const TransactionRow = ({ transaction }) => (
  <tr>
    <td>{new Date(transaction.date).toLocaleString()}</td>
    <td>{transaction.agent?.name || "N/A"}</td>
    <td>${transaction.amount}</td>
  </tr>
);

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({ agent_id: "", amount: "" });
  const [showConfirm, setShowConfirm] = useState(false);
    const [alert, setAlert] = useState(null); 


  // Fetch transactions and agents
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:5050/transaction-data");
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        if (data.status === "ok") {
          setTransactions(data.data.transactions);
          setAgents(data.data.agents);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5050/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount: Number(form.amount) }),
      });
      const data = await res.json();
        if (data.status === "ok") {
        setTransactions([data.data, ...transactions].slice(0, 10));
        setForm({ agent_id: "", amount: "" });
        setShowConfirm(false);
        setAlert({ type: "success", message: "Transaction processed successfully!" });
        setTimeout(() => setAlert(null), 3000);     
    }   else {
        setAlert({ type: "danger", message: data.message || "Error processing transaction." });
        setTimeout(() => setAlert(null), 3000);
        }
    } catch (err) {
        setAlert({ type: "danger", message: "Error submitting transaction." });
        console.error("Error submitting transaction:", err);
    }
  };

    return(
        <>
        {alert && (
            <Alert variant={alert.type} className="mb-3 mx-4">
            {alert.message}
            </Alert>
            )}
            
        <h2 className="container mt-4" >Transactions</h2>

        {/* Form */}
        <div className="card p-3 mb-4">
            <h5>New Transaction</h5>
            <div className="mb-3">
            <label className="form-label">Agent</label>
            <select
                className="form-select"
                name="agent_id"
                value={form.agent_id}
                onChange={handleChange}
            >
                <option value="">-- Select Agent --</option>
                {agents.map((a) => (
                <option key={a._id} value={a._id}>
                    {a.name}
                </option>
                ))}
            </select>
            </div>

            <div className="mb-3">
            <label className="form-label">Amount</label>
            <input
                type="number" 
                min ="0" 
                step="1"
                className="form-control"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                onKeyDown={(e) => {
                    if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-' ) {
                        e.preventDefault();}
                }}
                onPaste={(e) => {
                  const pasted = e.clipboardData.getData('text');
                  if (/[^\d]/.test(pasted)) {
                    e.preventDefault();
                  }}}
            />
            </div>

            <button
            className="btn btn-primary"
            onClick={() => setShowConfirm(true)}
            >
            Submit
            </button>
        </div>

        {/* Confirmation Modal */}
        <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Confirm Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Add transaction of <strong>${form.amount}</strong> for agent{" "}
            <strong>
                {agents.find((a) => a._id === form.agent_id)?.name || "N/A"}
            </strong>
            ?
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                Cancel
            </Button>
            <Button variant="success" onClick={handleSubmit}>
                Confirm
            </Button>
            </Modal.Footer>
        </Modal>

        {/* Transaction Table */}
        <h5>Last 10 Transactions</h5>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Date</th>
                <th>Agent</th>
                <th>Amount</th>
            </tr>
            </thead>
            <tbody>
            {transactions.map((t) => (
                <TransactionRow key={t._id} transaction={t} />
            ))}
            </tbody>
        </table>
        
        </>
    );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Alert } from "react-bootstrap";
import { useCookies } from "react-cookie";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [cookies, setCookie] = useCookies(["session_token"]);

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Step 1: Login
    const response = await fetch("http://localhost:5050/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      setAlert({ type: "danger", message: "Login failed. Check credentials." });
      setTimeout(() => navigate("/unauthorized", { replace: true }), 1500);
      return;
    }

    const userData = await response.json();

    // Step 2: Create session on backend
    const sessionRes = await fetch(`http://localhost:5050/auth/session/${userData.data.userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!sessionRes.ok) {
      setAlert({ type: "danger", message: "Failed to create session." });
      return;
    }

    const sessionData = await sessionRes.json();
    console.log("Session response:", sessionData);



    if (sessionData.status === "ok") {
      // Step 3: Save session token as cookie
      setCookie("session_token", sessionData.data.token, {
        path: "/",
        maxAge: 86400,
        secure: false, 
        httpOnly: false,
      });

      // Step 4: Update auth context and navigate
      login();
      setAlert({ type: "success", message: "Login successful!" });
      setTimeout(() => navigate("/", { replace: true }), 1500);
    } else {
      setAlert({ type: "danger", message: "Failed to create session." });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto">
      <h2 className="text-lg font-semibold mb-4">Login</h2>
      {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => updateForm({ email: e.target.value })}
        className="block w-full mb-2 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => updateForm({ password: e.target.value })}
        className="block w-full mb-4 p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        Login
      </button>
    </form>
  );
}

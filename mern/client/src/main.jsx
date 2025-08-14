import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import App from "./App";
import Record from "./components/Record";
import RecordList from "./components/RecordList";
import Login from "./components/Login";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />, // Protect all routes below
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          { path: "/", element: <RecordList /> },
        ],
      },
      {
        path: "/create",
        element: <App />,
        children: [
          { path: "/create", element: <Record /> },
        ],
      },
      {
        path: "/edit/:id",
        element: <App />,
        children: [
          { path: "/edit/:id", element: <Record /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
  path: "/unauthorized",
  element: <Unauthorized />,
},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Dashboard from "./components/Dashboard";

// replace ReactDOM.render with ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById("root")).render(<Dashboard />);

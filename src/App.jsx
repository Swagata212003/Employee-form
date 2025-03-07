
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/AddEmployee";
import EmployeeList from "./pages/EmployeeList";
import EditEmployee from "./pages/EditEmployee";
import EditDepartment from "./pages/EditDepartment";
import ProductsPage from "./pages/ProductsPage"; 
import ProductDetail from "./pages/ProductDetail"; // Import ProductDetail
import Login from "./pages/Login"; 
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
};

function App() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);

    const storedDepartments = JSON.parse(localStorage.getItem("departments")) || ["Sales", "Production", "Marketing"];
    setDepartments(storedDepartments);
  }, []);

  const updateEmployees = (newEmployees) => {
    setEmployees(newEmployees);
    localStorage.setItem("employees", JSON.stringify(newEmployees));
  };

  const updateDepartments = (newDepartments) => {
    setDepartments(newDepartments);
    localStorage.setItem("departments", JSON.stringify(newDepartments));
  };

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-employee" element={<AddEmployee departments={departments} setEmployees={updateEmployees} />} />
          <Route path="/employee-list" element={<EmployeeList employees={employees} setEmployees={updateEmployees} />} />
          <Route path="/edit-employee/:index" element={<EditEmployee setEmployees={updateEmployees} employees={employees} />} />
          <Route path="/edit-dept" element={<EditDepartment departments={departments} setDepartments={updateDepartments} />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route path="/products" element={<PrivateRoute><ProductsPage /></PrivateRoute>} />
          <Route path="/product/:id" element={<PrivateRoute><ProductDetail /></PrivateRoute>} /> {/* Add ProductDetail route */}
        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </Router>
  );
}

export default App;

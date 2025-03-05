


import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        {/* Brand Name */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          <i className="bi bi-people-fill"></i> Employee Dashboard
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                to="/"
              >
                <i className="bi bi-house-door"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/add-employee" ? "active" : ""}`}
                to="/add-employee"
              >
                <i className="bi bi-person-plus"></i> Add Employee
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/employee-list" ? "active" : ""}`}
                to="/employee-list"
              >
                <i className="bi bi-list-task"></i> Employee List
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/edit-dept" ? "active" : ""}`}
                to="/edit-dept"
              >
                <i className="bi bi-pencil-square"></i> Edit Department
              </Link>
            </li>
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname === "/products" ? "active" : ""}`} to="/products">
          <i className="bi bi-box-seam"></i> Products
        </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

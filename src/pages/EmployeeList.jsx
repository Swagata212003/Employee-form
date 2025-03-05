import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
      setEmployees(storedEmployees);
    } catch (error) {
      console.error("Error loading employees:", error);
      toast.error("Failed to load employee data.");
    }
  }, []);

  const deleteEmployee = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    toast.success("Employee deleted successfully!");
  };

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleEdit = (index) => {
    navigate(`/edit-employee/${index}`);
  };

  const columns = [
    {
      name: "Full Name",
      selector: (row) => row.fullName || "N/A",
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email || "N/A",
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row) => row.contact || "N/A",
    },
    {
      name: "Actions",
      cell: (row, index) => (
        <div className="d-flex gap-2">
          <button className="btn btn-outline-info btn-sm" onClick={() => handleView(row)}>
            View
          </button>
          <button className="btn btn-outline-warning btn-sm" onClick={() => handleEdit(index)}>
            Edit
          </button>
          <button className="btn btn-outline-danger btn-sm" onClick={() => deleteEmployee(index)}>
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-center flex-grow-1">Employee List</h2>
        <button className="btn btn-success shadow-sm" onClick={() => navigate("/add-employee")}>
          Add Employee
        </button>
      </div>

      <DataTable columns={columns} data={employees} pagination highlightOnHover striped />

      {/* Employee Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee ? (
            <ul className="list-group">
              <li className="list-group-item"><strong>Full Name:</strong> {selectedEmployee.fullName}</li>
              <li className="list-group-item"><strong>Gender:</strong> {selectedEmployee.gender}</li>
              <li className="list-group-item"><strong>DOB:</strong> {selectedEmployee.dob}</li>
              <li className="list-group-item"><strong>Email:</strong> {selectedEmployee.email}</li>
              <li className="list-group-item"><strong>Contact:</strong> {selectedEmployee.contact}</li>
              <li className="list-group-item"><strong>Branch:</strong> {selectedEmployee.branch}</li>
              <li className="list-group-item"><strong>Department:</strong> {selectedEmployee.department}</li>
              <li className="list-group-item"><strong>Designation:</strong> {selectedEmployee.designation}</li>
              <li className="list-group-item"><strong>Qualifications:</strong> 
                {selectedEmployee.qualifications && selectedEmployee.qualifications.length
                  ? selectedEmployee.qualifications.map((q) => `${q.degree} (${q.year})`).join(", ")
                  : "N/A"}
              </li>
            </ul>
          ) : (
            <p className="text-danger">No details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeeList;

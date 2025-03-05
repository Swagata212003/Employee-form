// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const employeesPerPage = 2;  // Display only 2 employees per page
//   const navigate = useNavigate();

//   // Fetch employees from localStorage
//   useEffect(() => {
//     try {
//       const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
//       setEmployees(storedEmployees);
//     } catch (error) {
//       console.error("Error loading employees:", error);
//       toast.error("Failed to load employee data.");
//     }
//   }, []);

//   // Delete Employee Function
//   const deleteEmployee = (index) => {
//     const updatedEmployees = employees.filter((_, i) => i !== index);
//     setEmployees(updatedEmployees);
//     localStorage.setItem("employees", JSON.stringify(updatedEmployees));
//     toast.success("Employee deleted successfully!");

//     // Adjust page if the last employee on the current page is deleted
//     if ((currentPage - 1) * employeesPerPage >= updatedEmployees.length && currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Redirect to Edit Page
//   const editEmployee = (index) => {
//     navigate(`/edit-employee/${index}`);
//   };

//   // Pagination Logic
//   const totalEmployees = employees.length;
//   const totalPages = Math.ceil(totalEmployees / employeesPerPage);
//   const indexOfLastEmployee = currentPage * employeesPerPage;
//   const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
//   const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

//   return (
//     <div className="container mt-4">
//       {/* Header Section */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2 className="text-center flex-grow-1">Employee List</h2>
//         <button className="btn btn-success d-flex align-items-center gap-2 shadow-sm" onClick={() => navigate("/add-employee")}>
//           <i className="bi bi-plus-circle"></i> Add Employee
//         </button>
//       </div>

//       {/* Employee List */}
//       {totalEmployees > 0 ? (
//         <>
//           <ul className="list-group">
//             {currentEmployees.map((employee, index) => (
//               <li key={indexOfFirstEmployee + index} className="list-group-item d-flex justify-content-between align-items-center p-3 shadow-sm flex-wrap">
                
//                 {/* Employee Details Section */}
//                 <div className="flex-grow-1">
//                   <h5 className="fw-bold text-primary">{indexOfFirstEmployee + index + 1}. {employee.fullName || "N/A"}</h5>
//                   <p className="mb-1"><strong>Gender:</strong> {employee.gender || "N/A"}</p>
//                   <p className="mb-1"><strong>DOB:</strong> {employee.dob || "N/A"}</p>
//                   <p className="mb-1"><strong>Email:</strong> {employee.email || "N/A"}</p>
//                   <p className="mb-1"><strong>Contact:</strong> {employee.contact || "N/A"}</p>
//                   <p className="mb-1"><strong>Branch:</strong> {employee.branch || "N/A"}</p>
//                   <p className="mb-1"><strong>Department:</strong> {employee.department || "N/A"}</p>
//                   <p className="mb-1"><strong>Designation:</strong> {employee.designation || "N/A"}</p>
//                   <p className="mb-0"><strong>Qualifications:</strong> {employee.qualifications && employee.qualifications.length
//                     ? employee.qualifications.map((q) => `${q.degree} (${q.year})`).join(", ")
//                     : "N/A"}
//                   </p>
//                 </div>

//                 {/* Action Buttons Section */}
//                 <div className="d-flex gap-2">
//                   <button className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1 shadow-sm px-3" 
//                     onClick={() => editEmployee(indexOfFirstEmployee + index)}>
//                     <i className="bi bi-pencil-square"></i> Edit
//                   </button>
//                   <button className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1 shadow-sm px-3" 
//                     onClick={() => deleteEmployee(indexOfFirstEmployee + index)}>
//                     <i className="bi bi-trash"></i> Delete
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           {/* Pagination Controls */}
//           <div className="d-flex justify-content-between align-items-center mt-3">
//             <button
//               className="btn btn-outline-secondary"
//               onClick={() => setCurrentPage((prev) => prev - 1)}
//               disabled={currentPage === 1}
//             >
//               <i className="bi bi-arrow-left"></i> Previous
//             </button>

//             <span className="fw-bold">Page {currentPage} of {totalPages}</span>

//             <button
//               className="btn btn-outline-secondary"
//               onClick={() => setCurrentPage((prev) => prev + 1)}
//               disabled={currentPage === totalPages}
//             >
//               Next <i className="bi bi-arrow-right"></i>
//             </button>
//           </div>
//         </>
//       ) : (
//         // No Employees Found
//         <div className="text-center text-muted mt-4 p-4 border rounded bg-light">
//           <i className="bi bi-person-x fs-1 text-danger"></i>
//           <p className="mt-2 fw-bold">No employees found.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeList;





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

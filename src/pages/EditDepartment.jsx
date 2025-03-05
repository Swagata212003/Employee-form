import { useState } from "react";
import { toast } from "react-toastify";

const EditDepartment = ({ departments, setDepartments }) => {
  const [newDepartment, setNewDepartment] = useState("");

  const addDepartment = () => {
    if (!newDepartment.trim()) {
      toast.warn("Department name cannot be empty!");
      return;
    }

    if (departments.includes(newDepartment)) {
      toast.error("Department already exists!");
      return;
    }

    const updatedDepartments = [...departments, newDepartment];
    setDepartments(updatedDepartments);
    localStorage.setItem("departments", JSON.stringify(updatedDepartments));
    setNewDepartment("");
    toast.success("New department added!");
  };

  const deleteDepartment = (dept) => {
    const updatedDepartments = departments.filter((d) => d !== dept);
    setDepartments(updatedDepartments);
    localStorage.setItem("departments", JSON.stringify(updatedDepartments));
    toast.info(`Department '${dept}' deleted.`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Edit Departments</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter department name"
          value={newDepartment}
          onChange={(e) => setNewDepartment(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addDepartment}>Add</button>
      </div>
      <ul className="list-group">
        {departments.map((dept, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {dept}
            <button className="btn btn-danger btn-sm" onClick={() => deleteDepartment(dept)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditDepartment;

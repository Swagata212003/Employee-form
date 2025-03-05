// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// const EditEmployee = ({ employees, setEmployees }) => {
//   const { index } = useParams(); // Get employee index from URL
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({}); // Start with an empty object

//   const [degree, setDegree] = useState("");
//   const [year, setYear] = useState("");

//   // Load existing employee details
//   useEffect(() => {
//     const employeeIndex = parseInt(index, 10);
    
//     // Fetch employees from localStorage if the state is empty
//     let storedEmployees = employees;
//     if (employees.length === 0) {
//       storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
//     }
  
//     if (storedEmployees.length > 0 && employeeIndex >= 0) {
//       const employee = storedEmployees[employeeIndex];
//       if (employee) {
//         setFormData(employee);
//       } else {
//         toast.error("Employee not found!");
//         navigate("/employee-list");
//       }
//     }
//   }, [index, employees, navigate]);
  
//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Add a qualification
//   const addQualification = () => {
//     if (degree && year) {
//       setFormData({
//         ...formData,
//         qualifications: [...(formData.qualifications || []), { degree, year }],
//       });
//       setDegree("");
//       setYear("");
//       toast.success("Qualification added successfully!");
//     } else {
//       toast.warn("Please enter both degree and year!");
//     }
//   };

//   // Remove a qualification
//   const removeQualification = (qualIndex) => {
//     setFormData({
//       ...formData,
//       qualifications: formData.qualifications.filter((_, i) => i !== qualIndex),
//     });
//     toast.info("Qualification removed.");
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (Object.keys(formData).length === 0) {
//       toast.error("No changes were made.");
//       return;
//     }

//     // Update only the changed fields while preserving others
//     const updatedEmployees = [...employees];
//     updatedEmployees[index] = { ...employees[index], ...formData };

//     setEmployees(updatedEmployees);
//     localStorage.setItem("employees", JSON.stringify(updatedEmployees));

//     toast.success("Employee details updated successfully!");
//     navigate("/employee-list");
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center">Edit Employee</h2>
//       <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
//         <div className="mb-3">
//           <label className="form-label">Full Name:</label>
//           <input type="text" name="fullName" className="form-control" value={formData.fullName || ""} onChange={handleChange} />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Gender:</label>
//           <div>
//             <input type="radio" name="gender" value="Male" onChange={handleChange} checked={formData.gender === "Male"} /> Male
//             <input type="radio" name="gender" value="Female" onChange={handleChange} checked={formData.gender === "Female"} className="ms-3" /> Female
//           </div>
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Date of Birth:</label>
//           <input type="date" name="dob" className="form-control" value={formData.dob || ""} onChange={handleChange} />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Email:</label>
//           <input type="email" name="email" className="form-control" value={formData.email || ""} onChange={handleChange} />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Contact Number:</label>
//           <input type="text" name="contact" className="form-control" value={formData.contact || ""} onChange={handleChange} />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Office Branch:</label>
//           <select name="branch" className="form-control" value={formData.branch || ""} onChange={handleChange}>
//             <option value="">Select Branch</option>
//             <option value="Kolkata">Kolkata</option>
//             <option value="Pune">Pune</option>
//             <option value="Mumbai">Mumbai</option>
//             <option value="Delhi">Delhi</option>
//           </select>
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Department:</label>
//           <select name="department" className="form-control" value={formData.department || ""} onChange={handleChange}>
//             <option value="">Select Department</option>
//             <option value="Sales">Sales</option>
//             <option value="Production">Production</option>
//             <option value="Marketing">Marketing</option>
//           </select>
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Designation:</label>
//           <select name="designation" className="form-control" value={formData.designation || ""} onChange={handleChange}>
//             <option value="">Select Designation</option>
//             <option value="Junior">Junior</option>
//             <option value="Associate">Associate</option>
//             <option value="Team Leader">Team Leader</option>
//           </select>
//         </div>

//         {/* Qualification Section */}
//         <h5>Qualifications</h5>
//         <div id="qualificationList">
//           {formData.qualifications?.map((q, qualIndex) => (
//             <div key={qualIndex} className="d-flex justify-content-between align-items-center mb-2">
//               <p className="m-0">{q.degree} ({q.year})</p>
//               <button type="button" className="btn btn-danger btn-sm" onClick={() => removeQualification(qualIndex)}>Remove</button>
//             </div>
//           ))}
//         </div>

//         <div className="input-group mb-3">
//           <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} className="form-control" placeholder="Degree Name" />
//           <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="form-control" placeholder="Year of Passing" />
//           <button type="button" className="btn btn-secondary" onClick={addQualification}>Add</button>
//         </div>

//         <button type="submit" className="btn btn-primary">Update</button>
//         <button type="button" className="btn btn-secondary ms-3" onClick={() => navigate("/employee-list")}>Cancel</button>
//       </form>
//     </div>
//   );
// };

// export default EditEmployee;










import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditEmployee = ({ employees, setEmployees }) => {
  const { index } = useParams(); // Get employee index from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({}); // Start with an empty object
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");

  // Load existing employee details
  useEffect(() => {
    const employeeIndex = parseInt(index, 10);

    // Fetch employees from localStorage if the state is empty
    let storedEmployees = employees;
    if (employees.length === 0) {
      storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    }

    if (storedEmployees.length > 0 && employeeIndex >= 0) {
      const employee = storedEmployees[employeeIndex];
      if (employee) {
        setFormData(employee);
      } else {
        toast.error("Employee not found!");
        navigate("/employee-list");
      }
    }
  }, [index, employees, navigate]);

  // Handle input changes and only update the changed field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Add a qualification
  const addQualification = () => {
    if (degree && year) {
      setFormData((prevData) => ({
        ...prevData,
        qualifications: [...(prevData.qualifications || []), { degree, year }],
      }));
      setDegree("");
      setYear("");
      toast.success("Qualification added successfully!");
    } else {
      toast.warn("Please enter both degree and year!");
    }
  };

  // Remove a qualification
  const removeQualification = (qualIndex) => {
    setFormData((prevData) => ({
      ...prevData,
      qualifications: prevData.qualifications.filter((_, i) => i !== qualIndex),
    }));
    toast.info("Qualification removed.");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(formData).length === 0) {
      toast.error("No changes were made.");
      return;
    }

    // Fetch existing employee list
    let storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];

    // Update only the changed fields while preserving others
    storedEmployees[index] = {
      ...storedEmployees[index], // Keep existing data
      ...formData, // Merge with updated data
    };

    setEmployees(storedEmployees);
    localStorage.setItem("employees", JSON.stringify(storedEmployees));

    toast.success("Employee details updated successfully!");
    navigate("/employee-list");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Full Name:</label>
          <input type="text" name="fullName" className="form-control" value={formData.fullName || ""} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Gender:</label>
          <div>
            <input type="radio" name="gender" value="Male" onChange={handleChange} checked={formData.gender === "Male"} /> Male
            <input type="radio" name="gender" value="Female" onChange={handleChange} checked={formData.gender === "Female"} className="ms-3" /> Female
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Birth:</label>
          <input type="date" name="dob" className="form-control" value={formData.dob || ""} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" name="email" className="form-control" value={formData.email || ""} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact Number:</label>
          <input type="text" name="contact" className="form-control" value={formData.contact || ""} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Office Branch:</label>
          <select name="branch" className="form-control" value={formData.branch || ""} onChange={handleChange}>
            <option value="">Select Branch</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Department:</label>
          <select name="department" className="form-control" value={formData.department || ""} onChange={handleChange}>
            <option value="">Select Department</option>
            <option value="Sales">Sales</option>
            <option value="Production">Production</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Designation:</label>
          <select name="designation" className="form-control" value={formData.designation || ""} onChange={handleChange}>
            <option value="">Select Designation</option>
            <option value="Junior">Junior</option>
            <option value="Associate">Associate</option>
            <option value="Team Leader">Team Leader</option>
          </select>
        </div>

        {/* Qualification Section */}
        <h5>Qualifications</h5>
        <div id="qualificationList">
          {formData.qualifications?.map((q, qualIndex) => (
            <div key={qualIndex} className="d-flex justify-content-between align-items-center mb-2">
              <p className="m-0">{q.degree} ({q.year})</p>
              <button type="button" className="btn btn-danger btn-sm" onClick={() => removeQualification(qualIndex)}>Remove</button>
            </div>
          ))}
        </div>

        <div className="input-group mb-3">
          <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} className="form-control" placeholder="Degree Name" />
          <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="form-control" placeholder="Year of Passing" />
          <button type="button" className="btn btn-secondary" onClick={addQualification}>Add</button>
        </div>

        <button type="submit" className="btn btn-primary">Update</button>
        <button type="button" className="btn btn-secondary ms-3" onClick={() => navigate("/employee-list")}>Cancel</button>
      </form>
    </div>
  );
};

export default EditEmployee;

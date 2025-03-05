import { useState } from "react";
import { toast } from "react-toastify";

const AddEmployee = ({ departments }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    email: "",
    password: "",
    contact: "",
    branch: "",
    department: "",
    designation: "",
    qualifications: [],
  });

  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addQualification = () => {
    if (degree && year) {
      setFormData({
        ...formData,
        qualifications: [...formData.qualifications, { degree, year }],
      });
      setDegree("");
      setYear("");
      toast.success("Qualification added successfully!");
    } else {
      toast.warn("Please enter both degree and year!");
    }
  };

  const removeQualification = (index) => {
    setFormData({
      ...formData,
      qualifications: formData.qualifications.filter((_, i) => i !== index),
    });
    toast.info("Qualification removed.");
  };

  const validateForm = () => {
    const { fullName, gender, dob, email, password, contact, branch, department, designation, qualifications } = formData;
    if (!fullName || !gender || !dob || !email || !password || !contact || !branch || !department || !designation || qualifications.length === 0) {
      toast.error("Please fill in all fields and add at least one qualification.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.push(formData);
    localStorage.setItem("employees", JSON.stringify(employees));
    
    toast.success("Employee added successfully!");

    setFormData({
      fullName: "",
      gender: "",
      dob: "",
      email: "",
      password: "",
      contact: "",
      branch: "",
      department: "",
      designation: "",
      qualifications: [],
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Employee Registration Form</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Full Name:</label>
          <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Gender:</label>
          <div>
            <input type="radio" name="gender" value="Male" onChange={handleChange} checked={formData.gender === "Male"} required /> Male
            <input type="radio" name="gender" value="Female" onChange={handleChange} checked={formData.gender === "Female"} className="ms-3" required /> Female
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Birth:</label>
          <input type="date" name="dob" className="form-control" value={formData.dob} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact Number:</label>
          <input type="text" name="contact" className="form-control" value={formData.contact} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Office Branch:</label>
          <select name="branch" className="form-control" value={formData.branch} onChange={handleChange} required>
            <option value="">Select Branch</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Department:</label>
          <select name="department" className="form-control" value={formData.department} onChange={handleChange} required>
            <option value="">Select Department</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Designation:</label>
          <select name="designation" className="form-control" value={formData.designation} onChange={handleChange} required>
            <option value="">Select Designation</option>
            <option value="Junior">Junior</option>
            <option value="Associate">Associate</option>
            <option value="Team Leader">Team Leader</option>
          </select>
        </div>

        {/* Qualification Section */}
        <h5>Qualifications</h5>
        <div id="qualificationList">
          {formData.qualifications.map((q, index) => (
            <div key={index} className="d-flex justify-content-between align-items-center mb-2">
              <p className="m-0">{q.degree} ({q.year})</p>
              <button type="button" className="btn btn-danger btn-sm" onClick={() => removeQualification(index)}>Remove</button>
            </div>
          ))}
        </div>

        <div className="input-group mb-3">
          <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} className="form-control" placeholder="Degree Name" />
          <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="form-control" placeholder="Year of Passing" />
          <button type="button" className="btn btn-secondary" onClick={addQualification}>Add</button>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddEmployee;

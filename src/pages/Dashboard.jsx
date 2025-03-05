import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { FaUsers, FaBuilding, FaMapMarkerAlt } from "react-icons/fa"; // Import Icons

const Dashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCounts, setDepartmentCounts] = useState({});
  const [branchCounts, setBranchCounts] = useState({}); // Changed from location to branch
  const [designationCounts, setDesignationCounts] = useState({});

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployeeCount(employees.length);

    const deptCounts = {};
    const brCounts = {}; // Branch count storage
    const desigCounts = {};

    employees.forEach((emp) => {
      // Department Count
      deptCounts[emp.department] = (deptCounts[emp.department] || 0) + 1;

      // Branch Count (Ensure non-empty values)
      if (emp.branch) {
        brCounts[emp.branch] = (brCounts[emp.branch] || 0) + 1;
      }

      // Designation Count
      desigCounts[emp.designation] = (desigCounts[emp.designation] || 0) + 1;
    });

    setDepartmentCounts(deptCounts);
    setBranchCounts(brCounts); // Set branch count
    setDesignationCounts(desigCounts);
  }, []);

  return (
    <Container fluid className="mt-4">
      <h2 className="fw-bold text-center mb-4 text-primary">
         Employee Dashboard
      </h2>

      {/* Summary Cards */}
      <Row className="justify-content-center mb-4">
        <Col md={3}>
          <Card className="p-4 text-center shadow-lg border-0 rounded-4 bg-primary text-white">
            <FaUsers size={40} className="mb-2" />
            <h5 className="fw-semibold">Total Employees</h5>
            <h2 className="fw-bold">{employeeCount}</h2>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-4 text-center shadow-lg border-0 rounded-4 bg-success text-white">
            <FaBuilding size={40} className="mb-2" />
            <h5 className="fw-semibold">Departments</h5>
            <h2 className="fw-bold">{Object.keys(departmentCounts).length}</h2>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-4 text-center shadow-lg border-0 rounded-4 bg-warning text-dark">
            <FaMapMarkerAlt size={40} className="mb-2" />
            <h5 className="fw-semibold">Branches</h5> {/* Changed from Locations to Branches */}
            <h2 className="fw-bold">{Object.keys(branchCounts).length}</h2>
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row>
        {/* Employees by Department (Bar Chart) */}
        <Col md={4}>
          <Card className="p-4 shadow-lg border-0 rounded-4">
            <h5 className="fw-semibold text-center text-secondary">
              📊 Employees by Department
            </h5>
            <Bar
              data={{
                labels: Object.keys(departmentCounts),
                datasets: [
                  {
                    label: "Employees",
                    data: Object.values(departmentCounts),
                    backgroundColor: [
                      "#007bff",
                      "#28a745",
                      "#ffc107",
                      "#17a2b8",
                    ],
                    borderRadius: 8,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </Card>
        </Col>

        {/* Employees by Designation (Pie Chart) */}
        <Col md={4}>
          <Card className="p-4 shadow-lg border-0 rounded-4">
            <h5 className="fw-semibold text-center text-secondary">
              🏆 Employees by Designation
            </h5>
            <Pie
              data={{
                labels: Object.keys(designationCounts),
                datasets: [
                  {
                    data: Object.values(designationCounts),
                    backgroundColor: [
                      "#ff6384",
                      "#36a2eb",
                      "#ffce56",
                      "#4bc0c0",
                    ],
                    borderWidth: 2,
                  },
                ],
              }}
            />
          </Card>
        </Col>

        {/* Employees by Branch (Doughnut Chart) */}
        <Col md={4}>
          <Card className="p-4 shadow-lg border-0 rounded-4">
            <h5 className="fw-semibold text-center text-secondary">
              🏢 Employees by Branch {/* Changed from Location to Branch */}
            </h5>
            <Doughnut
              data={{
                labels: Object.keys(branchCounts),
                datasets: [
                  {
                    data: Object.values(branchCounts),
                    backgroundColor: [
                      "#ff9f40",
                      "#ff6384",
                      "#36a2eb",
                      "#9966ff",
                    ],
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "bottom" },
                },
              }}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;









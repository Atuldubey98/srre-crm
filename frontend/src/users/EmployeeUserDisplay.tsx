import { Employee } from "../pages/login/interfaces";
import ReportField from "../pages/reports/ReportField";
import "./EmployeeUserDisplay.css";
export default function EmployeeUserDisplay(employee: Employee) {
  return (
    <div className="employee__display">
      <ReportField value={employee.name} fieldName="Employee Name" />
      <ReportField value={employee.email} fieldName="Employee Email" />
      <ReportField value={employee._id} fieldName="Employee Id" />
      
    </div>
  );
}

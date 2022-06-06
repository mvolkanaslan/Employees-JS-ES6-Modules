import { DbConnection } from "./db_connection.js";

const employeeForm = document.getElementById("employee-form");
const employeesList = document.getElementById("employeesList");

const db_connection = new DbConnection();

export class UI {
  static getEmployeeFromForm() {
    let employee = {
      name: employeeForm.elements.name.value,
      job: employeeForm.elements.job.value,
      department: employeeForm.elements.department.value,
      salary: employeeForm.elements.salary.value,
    };
    employeeForm.reset();
    return employee;
  }

  // Set Added  Employee to table, I use name attr. in icon element,for easy selection of employe to delete from table
  static setEmployeeToTable(employee) {
    employeesList.insertAdjacentHTML(
      "beforeend",
      `
        <tr>
            <th scope="row">${employee.id}</th>
            <td>${employee.name}</td>
            <td>${employee.job}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td><i class="fa-solid fa-trash-can m-2 text-danger" name="${employee.id}"></i><i class="fa-solid fa-pen-to-square text-success" name="${employee.id}"></i></td>
        </tr>
        `
    );
  }
  // Set All Employees to Table
  static setAllEmployeeToTable() {
    employeesList.innerHTML = "";
    let employees;
    db_connection.getAllEmployees().then((responseData) => {
      employees = responseData;
      employees.map((employee) => {
        this.setEmployeeToTable(employee);
      });
    });
  }
}

import { DbConnection } from "./db_connection.js";

export class UI {
  constructor(){
    this.employeeForm = document.getElementById("employee-form");
    this.employeesList = document.getElementById("employeesList");
    this.db_connection = new DbConnection();
  }


  getEmployeeFromForm() {
    let employee = {
      name: this.employeeForm.elements.name.value.trim(),
      job: this.employeeForm.elements.job.value.trim(),
      department: this.employeeForm.elements.department.value.trim(),
      salary: this.employeeForm.elements.salary.value.trim(),
    };
    
    return employee;
  }

  // Set Added  Employee to table, I use name attr. in icon element,for easy selection of employe to delete from table
  setEmployeeToTable(employee) {
    this.employeesList.insertAdjacentHTML(
      "beforeend",
      `
        <tr>
            <th scope="row">${employee.id}</th>
            <td>${employee.name}</td>
            <td>${employee.job}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td><i class="fa-solid fa-trash-can m-2 text-danger" name="${employee.id}" data-bs-toggle="modal" data-bs-target="#deleteConfirm"></i><i class="fa-solid fa-pen-to-square text-success" name="${employee.id}"></i></td>
        </tr>
        `
    );
  }
  // Set All Employees to Table
  setAllEmployeeToTable() {
    this.employeesList.innerHTML = "";
    let employees;
    this.db_connection.getAllEmployees().then((responseData) => {
      employees = responseData;
      employees.map((employee) => {
        this.setEmployeeToTable(employee); 
      });
    });
  }

  setUpdateEmployeeToForm(emp){
    this.employeeForm.elements.name.value = emp.name;
    this.employeeForm.elements.job.value=emp.job;
    this.employeeForm.elements.department.value=emp.department;
    this.employeeForm.elements.salary.value=emp.salary;
  } 
  clearForm(){
    this.employeeForm.reset();
  }

}

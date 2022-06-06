export class DbConnection {
  constructor() {
    this.url = "http://localhost:3000/employee";
  }
  async getAllEmployees() {
    const response = await fetch(this.url);
    const responseData = await response.json();
    return responseData;
  }
  async getEmployeeById(id) {
    const response = await fetch(this.url + "/" + id);
    const responseData = await response.json();
    return responseData;
  }
  async addEmployee(employee) {
    const response = await fetch(this.url, {
      body: JSON.stringify(employee),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "same-origin",
    });
    const responseData = await response.json();
    return { response: responseData, message: "Employee Added !" };
  }
  async updateEmployee(employee) {
    const response = await fetch(this.url + "/" + employee.id, {
      body: JSON.stringify(employee),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "same-origin",
    });
    const responseData = await response.json();
    return { response: responseData, message: "Success : Employee Updated !" };
  }
}

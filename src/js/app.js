import css from '../css/main.css'
import {DbConnection} from './db_connection.js'
import { Employee } from './employee.js';
import {Toast} from './notification.js'
import { UI } from './ui';
import { formValidation } from './formValidation.js';

const db_connection = new DbConnection();

const employeeForm = document.getElementById("employee-form");
const addBtn = document.getElementById("add_employee");
const updateBtn = document.getElementById("update_employee");
const employeeList = document.getElementById("employeesList");
const deleteModal = document.getElementById("deleteConfirm");
const deleteBtn = document.getElementById("deleteBtn");


let employee = new Employee();

eventListeners();
function eventListeners(){
    // Load Emloyees from datebase at the start
    UI.setAllEmployeeToTable();
    // Add new Employee
    addBtn.addEventListener("click",()=>{
        employee = UI.getEmployeeFromForm();//get Employee's Properties from Form

        if(formValidation(employee)){
            //Emplyoee added database and set the Employees Teble on the screen
            db_connection.addEmployee(employee).then(data=>{
                UI.setEmployeeToTable(data.response);
                Toast.success(data.message);//Notification about Add process.
                employeeForm.reset();
            });
        }
        else{
            Toast.warning("Form must be filled out !")
        }
    })
    employeeList.addEventListener("click",e=>{
        let element = e.target;
        // DeleteModal Shown When Click Trash Icon and set the id of employee to delete as attribute of deleteModal        
        deleteModal.addEventListener("shown.bs.modal",()=>{
            deleteModal.setAttribute("employee",element.attributes["name"].value);
        })

        //if update or edit icon clicked change the form add button to update button after start validation and database and UI process
        if(element.classList.contains("fa-pen-to-square") && element.attributes["name"]){
            let id = element.attributes["name"].value;
            addBtn.style.display="none";
            updateBtn.style.display="block"
            db_connection.getEmployeeById(id).then(data=>{
                employee=data;
                UI.setUpdateEmployeeToForm(employee);
            });
        }
    })

    deleteBtn.addEventListener("click",()=>{
        //set the id of employee to delete from employee attribute of deleteModal
        let employeeId = deleteModal.attributes["employee"].value;
        //Deleting Process on databse and Userinterface and show notification
        db_connection.deleteEmployee(employeeId).then(data=>{
            UI.setAllEmployeeToTable();
            Toast.success(data.message);
        });
    })

    updateBtn.addEventListener("click",e=>{
            //employee with changed properties
            employee={
                id:employee.id,
                ...UI.getEmployeeFromForm()
            }
            // send new emlooyee for validation
            if(formValidation(employee)){
                db_connection.updateEmployee(employee).then(data=>{
                UI.setAllEmployeeToTable();
                Toast.success(data.message);
                employeeForm.reset();
            });
            addBtn.style.display="block";
            updateBtn.style.display="none"
       }
       else{
           Toast.warning("Form must be filled out !")
       }
    })
}



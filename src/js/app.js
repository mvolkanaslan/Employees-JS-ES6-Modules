import css from '../css/main.css'
import {DbConnection} from './db_connection.js'
import { Employee } from './employee.js';
import {Toast} from './notification.js'
import { UI } from './ui';

const db_connection = new DbConnection();


const addBtn = document.getElementById("add_employee");
const updateBtn = document.getElementById("add_employee");
const employeeList = document.getElementById("employeesList");
const deleteModal = document.getElementById("deleteConfirm");
const deleteBtn = document.getElementById("deleteBtn");


const employee = new Employee();

eventListeners();
function eventListeners(){
    // Load Emloyees from datebase at the start
    UI.setAllEmployeeToTable();

    // Add new Employee
    addBtn.addEventListener("click",()=>{
        let employeeToAdd = UI.getEmployeeFromForm();//get Employee's Properties from Form

        //Emplyoee added database and set the Employees Teble on the screen
        db_connection.addEmployee(employeeToAdd).then(data=>{
            UI.setEmployeeToTable(data.response);
            Toast.success(data.message);//Notification about Add process
        });
        
    })

    employeeList.addEventListener("click",e=>{
        let element = e.target;
        //Delete Model Shown When Click Trash Icon and set the id of employee to delete as attribute of deleteModal        
        deleteModal.addEventListener("shown.bs.modal",()=>{
            deleteModal.setAttribute("employee",element.attributes["name"].value);
        })
    })

    deleteBtn.addEventListener("click",()=>{
        //set the id of employee to delete from employee attribute of deleteModal
        let employeeId = deleteModal.attributes["employee"].value;
        //Deleting Process on databse and Userinterface and show notification
        db_connection.deleteEmployee(employeeId).then(data=>{
            UI.setAllEmployeeToTable();
            Toast.success(data.message);
        });
        
        
    }

    )




}



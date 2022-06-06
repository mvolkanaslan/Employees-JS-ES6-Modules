import css from '../css/main.css'
import {DbConnection} from './db_connection.js'
import { Employee } from './employee.js';
import {Toast} from './notification.js'
import { UI } from './ui';

const db_connection = new DbConnection();


const addBTN = document.getElementById("add_employee");
const updateBTN = document.getElementById("add_employee");
const employeeList = document.getElementById("employeesList");

const employee = new Employee();

eventListeners();
function eventListeners(){
    // Load Emloyees from datebase at the start
    UI.setAllEmployeeToTable();

    // Add new Employee
    addBTN.addEventListener("click",()=>{
        let employeeToAdd = UI.getEmployeeFromForm();//get Employee's Properties from Form

        //Emplyoee added database and set the Employees Teble on the screen
        db_connection.addEmployee(employeeToAdd).then(data=>{
            UI.setEmployeeToTable(data.response);
            Toast.success(data.message);//Notification about Add process
        });
        
    })

    employeeList.addEventListener("click",e=>{
        let element = e.target;
        //if click trash icon delete the employee
        if(element.classList.contains("fa-trash-can") && element.attributes["name"]){
            let employeeId=element.attributes["name"].value;
            db_connection.deleteEmployee(employeeId).then(data=>UI.setAllEmployeeToTable());
        }
        /*
        TODO : Ask User Confirm when Click Delete Icon
        */
    })
}



export function formValidation(employee){

        let keys = Object.keys(employee); // keys that employee object has
        let result = true; // control property 
        keys.map(key=>{
            //if control property has no value return error
               if(employee[key]==""){
                   result=false;
                   return;
               }
        })
        // all properties of employee was filled return true
        return result;
}

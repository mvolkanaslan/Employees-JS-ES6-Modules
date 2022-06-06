import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const option = {
    duration: 2000,
    newWindow: true,
    close: true,
    gravity: "bottom", 
    position: "right",
    stopOnFocus: true
}

export class Toast{
    static success(message){
        Toastify({
            text: "Success : " + message,
            ...option,
            style: {
              background: "green",
              opacity: 0.8
            }
          }).showToast();
    }

    static error(message){
        Toastify({
            text: "Error : " + message,
            ...option,
            style: {
              background: "red",
              opacity: 0.8,
            }
          }).showToast();
    }
    static info(message){
        Toastify({
            text: "Info : " + message,
            ...option,
            style: {
              background: "#0d6efd",
              opacity: 0.8,
            }
          }).showToast();
    }
    static warning(message){
        Toastify({
            text: "Info : " + message,
            ...option,
            style: {
              background: "#7de81a",
              opacity: 0.8,
            }
          }).showToast();
    }


}
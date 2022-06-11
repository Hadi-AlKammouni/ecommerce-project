// Declaring required variables
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let password_confirmation = document.getElementById("pass-confirmation");
let register_btn = document.getElementById("register");

var inputs = [username, email, password, password_confirmation];

let email_condition = false;
let username_condition = false;
let password_condition = false;
let password_confirmation_condition = false;

// Call the register function upon clicking the register button
register_btn.onclick = register;
function register(){

    // Making sure that the border color is black if the value is entered
    for (let i=0; i<inputs.length; i++){
        inputs[i].style.borderBlockColor="black";
    }

    //--\\ If all fields are filled
    if (username.value != "" && email.value != "" && password.value != "" && password_confirmation.value != ""){

        // To check if the username is more than 2 characters
        if(username.value.length >= 2){
            username_condition = true;
        }
        else{
            username.style.borderBlockColor="red";
            // dialog.showMessageBox("username must be minimum two characters");
        }

        //To check the email format if valid or no
        var mail_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.value.match(mail_format)){
            email_condition=true;
        }
        else{
            email.style.borderBlockColor="red";
        }

        // To check if the password is more than 6 characters
        if(password.value.length >= 6){
            password_condition = true;
        }
        else{
            password.style.borderBlockColor="red";
            // dialog.showMessageBox("password must be minimum six characters");
        }

         // To check if the password & password_confirmation are identical
        if(password_confirmation.value.length >= 6 && password.value == password_confirmation.value){
            password_confirmation_condition = true;
        }
        else{
            password_confirmation.style.borderBlockColor="red";
            // dialog.showMessageBox("password & password_confirmation must be identical & minimum six characters ");
        }
        
        // If all condition are correct
        if (username_condition== true && email_condition == true && password_condition == true && password_confirmation_condition == true){

            // Sending post request
            let data = new FormData();
            data.append('name', username.value);
            data.append('email',  email.value);
            data.append('password', password.value);
            data.append('password_confirmation', password_confirmation.value);

            axios.post("http://127.0.0.1:8000/api/register", data)
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (e) {
              console.log(e);
              }
            )

            // Emptying the fields after the request is done 
            for (let i=0; i<inputs.length; i++){
                inputs[i].value="";
            }
            alert("Item has been added successfully");
            // window.loadURL("./index.html");
        }
    }

    //--\\ Else there is/are empty field(s)
    else{
        // Coloring the empty field border red
        for (let i=0; i<inputs.length; i++){
            if (inputs[i].value == ""){
                inputs[i].style.borderBlockColor="red";
            }
        }
    }
}
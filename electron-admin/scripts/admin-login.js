// Declaring required variables
let email = document.getElementById("email");
let password = document.getElementById("password");
let login = document.getElementById("login-btn");

var inputs = [email,password];

let email_condition = false;
let password_condition = false;

// Call the logIn function upon clicking the login button
login.onclick = logIn;
function logIn(){

    // Making sure that the border color is black if the value is entered
    for (let i=0; i<inputs.length; i++){
        inputs[i].style.borderBlockColor="black";
    }

    //--\\ If all fields are filled
    if (email.value != "" && password.value != ""){

        // To check the email format if valid or no
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

        // If all condition are correct
        if (email_condition == true && password_condition == true){

            // Sending post request
            let data = new FormData();
            data.append('email', email.value);
            data.append('password', password.value);

            axios.post("http://127.0.0.1:8000/api/login", data)
            .then(function (response) {
                let response1 = response.data;
                if(response1.access_token){
                    // console.log(response1.access_token);
                    let token = response1.access_token;
                    localStorage.setItem('access_token', token);
                }
            })
            // .then(function (response) {
            //     if(response.data.error == "Unauthorized"){
            //         alert("Wrong email and/or password")
            //     }
            // })
            .catch(function (e) {
                console.log(e);
            })
            
            // Emptying the fields after the request is done 
            for (let i=0; i<inputs.length; i++){
                inputs[i].value="";
            }
            // After implementing the if condition, alert("Item has been added successfully");
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
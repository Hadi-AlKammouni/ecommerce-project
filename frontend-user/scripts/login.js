// Declaring required variables
let email = document.getElementById("email");
let password = document.getElementById("password");
let login = document.getElementById("login-page-btn");

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
            alert("enter valid email (example@outlook.com)");
        }

        // To check if the password is more than 6 characters
        if(password.value.length >= 6){
            password_condition = true;
        }
        else{
            password.style.borderBlockColor="red";
            alert("password must be minimum six characters");
        }

        // If all condition are correct
        if (email_condition == true && password_condition == true){

            // Sending post request
            let data = new FormData();
            data.append('email', email.value);
            data.append('password', password.value);

            axios.post("http://127.0.0.1:8000/api/login", data)
            .then(function (response) {
                if(response.status == 200){
                    let response1 = response.data;
                    let token = response1.access_token;
                    let id = response1.user_id;
                    let name = response1.name;
                    localStorage.setItem('access_token', token);
                    localStorage.setItem('user_id', id);
                    localStorage.setItem('name', name);
                    alert("logged in successfully");
                    window.location.href = "../index.html";
                }
            })
            .catch(e=>{
                if(e.response.status != 200){
                    alert(e.response.data.error);
                }
            })
            
            // Emptying the fields after the request is done 
            for (let i=0; i<inputs.length; i++){
                inputs[i].value="";
            }
        }
    }

    //--\\ Else there is/are empty field(s)
    else{

        alert("you can't leave any field empty");

        // Coloring the empty field border red
        for (let i=0; i<inputs.length; i++){
            if (inputs[i].value == ""){
                inputs[i].style.borderBlockColor="red";   
            } 
        } 
    }  
}    
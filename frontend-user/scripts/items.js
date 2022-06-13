// Declaring required variables
let name_from_storage = localStorage.getItem("name");

// Check if the user is logged in or no/ if yes, add greeting
if(name_from_storage != null){
    document.getElementById("login-btn").innerHTML = "Welcome " + name_from_storage;
    document.getElementById("signup-btn").style.display = "none";
    document.getElementById("login-btn").onclick = function(){  
        window.location.href = "#";
    }
}

axios.get("http://127.0.0.1:8000/api/v1/user/all_items")
.then(res => {console.log(res.data.items)})
.catch(e=> console.log(e));
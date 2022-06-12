// Declaring required variables
let name_from_storage = localStorage.getItem("name");
let item_category = document.getElementById("item-category");
let search_btn = document.getElementById("search-btn");

// Check if the user is logged in or no/ if yes, add greeting
if(name_from_storage != null){
    document.getElementById("login-btn").innerHTML = "Welcome " + name_from_storage;
    document.getElementById("signup-btn").style.display = "none";
    document.getElementById("login-btn").onclick = function(){  
        window.location.href = "../index.html";
    }
}

axios.get("http://127.0.0.1:8000/api/v1/user/category_search")
.then(res => {populate(res)})
.catch(e=> console.log(e));

function populate(res){
    
    let result = res.data.results;
    
    // Appending clue to show categories page
    let option = document.createElement("option");
    option.setAttribute("id","show-categories-page");
    option.innerHTML = "click search to show categories page";
    item_category.appendChild(option);
   
    // Adding the categories found in db to the select field
    for (let i = 0; i < result.length; i++){
        let option = document.createElement("option");
        option.innerHTML = result[i].category_name;
        item_category.appendChild(option);
    }
}

// Call function on click to go to categories page
search_btn.onclick = showCategories;
function showCategories(){
    window.location.href = "./pages/category.html";
}

// Declaring required variables
let name_from_storage = localStorage.getItem("name");
let categories = document.getElementById("items-display");

// Check if the user is logged in or no/ if yes, add greeting
if(name_from_storage != null){
    document.getElementById("login-btn").innerHTML = "Welcome " + name_from_storage;
    document.getElementById("signup-btn").style.display = "none";
    document.getElementById("login-btn").onclick = function(){  
        window.location.href = "#";
    }
}

axios.get("http://127.0.0.1:8000/api/v1/user/category_search")
.then(res => display(res))
.catch(e=> console.log(e));

function display(res){
    let result = res.data.results;
    console.log(result);

    // Displaying the categories
    for (let i=0; i < result.length; i++){
        // Inserting the category name
        let category_name = document.createElement("p");
        category_name.innerHTML = result[i].category_name;
        categories.appendChild(category_name);
        // Inserting the image
        let image = document.createElement("img");
        image.classList.add('item');
        image.src = result[i].images;
        categories.appendChild(image);
    }
}
// Declaring required variables
let name_from_storage = localStorage.getItem("name");
let items_title = document.getElementById("items-title");
let items = document.getElementById("items-display");

// Getting the clicked category
const urlSearchParams = new URLSearchParams(window.location.search);
var category_name = Object.fromEntries(urlSearchParams.entries());
category_name = category_name.category_name;

// Check if the user is logged in or no/ if yes, add greeting
if(name_from_storage != null){
    document.getElementById("login-btn").innerHTML = "Welcome " + name_from_storage;
    document.getElementById("signup-btn").style.display = "none";
    document.getElementById("login-btn").onclick = function(){  
        window.location.href = "#";
    }
}

// Changing the subtitle into required category
items_title.innerText = category_name  

// Sending get request to get all items having same category as clicked
axios.get("http://127.0.0.1:8000/api/v1/user/item_search/"+`${category_name}`)
.then(res => display(res))
.catch(e=> console.log(e));

function display(res){
    let result = res.data.results;
    console.log(result);

    // Displaying the items
    for (let i=0; i < result.length; i++){
        // Inserting the item name
        let item_name = document.createElement("p");
        item_name.innerHTML = result[i].item_name;
        items.appendChild(item_name);
        // Inserting the image
        let image = document.createElement("img");
        image.classList.add('item');
        image.src = result[i].images;
        items.appendChild(image);
    }
}
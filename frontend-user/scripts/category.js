// Declaring required variables
let name_from_storage = localStorage.getItem("name");
let categories = document.getElementById("items-display");

// Getting the token from the localstorage
let user_token = localStorage.getItem('access_token');

// Check if the user is logged in or no/ if yes, add greeting
if(name_from_storage != null){
    document.getElementById("login-btn").innerHTML = "Welcome " + name_from_storage;
    document.getElementById("signup-btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "block";
    document.getElementById("login-btn").onclick = function(){  
        window.location.href = "#";
    }
//     // Logout post request
//     document.getElementById("logout-btn").onclick = function(){  
//         // Send request POST
//         axios.post("http://127.0.0.1:8000/api/logout",{
//             headers:{
//                 Authorization: "Bearer " + user_token,
//                 Accept: "application/json"}})
//                 .then(res => console.log(res))
//                 .catch(e=> console.log(e));
//     }
}

// Variables to get the category clicked
let required_category = ""
let listing_category_names = [];
let listing_category_ids = [];
let img = "img";
let counter = 1;

// Sending get request to get all categories in db
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
        listing_category_names.push(result[i].category_name);
        // Inserting the image
        let image = document.createElement("img");
        image.id = img + counter;
        listing_category_ids.push(image.id);
        image.classList.add('item');
        image.src = result[i].images;
        categories.appendChild(image);
        counter++;
    }

    // Saving the clicked category to get its items
    for (let i=0; i < result.length; i++){
        for (let i=0; i < result.length; i++){
            document.getElementById(listing_category_ids[i]).onclick=showItemByCategory;
            function showItemByCategory(){
                required_category = listing_category_names[i]
                console.log(required_category)
                let url1 = './items.html?category_name=' + required_category;
                window.location.href = url1;
            }
        }
    }
}
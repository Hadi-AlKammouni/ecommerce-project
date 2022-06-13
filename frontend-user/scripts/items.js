// Declaring required variables
let name_from_storage = localStorage.getItem("name");
let items_title = document.getElementById("items-title");
let items = document.getElementById("items-display");

// Getting the token from the localstorage
let user_token = localStorage.getItem('access_token');
let id = localStorage.getItem('user_id');

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

// To add id for each item image
let item = "item";
let counter = 1;
let item_db_ids = []
let item_html_id = []

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
        image.id = item + counter;
        image.classList.add('item');
        image.src = result[i].images;
        items.appendChild(image);
        item_html_id.push(image.id)
        counter++;
        
        // Storing ids of items in item_db_ids list
        item_db_ids.push(result[i].item_id);
    }

    for (let i=0; i < item_db_ids.length; i++){
        console.log(item_db_ids)
        console.log(item_html_id)
        console.log(user_token)
        document.getElementById(item_html_id[i]).onclick = addToFavourites;
        function addToFavourites(){
            // Sending post request
            let data = new FormData();
            data.append('id', id);
            data.append('item_id', item_db_ids[i]);

            // Send request POST
            axios.post("http://127.0.0.1:8000/api/v1/user/add_favourite",data, {
                headers:{
                    Authorization: "Bearer " + user_token,
                    Accept: "application/json"}})
            .then((response) => {
                alert("Item Added To Favourites Successfully"),
                console.log(response.data)
            })
            .catch(e=>{
                if(e.response.status != 200){
                    alert(e.response.data.message);
                }
            })
        }
    }
}

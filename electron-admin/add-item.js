// Declaring required variables
let item_name = document.getElementById("item-name");
let item_description = document.getElementById("item-description")
let item_category = document.getElementById("item_category")
let categories = []

let add_Item = document.getElementById("add-item-btn")

// Getting the token from the localstorage
let admin_token = localStorage.getItem('access_token');

// Getting the pre-added categegories
axios.get("http://127.0.0.1:8000/api/v1/user/category_search")
.then(res => {showCategories(res)})
.catch(e=> console.log(e));

function showCategories(res){
    let response = res.data.results;
    // Storing the categories in an array called categories
    for(let i=0; i< response.length; i++){
        categories.push(response[i].category_name)
    }
    // Adding the categories found in db to the select field
    for (let i = 0; i < response.length; i++){
        let option = document.createElement("option");
        option.innerHTML = response[i].category_name;
        item_category.appendChild(option);
    }
}

// Adding the new item to the db
add_Item.onclick = addItem

function addItem(){
    
    // Sending post request
    let data = new FormData();
    data.append('item_name', item_name.value)
    data.append('item_description', item_description.value)
    data.append('item_category', item_category.value)
    // console.log(admin_token);

    // Send request POST
    axios.post("http://127.0.0.1:8000/api/v1/admin/add_item",data, {
        headers:{
            Authorization: "Bearer " + admin_token,
            Accept: "application/json"}})
    .then((response) => {
        console.log(response.data)
    })
    .catch(e => console.log(e));
    
    item_name.value=""
    item_description.value=""
    item_category.value=""
}
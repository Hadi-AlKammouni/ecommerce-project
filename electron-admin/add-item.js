// Declaring required variables
let item_name = document.getElementById("item-name");
let item_description = document.getElementById("item-description")
let item_category = document.getElementById("item_category")

let add_Item = document.getElementById("add-item-btn")

// Getting the token from the localstorage
let admin_token = localStorage.getItem('access_token');

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
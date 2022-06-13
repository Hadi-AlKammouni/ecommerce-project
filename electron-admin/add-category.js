// Declaring required variables
let item_category = document.getElementById("item-name");

let add_Item = document.getElementById("add-category-btn")

// Getting the token from the localstorage
let admin_token = localStorage.getItem('access_token');

add_Item.onclick = addCategory

function addCategory(){
    
    // Sending post request
    let data = new FormData();
    data.append('category_name', item_category.value)

    // Send request POST
    axios.post("http://127.0.0.1:8000/api/v1/admin/add_category",data, {
        headers:{
            Authorization: "Bearer " + admin_token,
            Accept: "application/json"}})
    .then((response) => {
        console.log(response.data)
    })
    .catch(e => console.log(e));
    
    item_category.value=""
}
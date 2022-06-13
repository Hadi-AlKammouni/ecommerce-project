// Declaring required variables
let item_category = document.getElementById("item-name");

let add_Item = document.getElementById("add-category-btn")

// Getting the token from the localstorage
let admin_token = localStorage.getItem('access_token');


let base64String="";
function imageUploaded() {
	var file = document.querySelector('input[type=file]')['files'][0];

	var reader = new FileReader();
	
	reader.onload = function () {
       
		base64String = reader.result;
		var disp=document.getElementById('display');
        disp.innerHTML='';
		disp.innerHTML=`<img src="`+base64String+`">`
	}
	reader.readAsDataURL(file);
}

add_Item.onclick = addCategory

function addCategory(){
    
    // Sending post request
    let data = new FormData();
    data.append('category_name', item_category.value)
    data.append('images', base64String);

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
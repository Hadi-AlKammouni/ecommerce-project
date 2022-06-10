<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;


use Illuminate\Http\Request;
use App\Models\Item;

class AdminController extends Controller
{
    // public function hi(){
    //     echo "hi";
    // }

    // Function to add an item to the db
    public function addItem(Request $request){
        // echo "add";
        $item = new Item;
        $item->item_name = $request->item_name;
        $item->item_description = $request->item_description;
        $item->item_category = $request->item_category;

        $item->save();
        
        return response()->json([
            "status" => "Success"
        ], 200);

    }  
}
// // Function to get all restuarants 
// public function getAllRestos($id = null){
//     // echo "Hello World1 !";
//     if($id != null){
//         $restos = Restaurant::where('restaurant_id','=',$id)->get();
//     }else{    
//     $restos = Restaurant::all();
//     }
    
//     return response()->json([
//         "status" => "Success",
//         "restos" => $restos
//     ], 200);

// }

// // Function to add a resturant
// public function addResto(Request $request){
//     $resto = new Restaurant;

//     $resto->restaurant_name = $request->restaurant_name;
//     $resto->category = $request->category;
//     $resto->description = $request->description;
//     $resto->location = $request->location;
//     $resto->number = $request->number;
//     $resto->total_ratings = $request->total_ratings;

//     $resto->save();
    
//     return response()->json([
//         "status" => "Success"
//     ], 200);
// }

// // Function to get restaurants by category
// public function getRestoByCategory($category){
//     $resto = Restaurant::where('category','=',$category)->get();
    
//     return response()->json([
//         "status" => "Success",
//         "results" => $resto
//     ], 200);
// }
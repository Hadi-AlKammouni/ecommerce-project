<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;


use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Category;

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
        $item->images = $request->images;

        $item->save();
        
        return response()->json([
            "status" => "Success"
        ], 200);

    }
    
    // Function to add a category to the db
    public function addCategory(Request $request){
        // echo "add";
        $category = new Category;
        $category->category_name = $request->category_name;
        $category->images = $request->images;

        $category->save();
        
        return response()->json([
            "status" => "Success"
        ], 200);

    } 
}
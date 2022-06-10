<?php

namespace App\Http\Controllers\User;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Item;

class UserController extends Controller
{
    // Function to get all the items with optional parameter(id)
    public function getAllItems($id = null){
        if($id != null){
            $items = Item::where('id','=',$id)->get();
        }else{
        $items = Item::all();    
        }

        return response()->json([
            "status" => "Success",
            "items" => $items
        ], 200);
    }

    // Function to get items by category
    public function getItemByCategory($category){
        $items = Item::where('item_category','=',$category)->get();
        // if (!$items){
        //     return response()->json([
        //         "status" => "No items found with the category entered"
        //     ], 200);
        // }
        return response()->json([
            "status" => "Success",
            "results" => $items
        ], 200);
    }

    // Function to get items by name
    public function getItemByName($name){
        $items = Item::where('item_name','=',$name)->get();
        // if (!$items){
        //     return response()->json([
        //         "status" => "No items found with the category entered"
        //     ], 200);
        // }
        return response()->json([
            "status" => "Success",
            "results" => $items
        ], 200);
    }
}

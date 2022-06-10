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
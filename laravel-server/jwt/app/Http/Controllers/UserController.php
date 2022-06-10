<?php

namespace App\Http\Controllers;

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
}

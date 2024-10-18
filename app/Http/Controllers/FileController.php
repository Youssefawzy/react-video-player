<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileController extends Controller
{
    public function download()
    {
        // Specify the path to your file in the public directory
        $filePath = base_path('public/google.png'); // Ensure the file is in the public folder

        // Check if the file exists
        if (!file_exists($filePath)) {
            return response()->json(['error' => 'File not found.'], 404);
        }

        // Return the file as a download response using the response helper
        return response()->download($filePath);
    }


}

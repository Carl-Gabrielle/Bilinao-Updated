<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
class AnnouncementController extends Controller
{
 public function announcement (){
    return Inertia::render('Admin/Announcement/Announcement');
 }
}

<?php

   namespace App\Http\Controllers;

   use App\Models\Announcement;
   use Illuminate\Http\Request;
   use Inertia\Inertia;

   class AnnouncementController extends Controller
   {
      public function announcements()
      {
         $announcements = Announcement::latest()->get();
         return Inertia::render('Admin/Announcement/Announcement', ['announcements' => $announcements]);
      }

      public function store(Request $request)
      {
         // dd($request->all());
         $request->validate([
               'title' => 'required|string|max:255',
               'description' => 'required|string',
               'tags' => 'nullable|array',
         ]);
         Announcement::create($request->only(['title', 'description', 'tags']));

         return redirect()->back()->with('success', 'Announcement created successfully.');
      }

      public function destroy($id)
      {
         $announcement = Announcement::findOrFail($id);
         $announcement->delete();

         return redirect()->back()->with('success', 'Announcement deleted successfully.');
      }
   }

<?php
      namespace App\Http\Controllers;
   use App\Models\User;
      use App\Models\Announcement;
      use Illuminate\Http\Request;
      use Inertia\Inertia;
      use App\Models\Notifications;


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
            $announcement = Announcement::create($request->only(['title', 'description', 'tags']));
            $users = User::where('role', 'user')->get();
            foreach ($users as $user) {
               $tags = $announcement->tags ? implode(', ', $announcement->tags) : 'No tags';
               $description = $announcement->description;
               Notifications::create([
                  'user_id' => $user->id,
                  'message' => "New Announcement: {$announcement->title}\n{$description}\n {$tags}",
                  'status' => 'unread',
               ]);
         }
         
            return redirect()->back()->with('success', 'Announcement created successfully.');
         }
         public function destroy($id)
         {
            $announcement = Announcement::findOrFail($id);
            $announcement->delete();

            return redirect()->back()->with('success', 'Announcement deleted successfully.');
         }
      }

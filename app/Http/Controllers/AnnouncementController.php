<?php
         namespace App\Http\Controllers;
         use App\Models\User;
         use App\Models\Seller;
         use App\Models\Announcement;
         use Illuminate\Http\Request;
         use Inertia\Inertia;
         use App\Models\Notifications;
         use Illuminate\Support\Facades\Auth;
         
         class AnnouncementController extends Controller
         {
            public function announcements()
            {
               $announcements = Announcement::latest()->get();
               return Inertia::render('Admin/Announcement/Announcement', ['announcements' => $announcements]);
            }
            public function store(Request $request)
            {
               $request->validate([
                  'title' => 'required|string|max:255',
                  'description' => 'required|string',
                  'tags' => 'nullable|array',
               ]);
            
               $announcement = Announcement::create($request->only(['title', 'description', 'tags']));
            
               $users = User::where('role', 'user')->get();
               foreach ($users as $user) {
                  Notifications::create([
                        'user_id' => $user->id,
                        'message' => "New Announcement: {$announcement->title}\n{$announcement->description}\nTags: " . ($announcement->tags ? implode(', ', $announcement->tags) : 'No tags'),
                        'status' => 'unread',
                  ]);
               }
            
               $sellers = Seller::all();
               foreach ($sellers as $seller) {
                  Notifications::create([
                        'seller_id' => $seller->id,
                        'message' => "New Announcement: {$announcement->title}\n{$announcement->description}\nTags: " . ($announcement->tags ? implode(', ', $announcement->tags) : 'No tags'),
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
            
            public function sellerAnnouncement()
            {
               $sellerId = Auth::id();
               $announcement = Notifications::where('seller_id', $sellerId)
                  ->orderBy('created_at', 'desc')
                  ->get()
                  ->toArray();
               return Inertia::render('Seller/SellerNotification', [
                  'announcement' => $announcement
               ]);
            }
            
            
            
         }

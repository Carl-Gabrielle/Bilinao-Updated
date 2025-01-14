<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="{{ asset('LOGO.png') }}" type="image/x-icon">
        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <style>
        body::-webkit-scrollbar {
width: 6px; 
}

body::-webkit-scrollbar-track {
background: #f1f1f1; 
}

body::-webkit-scrollbar-thumb {
background: #888; 
border-radius: 3px; 
}


.scroll-bar::-webkit-scrollbar {
width: 6px; 
}

.scroll-bar::-webkit-scrollbar-track {
background: #f1f1f1; 
}

.scroll-bar::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 3px; 
}

.scroll-bar::-webkit-scrollbar-thumb:hover {
    background: #555; 

}
    </style>
    <body >
        @inertia
    </body>
</html>

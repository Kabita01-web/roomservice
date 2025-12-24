<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        <meta name="description" content="Gharbhada is your trusted partner in finding the perfect rental home. Explore our extensive listings, enjoy seamless booking, and experience exceptional customer service. Your ideal home awaits with Gharbhada.">
        <meta name="keywords" content="rental homes, property listings, home rentals, online booking, rental services, Gharbhada">
        <meta name="author" content="Gharbhada">

        <!-- SEO Meta Tags -->

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>

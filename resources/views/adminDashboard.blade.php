<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{asset('css/combined.css')}}" >
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js"></script>
    <script src="{{asset('js/dashboard.js')}}" type="module"></script> 
    <title>Admin Dashboard</title>
</head>
<body>
    <section class="admin-section">
        <div class="users">
            <h3>Потребители</h3>
        </div>
        <div class="products">
            <h3>Продукти</h3>
        </div>
    </section>
    <div id="admin-modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>

        </div>
    </div>
</body>
</html>
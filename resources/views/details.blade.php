<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{asset('css/combined.css')}}"> 
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js"></script>
    <script src="{{asset('js/details.js')}}" type="module"></script> 
    <title>Product Details</title>
</head>
<body>
    <section class="details-section">
    <article class="left-part">

    </article>
    <article class="right-part">
        <div class="text-top">
            <h1 id="product-name"></h1>
            <h4 id="product-quantity">Quantity Available: <span id="quantity"></span></h4>
            <h4 id="product-createdAt">Posted On: <span id="createdAt"></span></h4>
            <h4 id="product-price">Price: <span id="price"></span></h4>
        </div>
        <div class="description">
            <p>
            </p>
        </div>
        <div class="owner-info">
            <h4 id="owner-username">Posted By: <span id="username"></span></h4>
            <h4 id="owner-email">Email: <span id="email"></span></h4>
            <h4 id="owner-phone">Phone: <span id="phone"></span></h4>
        </div>
        <div class="action-btns">
<!-- 
            <button id="remove-from-cart-btn">Remove from cart</button>
            <button id="add-to-cart-btn">Add to cart</button> -->
        </div>`
    </article>
    <!-- <div id="slider-modal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <p id="quantity-para">Select quantity: <span id="quantity-span"></span></p>
        <div id="slider"></div>
        <p id="price-calc">Total price: <span id="price-calc-span"></span></p>
    </div>
    </div> -->
    </section>
</body>
</html>
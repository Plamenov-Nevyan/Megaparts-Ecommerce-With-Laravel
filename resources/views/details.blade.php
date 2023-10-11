<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{asset('css/combined.css')}}"> 
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
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
            <h4 id="product-quantity">Налично количество: <span id="quantity"></span></h4>
            <h4 id="product-createdAt">Създадено на: <span id="createdAt"></span></h4>
            <h4 id="product-price">Цена (за 1бр.): <span id="price"></span></h4>
        </div>
        <div class="description">
            <p>
            </p>
        </div>
        <div class="owner-info">
            <h4 id="owner-username">Добавено от: <span id="username"></span></h4>
            <h4 id="owner-email">Имейл: <span id="email"></span></h4>
            <h4 id="owner-phone">Телефон: <span id="phone"></span></h4>
        </div>
        <div class="action-btns">
<!-- 
            <button id="remove-from-cart-btn">Remove from cart</button>
            <button id="add-to-cart-btn">Add to cart</button> -->
        </div>`
    </article>
    <div id="actions-modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>

        </div>
    </div>
    <div id="slider-modal" class="modal">
        <div class="modal-content-slider">
            <span class="close">&times;</span>
            <p id="quantity-para">Изберете количество: <span id="quantity-span"></span></p>
            <div id="slider"></div>
            <p id="price-calc">Обща цена: <span id="price-calc-span"></span></p>
            <button id="add-to-cart">Добави избраното количество</button>
        </div>
    </div>
    </section>
</body>
</html>
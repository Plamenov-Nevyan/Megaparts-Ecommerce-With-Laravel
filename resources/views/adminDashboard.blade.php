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
            <h3>Users</h3>
        </div>
        <div class="products">
            <h3>Products</h3>
        </div>
    </section>
    <div id="admin-modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <!-- <form class="create-form">
                @csrf
                <fieldset class="create-input-field">
                    <input type="text" class="create-data-input" id="name" name="name"/>
                    <label for="name">Product name</label>
                    <span class="error-span" id="name-error"></span>
                </fieldset>
                <fieldset class="create-input-field">
                    <textarea class="create-data-input" id="description" name="description"/></textarea>
                    <label for="description">Product description</label>
                    <span class="error-span" id="description-error"></span>
                </fieldset>
                <fieldset class="create-input-field">
                    <input type="text" class="create-data-input" id="price" name="price"/>
                    <label for="price">Product price</label>
                    <span class="error-span" id="price-error"></span>
                </fieldset>
                <fieldset class="create-input-field">
                    <input type="number" class="create-data-input" id="quantityAvailable" name="quantityAvailable"/>
                    <label for="quantityAvailable">Product quantity</label>
                    <span class="error-span" id="quantityAvailable-error"></span>
                </fieldset>
                <fieldset class="create-input-field">
                    <input type="text" class="create-data-input" id="image" name="image"/>
                    <label for="image">Product image</label>
                    <span class="error-span" id="image-error"></span>
                </fieldset>
                <button>Create</button>
            </form> -->
        </div>
    </div>
</body>
</html>
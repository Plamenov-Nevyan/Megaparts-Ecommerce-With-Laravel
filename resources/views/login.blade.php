<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{asset('css/auth/auth.css')}}" 
    <link rel="stylesheet" href="{{asset('css/reset.css')}}" 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
    <script src="{{asset('js/loginPage.js')}}" type="module"></script>
    <title>Megaparts-Login</title>
</head>
<body>
    <div class="forms-page">
    <form class="form-el login-form">
            @csrf
            <div class="heading">
                <h2>Sign in to your account.</h2>
            </div>
            <fieldset class="input-field">
                <input class="user-data-input" type="text" id="email-login" name="email-login"/>
                <label for="email-login"> Email: </label>
                <span class="error-message" id="email-login-error"></span>
            </fieldset>
            <fieldset class="input-field">
                <input class="user-data-input" type="password" id="password-login" name="password-login"/>
                <label for="password-login"> Password: </label>
                <span class="error-message" id="password-login-error"></span>
            </fieldset>
            <p>Don't have an account yet ? Hurry and 
                <a id="redirect-register" href="{{route('register')}}">
                    Sign up!
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                </a>
            </p>
            <button type="button" class="btn" id="login-btn"> Login </button>
        </form>
    </div>
</body>
</html>
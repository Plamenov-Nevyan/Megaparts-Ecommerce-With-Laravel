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
    <script src="{{asset('js/auth.js')}}"></script>
    <title>Megaparts-Auth</title>
</head>
<body>
<div class="forms-page">
        <form class="form-el login-form">
            <div class="heading">
                <h2>Sign in to your account.</h2>
            </div>
            <fieldset class="input-field">
                <input class="user-data-input" type="text" id="username-login" name="username-login"/>
                <label for="username-login"> Username: </label>
                <span class="error-message" id="username-login-error"></span>
            </fieldset>
            <fieldset class="input-field">
                <input class="user-data-input" type="password" id="password-login" name="password-login"/>
                <label for="password-login"> Password: </label>
                <span class="error-message" id="password-login-error"></span>
            </fieldset>
            <p>Don't have an account yet ? Hurry and 
                <span id="redirect-register">
                    Sign up!
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                </span>
            </p>
            <button type="button" class="btn" id="login-btn"> Login </button>
        </form>
        <form class="form-el register-form">
            <div class="heading">
                <h2>Sign up and create a new account.</h2>
            </div>
            <div class="social-media">
                <ul class="media-list">
                    <li class="media-item">
                        <div class="icon-and-input">
                            <div class="icon-and-add-btn">
                                <svg class="media-icon" id="media-twitter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>
                                <svg class="add-link" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                            </div>
                            <div class="label-and-input">
                                <svg class="close-link-input" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
                                <input class="media-input" type="text" id="twitter-link" name="twitter-link" />
                                <label for="twitter-link">Your twitter link...</label>
                            </div>
                        </div>
                        <div class="tooltip" id="tooltip-twitter">
                            <span>Twitter</span>
                        </div>
                    </li>
                    <li class="media-item">
                        <div class="icon-and-input">
                            <div class="icon-and-add-btn">
                                <svg class="media-icon" id="media-insta" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                                <svg class="add-link" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                            </div>
                            <div class="label-and-input">
                                <svg class="close-link-input" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
                                <input class="media-input" type="text" id="twitter-link" name="twitter-link" />
                                <label for="insta-link">Your instagram link...</label>
                            </div>
                        </div>
                        <div class="tooltip" id="tooltip-insta">
                            <span>Instagram</span>
                        </div>
                    </li>
                    <li class="media-item">
                        <div class="icon-and-input">
                            <div class="icon-and-add-btn">
                                <svg class="media-icon" id="media-fb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
                                <svg class="add-link" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                            </div>
                            <div class="label-and-input">
                                <svg class="close-link-input" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
                                <input class="media-input" type="text" id="twitter-link" name="twitter-link" />
                                <label for="facebook-link">Your facebook link...</label>
                            </div>
                        </div>
                        <div class="tooltip" id="tooltip-fb">
                            <span>Facebook</span>
                        </div>
                    </li>
                </ul>
            </div>
            <fieldset class="input-field">
                <input class="user-data-input" type="text" id="username" name="username"/>
                <label for="username"> Username: </label>
                <span class="error-message" id="username-error"></span>
            </fieldset>
            <fieldset class="input-field">
                <input class="user-data-input" type="text" id="email" name="email" />
                <label for="email"> Email: </label>
                <span class="error-message" id="email-error"></span>
            </fieldset>
            <fieldset class="input-field">
                <input class="user-data-input" type="number" id="phone" name="phone"/>
                <label for="phone"> Phone Number: </label>
                <span class="error-message" id="phone-error"></span>
            </fieldset>
            <fieldset class="input-field">
                <input class="user-data-input" type="password" id="password" name="password"/>
                <label for="password"> Password: </label>
                <span class="error-message" id="password-error"></span>
            </fieldset>
            <p>
                Have an account already?
                <span id="redirect-login">
                    Sign in 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                </span>
            </p>
            <button type="button" class="btn" id="register-btn"> Register </button>
            <span class="tac-span">
                By signing up you are agreeing to our <span class="open-dialog-span">Terms and Conditions</span>
            </span>
        </form>
        <section class="tac-section">
            <ul>
                <ol>
                <li>
                        <h3>Lorem</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis libero repellat corrupti adipisci quaerat aliquid dolores cupiditate dignissimos. Reprehenderit laudantium modi quisquam cupiditate, vero fuga veritatis perspiciatis doloremque possimus asperiores.</p>
                </li>
                <li>
                        <h3>Ipsum</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui cumque, dolore voluptatibus magni, aspernatur quam officia sunt quaerat, sed molestiae repellendus molestias? Adipisci, sunt placeat velit consectetur aliquam voluptate repellendus?</p>
                </li> 
                <li>
                        <h3>Dolor</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae iusto commodi deleniti autem necessitatibus ducimus ab dolore accusamus aperiam culpa rerum quaerat, illo id! A cupiditate aliquam alias deserunt ratione!</p>
                </li>
                <li>
                        <h3>Sit Amet</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae iusto commodi deleniti autem necessitatibus ducimus ab dolore accusamus aperiam culpa rerum quaerat, illo id! A cupiditate aliquam alias deserunt ratione!</p>
                </li>
                </ol>
            </ul>
        </section>
        <section class="action-success">
            <p id="success-message"></p>
            <svg id="success-check" width="2em" height="2em" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 310.28 310.28" xml:space="preserve" fill="#51b102" stroke="#51b102" stroke-width="0.0031027700000000004"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path style="fill:#0d9c3c;" d="M155.139,0C69.598,0,0,69.598,0,155.139c0,85.547,69.598,155.139,155.139,155.139 c85.547,0,155.139-69.592,155.139-155.139C310.277,69.598,240.686,0,155.139,0z M144.177,196.567L90.571,142.96l8.437-8.437 l45.169,45.169l81.34-81.34l8.437,8.437L144.177,196.567z"></path> </g> </g></svg>
        </section>
    </div>
</body>
</html>
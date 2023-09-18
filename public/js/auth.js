$(document).ready(function(){
    initFormSlideAnims()
    initTacModal()
    initFloatingLabels()
    initToolTips()
    initAddMediaLinkBtnsAndInput()
    clearErrorOnFocus()

$('#register-btn').click(onRegister)
$('#login-btn').click(onLogin)

})



function initFormSlideAnims(){
    // Initiate animations for forms when switching between register and login, uses opacity and margin properties to create fade-in
    // sliding effect and also clear error messages  
    $('#redirect-register').click(function(){
        clearAllErrors()
        $('.login-form').animate({
            opacity: 0,
            marginLeft: '-300px'
        },
        'slow',
        'linear',
        )
        $('.register-form').animate({
            opacity: 1,
            marginLeft: '-450px'
        },
        'slow',
        'linear'
        )
    })
 
    $('#redirect-login').click(function(){
        clearAllErrors()
        $('.register-form').animate({
            opacity: 0,
            marginLeft: '400px'
        },
        'slow',
        'linear'
        )

        $('.login-form').animate({
            opacity: 1,
            marginLeft: '0'
        },
        'slow',
        'linear'
        )
    })
}

function initTacModal(){
    // using the JQuery Modal plugin, here we show the Terms and Conditions section by clicking the span in, the register form
    $('.open-dialog-span').click(function(){
        $('.tac-section').modal({
            fadeDuration: 150
        })
    })
}
function initFloatingLabels(){
    // By using the transform: scaleY rule for class static in the css, here we assign the class to a label after we check if it's
    // corresponding input have text in it or not using the change event
    $('.input-field').each(function(){
        let field = $(this)
        let input = field.find('input')
        let label = field.find('label')
        input.change(function(){
            input.val().length > 0 ? label.addClass('static') : label.removeClass('static')
        })
    })

    $('.media-input').each(function(){
        let field = $(this)
        let input = field.find('input')
        let label = field.find('label')
        input.change(function(){
            input.val().length > 0 ? label.addClass('static') : label.removeClass('static')
        })
    })
}
function onRegister(){
  let errors = validator({                // Validate and check for errors by passing the form input values
    username: $('#username').val(),
    email: $('#email').val(),
    phone: $('#phone').val(),
    password: $('#password').val()
  }, 'register')
  if(Object.values(errors).some(error => error !== '')){
    Object.entries(errors).forEach(([key, value]) => {
       if(value !== ''){                                                    // If there are errors get the key (input name) and value (error message)
        $(`#${key}`).addClass('error').effect("shake", {times: 4}, 700)    // attach class error to give the input red borders and then add
        $(`#${key}-error`).text(value).slideDown("fast")                  // shake animation while giving the error span, the value as text 
       }
    })
  }else {
    $('.action-success').modal({          // On success show the JQuery Modal plugin with fade animation
        fadeDuration: 150
    })
    $('#success-check').css({display:'block'}).toggle("bounce", {times: 3}, "slow") // show success check mark

    setTimeout(() => {
        $('#success-message').text('Congratulations! Your registration was successfull !') //after check mark is done, attache the message too
    }, 1000)

    $('.action-success').on($.modal.BEFORE_CLOSE, () => {
        $('#success-message').text('')   // before the modal is close, clear the success message so it can be used if the user 
    })                                  // logouts later and then enter again

    $('.action-success').on($.modal.AFTER_CLOSE, () => {
        $('.forms-page').animate({           // Just like forms here we use opacity and margin to create and slide up/fade in  effect
            opacity: 0,                      // between the forms and accordions pages                   
            marginTop: '-300px'
        },
        'slow',                     
        'linear',
        )
        $('.accordions-page').animate({
            opacity: 1,
            marginTop: '0'
        },
        'slow',
        'linear'
        )
        .css({
            'z-index': 1
        })
    })
    onAccordionsPageInit()
  }
}
function onLogin(){
    let errors = validator({
    'username-login': $('#username-login').val(),
    'password-login': $('#password-login').val()
    }, 'login')
    if(Object.values(errors).some(error => error !== '')){
        Object.entries(errors).forEach(([key, value]) => {
            if(value !== ''){
        $(`#${key}`).addClass('error').effect("shake", {times: 4}, 700)
        $(`#${key}-error`).text(value).slideDown("fast")
       }
    })
 }else {
    $('.action-success').css({display: 'block'}).modal({
        fadeDuration: 150
    })
    $('#success-check').effect('bounce', {times: 3}, 500)
    setTimeout(() => {
        $('#success-message').text('Login is successfull !')
    }, 1000)

    $('.success-action').on($.modal.BEFORE_CLOSE, () => {
        $('#success-message').text('')
    })
    $('.action-success').on($.modal.AFTER_CLOSE, () => {
        $('.forms-page').animate({
            opacity: 0,
            marginTop: '-300px'
        },
        'slow',
        'linear',
        )
        $('.accordions-page').animate({
            opacity: 1,
            marginTop: '0'
        },
        'slow',
        'linear'
        )
        .css({
            'z-index': 1
        })
    })

    onAccordionsPageInit()
 }
}
function initToolTips(){
    // find the tooltips for every media icon and attach mouse-enter and mouse-leave events to them allowing them to slide-in/out when the
    // user hovers over the icons
    $('.media-item').each(function(){
        let tooltip = $(this).find('.tooltip')
        let iconAndInput = $(this).find('.icon-and-input')
        let iconAndAddBtn = $(iconAndInput).find('.icon-and-add-btn')
        let icon = $(iconAndAddBtn).find('.media-icon')
        $(icon).mouseenter(function(){
            $(tooltip).slideDown("fast", function(){
            })
        })
        $(icon).mouseleave(function(){
            $(tooltip).slideUp("fast", function(){

            })
        })
    })
}
function initAddMediaLinkBtnsAndInput(){
    // to every add button next to media icon attach mouse enter, mouse leave and click events
    $('.media-item').each(function(){
        let iconAndInput = $(this).find('.icon-and-input')
        let inputAndLabel = $(iconAndInput).find('.label-and-input')
        let iconAndAddBtn = $(iconAndInput).find('.icon-and-add-btn')
        let addBtn = $(iconAndAddBtn).find('.add-link')
        $(addBtn).mouseenter(function(){
            $(this).animate({               // rotate clockwise when mouse is over the button
                deg: 180
            },
            {
                duration: 700,
                step: function(now){
                    $(this).css({transform: `rotate(` + now + `deg)`})
                }
            })
        })
    
        $(addBtn).mouseleave(function(){
            $(this).animate({     // rotate counter-clockwise when mouse leaves the the button
                deg: -180
            },
            {
                duration: 700,
                step: function(now){
                    $(this).css({transform: `rotate(` + now + `deg)`})
                }
            })
        })
    
        $(addBtn).click(function(){
            $('.zoomed').each(function(){       // Remove zoomed class for every social media input and label container that has it 
                    $(this).removeClass("zoomed") // and add outzoomed class to create an effect of sliding up and closing them 
                    $(this).addClass("outzoomed")
                    setTimeout(() => {
                        $(this).css({display: "none"})
                    }, 1000)
            })
            if($(inputAndLabel).hasClass("outzoomed")){
                $(inputAndLabel).removeClass("outzoomed")        //for the label and input children of whichever media container we clicked on
            }                                                     // add class zoomed that allows it to slide down and show it's content
            $(inputAndLabel).addClass("zoomed").css({display: "block"})
            let closeBtn = $(inputAndLabel).find('.close-link-input').click(function(){    // clicking the close button adds class outzoomed
                $(inputAndLabel).removeClass('zoomed').addClass('outzoomed')               // that hides this specific input and label container
                setTimeout(() => {
                    $(inputAndLabel).css({display: "none"})
                }, 1000)
            })

        })
    })
}

function validator(inputValues, action){
    // Validator function, checks if there are empty fields and for unlawful chars in email or if password has atleast 1 letter and num in it 
    let errors = {}
    let isThereEmptyFields = checkForEmptyFields(action) // 
    if(isThereEmptyFields){return errors}
    let emailValRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let passwordValRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(action === 'register'){
        errors.username = inputValues.username.length > 4 ? '' : 'Username must be at least 4 characters long!'
        errors.email = emailValRegex.test(inputValues.email) ? '' : 'Please enter a valid email !'
        errors.password = inputValues.password.length > 6 && passwordValRegex.test(inputValues.password) 
        ? '' 
        : 'Password must be at least 6 characters long and contain at least one letter and one number !'
    }else if (action === 'login'){
        errors["username-login"] = inputValues["username-login"].length > 4 ? '' : 'Username must be at least 4 characters long!'
        errors["password-login"] = inputValues["password-login"].length > 6 && passwordValRegex.test(inputValues["password-login"]) 
        ? '' 
        : 'Password must be at least 6 characters long and contain at least one letter and one number !'
    }

    return errors

    function checkForEmptyFields(action){
        let isThereEmptyFields = false;
        Object.entries(inputValues).forEach(([key, value]) => {
            if(value === ''){
                action === 'register' 
                ? errors[key] = `Please fill the required ${key} field !` 
                : errors[key] = `Please fill the required ${key.split('-')[0]} field !` 
                isThereEmptyFields = true
            }
        })
        return isThereEmptyFields
    }
} 

function clearErrorOnFocus(){
    // removes error class when focusing on input and sets the error message span text as empty string while sliding it up
    $('.user-data-input').each(function(){
        $(this).focus(function(){
            if($(this).hasClass('error')){
                $(this).removeClass('error')
                $(`#${$(this).attr('id')}-error`).slideUp('slow')
            }
        })
    })
}

function clearAllErrors(){
    //Meant to clear all errors when user switches between register and login forms
    $('.user-data-input').each(function(){
        if($(this).hasClass('error')){
            $(this).removeClass('error')
            $(`#${$(this).attr('id')}-error`).slideUp('slow')
        }
    })
}
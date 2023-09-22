import { validator } from "./utils/authValidators.js"
import {loginUser, redirectToRegisterPage } from "./services/authServices.js"

$(document).ready(function(){
    $('.login-form').show(
        'slide',
        {direction: 'left'},
    'slow',
    function(){
        $(this).css({'display' : 'flex'})
    }
    )
    initFloatingLabels()
    clearErrorOnFocus()

$('#login-btn').click(onLogin)
$('#redirect-register').on('click', redirectToRegisterPage)
})


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

async function onLogin(){
    let errors = validator({
    'email-login': $('#email-login').val(),
    'password-login': $('#password-login').val()
    }, 'login')
    if(Object.values(errors).some(error => error !== '')){
        visualizeErrors(errors)
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
    let token = $('input[name="_token"]').val()
    await loginUser(
        {
            email: $('#email-login').val(),
            password: $('#password-login').val()
        },
        token
    )
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

function visualizeErrors(errors){
    Object.entries(errors).forEach(([key, value]) => {
        if(value !== ''){                                                    // If there are errors get the key (input name) and value (error message)
         $(`#${key}`).addClass('error').effect("shake", {times: 4}, 700)    // attach class error to give the input red borders and then add
         $(`#${key}-error`).text(value).slideDown("fast")                  // shake animation while giving the error span, the value as text 
        }
     })
}
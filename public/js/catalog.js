import { logoutUser } from "./services/authServices.js"
import { createValidator } from "./utils/createValidators.js"
import { createProduct } from "./services/productServices.js"

$(document).ready(function(){
    initFloatingLabels()
    $('#logout-form').on('submit', async function(e){
        e.preventDefault()
        await logoutUser($('input[name="_token"]').val())
    })

    $('#create-offer').on('click', function(e){
        e.preventDefault()
        $('#create-offer-modal').css({'display' : 'block'})
        $('.create-form').on('submit', function(e){
            e.preventDefault()
            let productData = {
                name: $('#name').val(),
                description: $('#description').val(),
                price: $('#price').val(),
                quantityAvailable: $('#quantityAvailable').val(),
                image: $('#image').val(),
            }
            let token = $('.create-form').find('input[name="_token"]').val()
            createNewProductOffer(productData, token)
        })
    })
})


function initFloatingLabels(){
    // By using the transform: scaleY rule for class static in the css, here we assign the class to a label after we check if it's
    // corresponding input have text in it or not using the change event
    $('.create-input-field').each(function(){
        let field = $(this)
        let input = field.find('input')
        let textarea = field.find('textarea')
        let label = field.find('label')
       if(input){
        input.change(function(){
            input.val().length > 0 ? label.addClass('static') : label.removeClass('static')
        })
       }else {
        textarea.change(function(){
            input.val().length > 0 ? label.addClass('static') : label.removeClass('static')
        })
       }
    })
}

async function createNewProductOffer(productData, token){
     let errors = createValidator(productData)
     if(Object.values(errors).some(error => error !== '')){
        visualizeErrors(errors)
      }else {
       let productId = await createProduct(productData, token)
       localStorage.setItem('productId', productId)
       window.location.href = 'details'
      }
}

function visualizeErrors(errors){
    Object.entries(errors).forEach(([key, value]) => {
        if(value !== ''){                                                    // If there are errors get the key (input name) and value (error message)
         $(`#${key}`).addClass('error').effect("shake", {times: 4}, 700)    // attach class error to give the input red borders and then add
         $(`#${key}-error`).text(value).slideDown("fast")                  // shake animation while giving the error span, the value as text 
        }
     })
}
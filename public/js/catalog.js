import { logoutUser } from "./services/authServices.js"
import { createValidator } from "./utils/createValidators.js"
import { createProduct, getProducts } from "./services/productServices.js"

$(document).ready(async function(){
    let products = await getProductsForCatalog()
    if(products.length > 0){
        generateProductSectionContent(products)
    }else {
        let noProductsMessage = $('<h1>No products for sale yet...</h1>')
        $('.products').append(noProductsMessage)
    }
    $('#logout-form').on('submit', async function(e){
        e.preventDefault()
        await logoutUser($('input[name="_token"]').val())
    })
    
    $('#create-offer').on('click', function(e){
        e.preventDefault()
        initFloatingLabels()
        $('#create-offer-modal').css({'display' : 'block'})
        initCloseModalFunc()
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

function initCloseModalFunc(){
    $('.close').on('click', function(){
        $('#create-offer-modal').css({'display': 'none'})
    })
}

async function getProductsForCatalog(){
    let products = await getProducts()
    return products
}

function generateProductSectionContent(products){
    products.forEach(product => {
        let productCard = $(`
        <div class="card" id=${product.id}>
            <img src="${product.image}" />
            <div class="card-bottom">
                <h5>${product.name}</h5>
                <h6>${product.price} лв.</h6>
            </div>
        </div>
        `)
        $(productCard).on('click', function(e){
            localStorage.setItem('productId', product.id)
            window.location.href='details'
        })
        $('.products').append(productCard)
    })
}
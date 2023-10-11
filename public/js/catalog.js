import { logoutUser, redirectToDetails, getUserSession, redirectToDashboard, removeWarningMessage} from "./services/authServices.js"
import { createValidator } from "./utils/createValidators.js"
import { createProduct, getProducts } from "./services/productServices.js"

$(document).ready(async function(){
    let [products, userSession] = await Promise.all([
        getProductsForCatalog(),
        getUserSession()
    ])
    if(userSession.warning){
        alert(`Warning from administrator:\n${userSession.warning}`)
        await removeWarningMessage(userSession.userId, $('meta[name="csrf-token"]').attr('content'))
    }
    if(userSession.userRole !== 'user'){
        let adminBtn = $('<li> <a href="admin-dashboard"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M176 88v40H336V88c0-4.4-3.6-8-8-8H184c-4.4 0-8 3.6-8 8zm-48 40V88c0-30.9 25.1-56 56-56H328c30.9 0 56 25.1 56 56v40h28.1c12.7 0 24.9 5.1 33.9 14.1l51.9 51.9c9 9 14.1 21.2 14.1 33.9V304H384V288c0-17.7-14.3-32-32-32s-32 14.3-32 32v16H192V288c0-17.7-14.3-32-32-32s-32 14.3-32 32v16H0V227.9c0-12.7 5.1-24.9 14.1-33.9l51.9-51.9c9-9 21.2-14.1 33.9-14.1H128zM0 416V336H128v16c0 17.7 14.3 32 32 32s32-14.3 32-32V336H320v16c0 17.7 14.3 32 32 32s32-14.3 32-32V336H512v80c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64z"/></svg> АДМИНИСТРАТОРСКИ ПАНЕЛ</a> </li>')
        $(adminBtn).on('click', async function(e){
            e.preventDefault()
            await redirectToDashboard()
        })
        $('.nav-links').append(adminBtn)
        $('#create-offer-li').css({'display' : 'none'})
    }
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
        initFloatingLabels()
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
        let textarea = $('#description')
        let label = field.find('label')
       if(textarea){
        textarea.change(function(){
            textarea.val().length > 0 ? label.addClass('static') : label.removeClass('static')
        })
       }else{
        input.change(function(){
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
       redirectToDetails()
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
        $(productCard).on('click', async function(e){
            localStorage.setItem('productId', product.id)
            await redirectToDetails()
        })
        $('.products').append(productCard)
    })
}
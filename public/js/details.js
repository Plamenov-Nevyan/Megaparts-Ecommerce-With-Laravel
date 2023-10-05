import { getProductDetails} from "./services/productServices.js";
import { getUserSession } from "./services/authServices.js";

$(document).ready(async function(){
    await loadProductDetails()
})

async function loadProductDetails(){
    let productId = localStorage.getItem('productId')
    localStorage.clear()
    let csrfToken = $('meta[name="csrf-token"]').attr('content')
    let [product, session] = await Promise.all([
         getProductDetails(productId, csrfToken),
        getUserSession()
    ])
    console.log(product)
    fillProductDetails(product)
    fillOwnerDetails(product.owner)
    if(session.userId === product.owner.id){
        appendOwnerBtns()
    }
}

function fillProductDetails(product){
    let productImage =$(`<img src="${product.image}" alt="product image"/>`)
    $('.left-part').append(productImage)
    $('#product-name').text(product.productName)
    $('#product-quantity').find('#quantity').text(product.quantityAvailable)
    $('.description').find('p').text(product.description)
    $('#product-createdAt').find('#createdAt').text(product.created_at.split(' ')[0])
    $('#product-price').find('#price').text(product.price)
}

function fillOwnerDetails(ownerInfo){
    $('#owner-username').find('#username').text(ownerInfo.username)
    $('#owner-email').find('#email').text(ownerInfo.email)
    $('#owner-phone').find('#phone').text(ownerInfo.phone)
}

function appendOwnerBtns(){
    let buttons = $(`
    <button class="owner-btn" id="edit-btn">Edit Publication</button>
    <button class="owner-btn" id="delete-btn">Delete Publication</button>
`)
$('.action-btns').append(buttons)
}
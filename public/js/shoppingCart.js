import { getUserSession } from "./services/authServices.js";
import { getCart } from "./services/shoppingCartServices.js";

$(document).ready(async function(){
    let session = await getUserSession()
    let cart = await getCart(session.userId)
    let sum = 0
    let products = 0
    cart.forEach(item => {
        sum += Number(item.product.price) * item.quantity 
        products += item.quantity
        let slide = $(createProductSlide(item.product, item.quantity))
        $('.slides').append(slide)
    })
    $('.total').append(`<h1>Продукти за купуване общо : ${products} броя от ${cart.length} вида продукти</h1>`)
    $('.total').append(`<h1>Обща цена за всичко: ${sum} лв.</h1>`)
})

function createProductSlide(product, quantityInCart){
    return `
    <div class="slide">
            <img src="${product.image}">
            <div class="info">
            <h5>Продукт - ${product.name}</h5>
            <h5>Брой в кошницата - ${quantityInCart} броя</h5>
            <h5>Цена за 1бр. - ${product.price} лв.</h5>
            <h5>Обща цена за всички - ${Number(product.price) * quantityInCart} лв.</h5>
        </div>
    </div>
    `
}
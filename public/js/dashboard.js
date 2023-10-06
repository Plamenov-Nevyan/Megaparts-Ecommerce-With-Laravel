import { getAllUsers } from "./services/authServices.js";
import { getProducts } from "./services/productServices.js";

$(document).ready(async function(){
 let csrfToken = $('meta[name="csrf-token"]').attr('content')
 let [users, products] = await Promise.all([
    getAllUsers(csrfToken),
    getProducts()
 ])
 $('.users').find('h3').text(`Users: ${users.length} registered`)
 $('.products').find('h3').text(`Products: ${products.length} created`)
 users.forEach(user => {
   let userAccordion = createUserAccordion(user)
   $('.users').append(userAccordion)
 })
 products.forEach(product => {
   let productAccordion = createProductAccordion(product)
   $('.products').append(productAccordion)
 })
 $('.accordion-header').each(function(){
   $(this).on('click', function(){
      if($(this).hasClass('hidden')){
         let body =  $(this).parent().find('.accordion-body')
         $(body).slideDown('fast').css({'display': 'flex'})
         $(this).find('.show-more').remove()
         $(this).append(createArrowUpSvg())
         $(this).removeClass('hidden')
         $(this).addClass('open') 
         attachHideEvent($(this).parent().attr('id'))
      }else {
         let body =  $(this).parent().find('.accordion-body')
         $(body).slideUp('fast').css({'display': 'none'})
         $(this).find('.hide').remove()
         $(this).append(createArrowDownSvg())
         $(this).removeClass('open')
         $(this).addClass('hidden')
         attachShowEvent($(this).parent().attr('id'))
      }
   })
 })

 function attachHideEvent(accordionId){
   $(`#${accordionId}`).find('.accordion-header').on('click', () => {
      let body =  $(this).parent().find('.accordion-body')
      $(body).slideUp('fast').css({'display': 'none'})
      $(this).find('.hide').remove()
      $(this).append(createArrowDownSvg())
      $(this).removeClass('open')
      $(this).addClass('hidden')
   })
 }

 function attachShowEvent(accordionId){
   $(`#${accordionId}`).find('.accoridon-header').on('click', () => {
      let body =  $(this).parent().find('.accordion-body')
      $(body).slideDown('fast').css({'display': 'flex'})
      $(this).find('.show-more').remove()
      $(this).append(createArrowUpSvg())
      $(this).removeClass('hidden')
      $(this).addClass('open') 
   })
 }
})


function createUserAccordion(user){
   let accordionId = generateUniqueAccordionId(user.id)
   return `
      <div id="${accordionId}" class="accordion">
         <div class="accordion-header hidden">
            <h4>User: ${user.username}<h4>
            <h4>ID: ${user.id}</h4>
            <svg class="show-more" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
         </div>
         <div class="accordion-body">
            <div class="info">
               <h5>Registered on: ${user.created_at.split('T')[0]}</h5>
               <h5>Email: ${user.email}</h5>
               <h5>Facebook: ${user.facebook_link === "" ? 'N/A' : user.facebook_link}</h5> 
               <h5>Instagram: ${user.instagram_link === "" ? 'N/A' : user.instagram_link}</h5> 
               <h5>Twitter: ${user.twitter_link === "" ? 'N/A' : user.twitter_link}</h5> 
               <h5>Phone number: ${user.phone}</h5>
            </div>
            <div class="actions">
               <button>Ban</button>
               <button>Delete</button>
               <button>Edit</button>
               <button>Send Warning</button>
            </div>
         </div>
      </div>
   `
}

function createProductAccordion(product){
   let accordionId = generateUniqueAccordionId(product.id)
   return `
      <div id="${accordionId}" class="accordion">
         <div class="accordion-header hidden">
            <h4>Name: ${product.name}<h4>
            <h4>ID: ${product.id}</h4>
            <svg class="show-more" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
         </div>
         <div class="accordion-body">
            <div class="product-image">
               <img src="${product.image}" alt="product-image"/>
            </div>
            <div class="info">
               <div>
                  <h5> Description:</h5>
                  <p>${product.description}</p>
               </div>
               <h5>Created on: ${product.created_at.split('T')[0]}</h5>
               <h5>Price: ${product.price}</h5> 
               <h5>Quantity: ${product.quantityAvailable}</h5> 
               <h5>Owner ID: ${product.owner.id}</h5> 
               <h5>Owner username: ${product.owner.username}</h5>
            </div>
            <div class="actions">
               <button>Delete</button>
               <button>Edit</button>
            </div>
         </div>
      </div>
   `
}

function createArrowUpSvg(){
   return `
   <svg class="hide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>
   `
}

function createArrowDownSvg(){
   return `
   <svg class="show-more" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
   `
}

function generateUniqueAccordionId(userOrProductId) {
   const timestamp = new Date().getTime();
   const random = Math.floor(Math.random() * 10000) * userOrProductId;
   const accordionId = `${timestamp}${random}`;
   return accordionId;
 }
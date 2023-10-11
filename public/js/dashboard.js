import { getAllUsers, sendWarning, banUser, getUserProfile, getUserSession, editUserProfile, deleteUserProfile } from "./services/authServices.js";
import { getProducts, getProductDetails, editProductData } from "./services/productServices.js";

$(document).ready(async function(){
 let csrfToken = $('meta[name="csrf-token"]').attr('content')
 let [users, products, userSession] = await Promise.all([
    getAllUsers(csrfToken),
    getProducts(),
    getUserSession()
 ])
 $('.users').find('h3').text(`Users: ${users.length} registered`)
 $('.products').find('h3').text(`Products: ${products.length} created`)
 users.forEach(user => {
   let userAccordion = createUserAccordion(user)
   $(userAccordion).find('.actions')
   $('.users').append(userAccordion)
 })
 products.forEach(product => {
   let productAccordion = createProductAccordion(product)
   $('.products').append(productAccordion)
 })
 attachAccordionInteractivity()
 attachAccordionButtonsFunctionality()
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
            <div class="actions ${user.username}" id=${user.id}>
               <button class="ban-btn">Ban</button>
               <button class="delete-user-btn">Delete</button>
               <button class="edit-user-btn">Edit</button>
               <button class="send-warning-btn">Send Warning</button>
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
            <div class="actions" id=${product.id}>
               <button class="delete-product">Delete</button>
               <button class="edit-product">Edit</button>
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

 function appendWarningMessageAreaToModal(userId, username){
   $('#admin-modal').find('.modal-content').append(`
      <div class="message-wrapper">
      <h3>Send a warning to ${username} with ID : ${userId}</h3>
       <textarea name="warning-message" id="warning-message"></textarea>
       <button class="send-message-btn" id="${userId}">Send</button>
      </div>
   `)
 }

 function appendBanConfirmToModal(userId, username){
   $('#admin-modal').find('.modal-content').append(`
   <div class="confirm-wrapper">
   <h3>Are you sure you want to ban ${username} with ID : ${userId}</h3>
    <button class="confirm-ban" id="${userId}">Confirm</button>
    <button class="cancel-ban">Cancel</button>
   </div>
`)
 }

 function appendDeleteUserConfirmToModal(userId, username){
   $('#admin-modal').find('.modal-content').append(`
   <div class="confirm-wrapper">
      <h3>Are you sure you want to permanently delete ${username} with ID : ${userId} ?</h3>
      <button class="confirm-delete" id="${userId}">Confirm</button>
      <button class="cancel-delete">Cancel</button>
   </div>
`)
 }

 async function appendEditUserFormToModal(userId, csrfToken, currentUserRole){
   let user = await getUserProfile(userId, csrfToken)
   let userEditForm = $(`
      <form class="edit-form">
         <fieldset class="edit-input-field">
            <input type="text" class="edit-data-input" id="username" name="username" value="${user.username}"/>
            <label for="username">Username</label>
            <span class="error-span" id="username-error"></span>
         </fieldset>
         <fieldset class="edit-input-field">
            <input type="text" class="edit-data-input" id="email" name="email" value="${user.email}"/>
            <label for="email">Email</label>
            <span class="error-span" id="email-error"></span>
         </fieldset>
         <fieldset class="edit-input-field">
            <input type="number" class="edit-data-input" id="phone" name="phone" value="${user.phone}"/>
            <label for="phone">Phone Number</label>
            <span class="error-span" id="phone-error"></span>
         </fieldset>
         <fieldset class="edit-input-field">
            <input type="text" class="edit-data-input" id="instagram-link" name="instagram-link" value="${user.instagram_link}"/>
            <label for="instagram-link">Instagram Link</label>
            <span class="error-span" id="instagram-error"></span>
         </fieldset>
         <fieldset class="edit-input-field">
            <input type="text" class="edit-data-input" id="twitter-link" name="twitter-link" value="${user.twitter_link}"/>
            <label for="twitter-link">Twitter Link</label>
            <span class="error-span" id="twitter-error"></span>
         </fieldset>
         <fieldset class="edit-input-field">
            <input type="text" class="edit-data-input" id="facebook-link" name="facebook-link" value="${user.facebook_link}"/>
            <label for="facebook-link">Facebook Link</label>
            <span class="error-span" id="facebook-error"></span>
         </fieldset>
         <fieldset class="edit-select-field">
            <label for="userRole">User Role</label>
            <select class="edit-data-select" id="userRole" name="userRole">
               ${user.userRole === 'user' ? `<option value="user" selected>User</user>` : `<option value="user">User</user>`}
               ${user.userRole === 'moderator' ? `<option value="moderator" selected>Moderator</user>` : `<option value="moderator">Moderator</user>`}
               ${currentUserRole === 'owner' && user.userRole === 'admin'
                ? `<option value="admin" selected>Admin</option>` 
                : `<option value="admin">Admin</user>`
               }
            </select>
            <span class="error-span" id="role-error"></span>
         </fieldset>
         <button class="edit-user-btn" id="${userId}">Edit</button>
      </form>
   `) 
   $('#admin-modal').find('.modal-content').append(userEditForm)
 }

 async function appendEditProductFormToModal(productId, csrfToken){
   let product = await getProductDetails(productId, csrfToken)
   let productEditForm = $(`
      <form class="edit-form">
         <fieldset class="edit-input-field">
            <input type="text" class="edit-data-input" id="name" name="name" value="${product.name}"/>
            <label for="name">Name:</label>
            <span class="error-span" id="name-error"></span>
         </fieldset>
         <fieldset class="edit-input-field">
            <textarea class="edit-data-input" id="description" name="description">
             ${product.description}
            </textarea>
            <label for="description">Description:</label>
            <span class="error-span" id="description-error"></span>
         </fieldset>
         <fieldset class="edit-input-field">
            <input type="number" class="edit-data-input" id="price" name="price" value="${product.price}"/>
            <label for="price">Price:</label>
            <span class="error-span" id="price-error"></span>
         </fieldset>
         <fieldset class="edit-input-field">
            <input type="number" class="edit-data-input" id="quantityAvailable" name="quantityAvailable" value="${product.quantityAvailable}"/>
            <label for="quantityAvailable">Quantity:</label>
            <span class="error-span" id="quantityAvailable-error"></span>
         </fieldset>
         <fieldset class="edit-input-field">
            <input type="text" class="edit-data-input" id="image" name="image" value="${product.image}"/>
            <label for="image">Image:</label>
            <span class="error-span" id="image-error"></span>
         </fieldset>
         <button class="edit-product-btn" id="${productId}">Edit</button>
      </form>
   `) 
   $('#admin-modal').find('.modal-content').append(productEditForm)
 }

 function closeModal(){
   $('#admin-modal').css({'display':'none'})
 }

 function initFloatingLabels(){
   // By using the transform: scaleY rule for class static in the css, here we assign the class to a label after we check if it's
   // corresponding input have text in it or not using the change event
   $('.edit-input-field').each(function(){
       let field = $(this)
       let input = field.find('input')
       let textarea = $('#description')
       let label = field.find('label')
       if(textarea){
         console.log(textarea)
         textarea.val().length > 0 ? label.addClass('static') : label.removeClass('static')
         textarea.change(function(){
            textarea.val().length > 0 ? label.addClass('static') : label.removeClass('static')
        })
       }else{
         input.val().length > 0 ? label.addClass('static') : label.removeClass('static')
         input.change(function(){
             input.val().length > 0 ? label.addClass('static') : label.removeClass('static')
         })
       }
   })
}

async function replaceAccordionWhenEdited(accordionId, newData, forProductOrUser){
   let newAccordionId = generateUniqueAccordionId()
   let currentUserSession = await getUserSession()
   let newAccordion
   if(forProductOrUser === 'user'){
       newAccordion = $(`
         <div id="${newAccordionId}" class="accordion">
            <div class="accordion-header hidden">
               <h4>User: ${newData.username}<h4>
               <h4>ID: ${newData.id}</h4>
               <svg class="show-more" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
            </div>
            <div class="accordion-body">
               <div class="info">
                  <h5>Registered on: ${newData.created_at.split('T')[0]}</h5>
                  <h5>Email: ${newData.email}</h5>
                  <h5>Facebook: ${newData.facebook_link === "" ? 'N/A' : newData.facebook_link}</h5> 
                  <h5>Instagram: ${newData.instagram_link === "" ? 'N/A' : newData.instagram_link}</h5> 
                  <h5>Twitter: ${newData.twitter_link === "" ? 'N/A' : newData.twitter_link}</h5> 
                  <h5>Phone number: ${newData.phone}</h5>
               </div>
               <div class="actions ${newData.username}" id=${newData.id}>
                  <button class="ban-btn">Ban</button>
                  <button class="delete-user-btn">Delete</button>
                  <button class="edit-user-btn">Edit</button>
                  <button class="send-warning-btn">Send Warning</button>
               </div>
            </div>
         </div>
      `)
      $(`#${accordionId}`).replaceWith(newAccordion)
      attachAccordionInteractivity()
      attachAccordionButtonsFunctionality(currentUserSession.userRole)
   }else if(forProductOrUser === 'product'){
       newAccordion = $(`
         <div id="${accordionId}" class="accordion">
            <div class="accordion-header hidden">
               <h4>Name: ${newData.name}<h4>
               <h4>ID: ${newData.id}</h4>
               <svg class="show-more" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
            </div>
            <div class="accordion-body">
               <div class="product-image">
                  <img src="${newData.image}" alt="product-image"/>
               </div>
               <div class="info">
                  <div>
                     <h5> Description:</h5>
                     <p>${newData.description}</p>
                  </div>
                  <h5>Created on: ${newData.created_at.split('T')[0]}</h5>
                  <h5>Price: ${newData.price}</h5> 
                  <h5>Quantity: ${newData.quantityAvailable}</h5> 
                  <h5>Owner ID: ${newData.owner.id}</h5> 
                  <h5>Owner username: ${newData.owner.username}</h5>
               </div>
               <div class="actions" id=${newData.id}>
                  <button class="delete-product">Delete</button>
                  <button class="edit-product">Edit</button>
               </div>
            </div>
         </div>
   `)
   }
   $(`#${accordionId}`).replaceWith(newAccordion)
   attachAccordionInteractivity()
   attachAccordionButtonsFunctionality(currentUserSession.userRole)
}

function removeAccordionOnDelete(accordionId){
   $(`#${accordionId}`).remove()
}

function attachAccordionInteractivity(){
   $('.accordion-header').each(function(){
      $(this).off()
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
}

function attachAccordionButtonsFunctionality(currentUserRole){
   let csrfToken = $('meta[name="csrf-token"]').attr('content')
   $('.send-warning-btn').each(function(){
      $(this).on('click', () => {
         $('#admin-modal').css({'display' : 'block'})
         $('.modal-content').empty()
         $('.modal-content').append(`<span class="close">&times;</span>`)
         $('.close').on('click', () => closeModal())
         appendWarningMessageAreaToModal($(this).parent().attr('id'), $(this).parent()[0].classList[1])
         $('.send-message-btn').on('click', function(){
            sendWarning($('#warning-message').val(), csrfToken, $(this).attr('id'))
            $('.modal-content').empty()
            $('.modal-content').append('<h3>Warning message sent successfully !</h3>')
            setTimeout(() => {
               closeModal()
            }, 2000)
         })
      })
   })

   $('.ban-btn').each(function(){
      $(this).on('click', () => {
         $('#admin-modal').css({'display' : 'block'})
         $('.modal-content').empty()
         $('.modal-content').append(`<span class="close">&times;</span>`)
         $('.close').on('click', () => closeModal())
         appendBanConfirmToModal($(this).parent().attr('id'), $(this).parent()[0].classList[1])
         $('.confirm-ban').on('click', function(){
            banUser($(this).attr('id'), csrfToken)
            $('.modal-content').empty()
            $('.modal-content').append('<h3>User was banned successfully !</h3>')
            setTimeout(() => {
               closeModal()
            }, 2000)
         })
         $('.cancel-ban').on('click', () => closeModal())
      })
   })

   $('.edit-user-btn').each(function(){
      $(this).on('click', () => {
         $('#admin-modal').css({'display' : 'block'})
         $('.modal-content').empty()
         $('.modal-content').append(`<span class="close">&times;</span>`)
         $('.close').on('click', () => closeModal())
         let parentAccordionId = $(this).parent().parent().parent().attr('id')
         appendEditUserFormToModal($(this).parent().attr('id'), csrfToken, currentUserRole)
         .then(() => {
            initFloatingLabels()
            $('.edit-user-btn').on('click', async function(e){
               e.preventDefault()
               let data = {
                  username: $('#username').val(),
                  email: $('#email').val(),
                  phone: $('#phone').val(),
                  instagram_link: $('#instagram-link').val(),
                  twitter_link: $('#twitter-link').val(),
                  facebook_link: $('#facebook-link').val(),
                  userRole: $('#userRole').val(),
               }
               let newUserData = await editUserProfile(data, $(this).attr('id'), csrfToken)
               $('.modal-content').empty()
               $('.modal-content').append('<h3>User profile was edited successfully !</h3>')
               setTimeout(() => {
                  closeModal()
               }, 2000)
               await replaceAccordionWhenEdited(parentAccordionId, newUserData, 'user')
            })
         })
      })
   })
   
   $('.delete-user-btn').each(function(){
      $(this).on('click', function(){
         $('#admin-modal').css({'display' : 'block'})
         $('.modal-content').empty()
         $('.modal-content').append(`<span class="close">&times;</span>`)
         $('.close').on('click', () => closeModal())
         let parentAccordionId = $(this).parent().parent().parent().attr('id')
         appendDeleteUserConfirmToModal($(this).parent().attr('id'), $(this).parent()[0].classList[1])
         $('.confirm-delete').on('click', async function(){
            await deleteUserProfile($(this).attr('id'), csrfToken)
            $('.modal-content').empty()
            $('.modal-content').append('<h3>User profile was deleted successfully !</h3>')
            setTimeout(() => {
               closeModal()
            }, 2000)
            removeAccordionOnDelete(parentAccordionId)
         })
         $('.cancel-delete').on('click', () => closeModal())
      })
   })

   $('.edit-product').each(function(){
      $(this).on('click', function(){
         $('#admin-modal').css({'display' : 'block'})
         $('.modal-content').empty()
         $('.modal-content').append(`<span class="close">&times;</span>`)
         $('.close').on('click', () => closeModal())
         let parentAccordionId = $(this).parent().parent().parent().attr('id')
         appendEditProductFormToModal($(this).parent().attr('id'), csrfToken)
         .then(() => {
            initFloatingLabels()
            $('.edit-product-btn').on('click', async function(e){
               e.preventDefault()
               let data = {
                  name: $('#name').val(),
                  description: $('#description').val(),
                  price: $('#price').val(),
                  quantityAvailable: $('#quantityAvailable').val(),
                  image: $('#image').val(),
               }
               let newProductData = await editProductData(data, $(this).attr('id'), csrfToken)
               $('.modal-content').empty()
               $('.modal-content').append('<h3>Product was edited successfully !</h3>')
               setTimeout(() => {
                  closeModal()
               }, 2000)
               await replaceAccordionWhenEdited(parentAccordionId, newProductData, 'product')
            })
         })
      })
   })
}
import { getProductDetails, editProductData, deleteProduct} from "./services/productServices.js";
import { getUserSession, redirectToCatalogPage } from "./services/authServices.js";

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
    fillProductDetails(product)
    fillOwnerDetails(product.owner)
    if(session.userId === product.owner.id){
        appendOwnerBtns()
        $('#edit-btn').on('click', function(){
            if(session.banned){
                return alert('Sorry you are banned from updating this product...')
            }
            $('#actions-modal').css({'display' : 'block'})
            $('.modal-content').empty()
            $('.modal-content').append(`<span class="close">&times;</span>`)
            $('.close').on('click', () => closeActionsModal())
            appendEditProductFormToModal(product)
            .then(() => {
               initFloatingLabels()
               console.log($('input[name="price"]'))
               $('.edit-product-btn').on('click', async function(e){
                  e.preventDefault()
                  let data = {
                     name: $('#name').val(),
                     description: $('#description').val(),
                     price: $('input[name="price"]').val(),
                     quantityAvailable: $('#quantityAvailable').val(),
                     image: $('#image').val(),
                  }
                  let newProductData = await editProductData(data, $(this).attr('id'), csrfToken)
                  $('.modal-content').empty()
                  $('.modal-content').append('<h3>Product was edited successfully !</h3>')
                  setTimeout(() => {
                     closeActionsModal()
                  }, 2000)
                  fillProductDetails(newProductData)
                  fillOwnerDetails(product.owner)
               })
            })
        })

        $('#delete-btn').on('click', function(){
            if(session.banned){
                return alert('Sorry you are banned from deleting this product...')
            }
            $('#actions-modal').css({'display' : 'block'})
            $('.modal-content').empty()
            $('.modal-content').append(`<span class="close">&times;</span>`)
            $('.close').on('click', () => closeActionsModal())
            appendDeleteProductConfirmToModal(product.id, product.name)
            $('.confirm-delete').on('click', async function(){
                await deleteProduct(product.id, csrfToken)
                $('.modal-content').empty()
                $('.modal-content').append('<h3>Product was edited successfully !</h3>')
                setTimeout(() => {
                   closeActionsModal()
                }, 2000)
                redirectToCatalogPage()
            })
            $('.cancel-delete').on('click', function(){
                closeActionsModal()
            })
        })
    }
}

function fillProductDetails(product){
    let productImage =$(`<img src="${product.image}" alt="product image"/>`)
    $('.left-part').empty()
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

async function appendEditProductFormToModal(product){
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
          <button class="edit-product-btn" id="${product.id}">Edit</button>
       </form>
    `) 
    $('#actions-modal').find('.modal-content').append(productEditForm)
  }

  function appendDeleteProductConfirmToModal(productId, name){
    $('#actions-modal').find('.modal-content').append(`
    <div class="confirm-wrapper">
       <h3>Are you sure you want to permanently delete product: ${name} ?</h3>
       <button class="confirm-delete" id="${productId}">Confirm</button>
       <button class="cancel-delete">Cancel</button>
    </div>
 `)
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

 function closeActionsModal(){
    $('#actions-modal').css({'display':'none'})
  }
 
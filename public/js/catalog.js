import { logoutUser } from "./services/authServices.js"

$(document).ready(function(){
    $('#logout-form').on('submit', async function(e){
        e.preventDefault()
        await logoutUser($('input[name="_token"]').val())
    })
})
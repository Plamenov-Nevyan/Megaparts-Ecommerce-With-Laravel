const url = 'http://localhost:8000'
import { authOperations } from "../utils/authOperations.js"

export const registerUser = async (userData, token) => {
    try{
        await fetch('/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-TOKEN": token
            },
            body: JSON.stringify(userData),
        })
        await redirectToCatalogPage()
    }catch(error){
        alert(`Error: ${error}`)
    }
}

export async function loginUser(userData, token){
    try{
        await fetch(`/signIn`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token
            },
            body: JSON.stringify(userData)
        })
        await redirectToCatalogPage()
    }catch(error){
        alert(`Error: ${error}`)
    }
}

export async function logoutUser(token){
    try{
        await fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-TOKEN": token
            },
        })
        await redirectToLoginPage()
    }catch(error){
        alert(`Error: ${error}`)
    }
}

export async function getUserSession(){
    try{
        let resp = await fetch('/getSession')
        if(!resp.ok){
            throw new Error('Error: Server Error.')
        }
        let session = await resp.json()
        return session
    }catch(error){
        alert(`Error: ${error}`)
    }
}

export async function getAllUsers(csrfToken){
    try{
        let resp = await fetch('/getAllUsers', {
            method: 'GET',
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
        })
        if(!resp.ok){
            throw new Error('Error: Server Error')
        }
        let users = await resp.json()
        return users
    }catch(error){
        alert(`Error: ${error}`)
    }
}

export async function sendWarning(warningMessage, csrfToken, userId){
    try{
        await fetch('/sendWarning', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({message : warningMessage, userId})
        })
    }catch(error){
        alert(`Error: ${error}`)
    }
}

export async function banUser(userId, csrfToken){
    try{
        await fetch('/ban', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({'userId': userId})
        })
    }catch(error){
        alert(`Error: ${error}`)
    }
}

export async function getUserProfile(userId, csrfToken){
    try{
        let resp = await fetch (`/user_profile?userId=${userId}`, {
            method : 'GET',
            headers : {
                'X-CSRF-TOKEN': csrfToken
            },
        })
        if(!resp.ok){
            throw new Error('Error: Server Error')
        }
        let user = await resp.json()
        return user
    }catch(error){
        alert(`Error: ${error}`)
    }
}

export async function editUserProfile(data, userId, csrfToken){
    try{
        let resp = await fetch(`/update_user_profile?userId=${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify(data)
        })
        if(!resp.ok){
            throw new Error('Error: Server Error')
        }
        let newData = await resp.json()
        return newData 
    }catch(error){
        alert(`Error: ${error}`)
    }
}

export async function deleteUserProfile(userId, csrfToken){
    try{
        await fetch(`/delete_user_profile?userId=${userId}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': csrfToken
            },
        })
    }catch(error){
        alert(`Error: ${error}`)
    }
}

export async function removeWarningMessage(userId, csrfToken){
    try{
        await fetch(`/remove_warning?userId=${userId}`, {
            method: 'PUT',
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        })
    }catch(error){
        alert(`Error: ${error}`)
    }
}

export async function redirectToLoginPage(){
    // await fetch('/login')
    window.location.href = '/login'
}

export async function redirectToRegisterPage(){
    // await fetch('/register')
    window.location.href = '/register'
}

export async function redirectToCatalogPage(){
    // await fetch('/catalog')
    window.location.href = '/catalog'
}

export async function redirectToDetails(){
//    await fetch('/productDetails')
    window.location.href = '/productDetails'
}

export async function redirectToDashboard(){
    // await fetch('/dashboard')
    window.location.href = '/dashboard'
 }

 export async function redirectToShoppingCart(){
    window.location.href = '/shoppingCart'
 }
const url = 'http://localhost:8000'
import { authOperations } from "../utils/authOperations.js"

export const registerUser = async (userData, token) => {
   let resp =  await fetch('/signUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "X-CSRF-TOKEN": token
        },
        body: JSON.stringify(userData),
    })
    let catalogUrl = await resp.json()
   window.location.href = catalogUrl.url
}

export async function loginUser(userData, token){
    await fetch(`/signIn`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token
        },
        body: JSON.stringify(userData)
    })
    await redirectToCatalogPage()
}

export async function logoutUser(token){
    let resp =  await fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "X-CSRF-TOKEN": token
        },
    })
   await redirectToLoginPage()
}

export async function getUserSession(){
    let resp = await fetch('/getSession')
    let session = await resp.json()
    return session
}

export async function getAllUsers(csrfToken){
    let resp = await fetch('/getAllUsers', {
        method: 'GET',
        headers: {
            "X-CSRF-TOKEN": csrfToken,
        },
    })
    let users = await resp.json()
    return users
}

export async function sendWarning(warningMessage, csrfToken, userId){
    await fetch('/sendWarning', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify({message : warningMessage, userId})
    })
}

export async function banUser(userId, csrfToken){
    await fetch('/ban', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify({'userId': userId})
    })
}

export async function getUserProfile(userId, csrfToken){
    let resp = await fetch (`/user_profile?userId=${userId}`, {
        method : 'GET',
        headers : {
            'X-CSRF-TOKEN': csrfToken
        },
    })

    let user = await resp.json()
    return user
}

export async function editUserProfile(data, userId, csrfToken){
    let resp = await fetch(`/update_user_profile?userId=${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(data)
     })
    let newData = await resp.json()
    return newData 
}

export async function deleteUserProfile(userId, csrfToken){
     await fetch(`/delete_user_profile?userId=${userId}`, {
        method: 'DELETE',
        headers: {
            'X-CSRF-TOKEN': csrfToken
        },
     })
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
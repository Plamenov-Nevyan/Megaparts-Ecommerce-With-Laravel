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
    let resp  = await fetch(`${url}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token
        },
        body: JSON.stringify(userData)
    })
    let session = await resp.json()
    authOperations.createSession(session)
}

export async function logoutUser(){
     authOperations.clearSession
}

export async function redirectToLoginPage(){
    await fetch('/login')
}

export async function redirectToRegisterPage(){
    await fetch('/register')
}

export async function redirectToCatalogPage(){
    await fetch('/catalog')
}
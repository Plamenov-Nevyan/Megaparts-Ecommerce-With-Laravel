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
    window.location.href = "catalog"
}

export async function logoutUser(token){
    let resp =  await fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "X-CSRF-TOKEN": token
        },
    })
   window.location.href = 'login'
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
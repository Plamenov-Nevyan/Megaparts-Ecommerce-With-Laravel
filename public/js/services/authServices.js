const url = 'http://localhost:8000/api'
import { authOperations } from "../utils/authOperations.js"

export async function registerUser(userData, token){
    let resp  = await fetch(`${url}/register`, {
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
export const addToCart = async (userId, productId, quantity, csrfToken) => {
   try {
    await fetch('/add_to_cart', {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': csrfToken,
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            userId,
            productId,
            quantity
        })
    })
   }catch(error){alert(error)}
}

export const checkIfProductInCart = async (productId, userId, csrfToken) => {
    try {
        let resp = await fetch(`/check_if_in_cart?productId=${productId}&userId=${userId}`)
        if(!resp.ok){
            throw new Error(`Error: Server Error`)
        }
        let result = await resp.json()
        return result.isItInCart
    }catch(error){
        alert(`Error: ${error}`)
    }
}

export const getCurrentQuantity = async (userId, productId, csrfToken) => {
    try{
        let resp = await fetch(`/get_current_quantity?userId=${userId}&productId=${productId}`)
        if(!resp.ok){
            throw new Error('Error: Server Error')
        }
        let data = await resp.json()
        return data.quantity
    }catch(error){
        alert(`Error: ${error}`)
    }
}

export const removeFromCart = async (productId, userId, quantity, csrfToken) => {
    try{
        await fetch('/remove_from_cart', {
            method: 'PUT',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'Content-Type':'application/json',
            },
            body : JSON.stringify({
                productId,
                userId,
                quantity
            })
        })
    }catch(error){
        alert(`Error: ${error}`)
    }
}

export const getCartCount = async (userId) => {
    try{
        let resp = await fetch(`/get_cart_count?userId=${userId}`)
        if(!resp.ok){
            throw new Error('Error: Server Error')
        }
        let data = await resp.json()
        return data.count
    }catch(error){
        alert(`Error: ${error}`)
    }
}

export async function getCart(userId){
    try{
        let resp = await fetch(`/get_cart?userId=${userId}`)
        if(!resp.ok){
            throw new Error('Error: Server Error')
        }
        let products = await resp.json()
        return products
    }catch(error){
        alert(`Error: ${error}`)
    }
}
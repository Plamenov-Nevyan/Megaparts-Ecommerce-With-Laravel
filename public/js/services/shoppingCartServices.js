export const addToCart = async (userId, productId, quantity, csrfToken) => {
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
}

export const checkIfProductInCart = async (productId, userId, csrfToken) => {
    let resp = await fetch(`/check_if_in_cart?productId=${productId}&userId=${userId}`)
    let result = await resp.json()
    return result.isItInCart
}

export const getCurrentQuantity = async (userId, productId, csrfToken) => {
    let resp = await fetch(`/get_current_quantity?userId=${userId}&productId=${productId}`)
    let data = await resp.json()
    return data.quantity
}

export const removeFromCart = async (productId, userId, quantity, csrfToken) => {
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
}
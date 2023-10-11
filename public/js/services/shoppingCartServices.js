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
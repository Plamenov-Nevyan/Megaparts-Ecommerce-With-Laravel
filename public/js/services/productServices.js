export const createProduct = async (productData, token) => {
    let resp = await fetch ('/createProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token,
        },
        body: JSON.stringify(productData)
    })

    let data = await resp.json()
    return data.productId
}
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

export const getProducts = async () => {
    let resp = await fetch('/getAllProducts')
    let products = await resp.json()
    return products
}

export const getProductDetails = async (productId, csrfToken) => {
    let resp = await fetch('/getProductDetails', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'X-CSRF-TOKEN': csrfToken,
        },
        body : JSON.stringify({productId})
    })
    let productData = await resp.json()
    return productData
}

export const editProductData = async (updateData, productId, csrfToken) => {
    let resp = await fetch(`/update_product?productId=${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
            'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify(updateData)
    })
    let updatedProduct = await resp.json()
    return updatedProduct
}
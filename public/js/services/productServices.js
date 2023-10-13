export const createProduct = async (productData, token) => {
    try{
        let resp = await fetch ('/createProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token,
            },
            body: JSON.stringify(productData)
        })
        if(!resp.ok){
            throw new Error('Error: Server Error')
        }
        let data = await resp.json()
        return data.productId
    }catch(error){
        alert(`Error: ${error}`)
    }
}

export const getProducts = async () => {
    try{
        let resp = await fetch('/getAllProducts')
        if(!resp.ok){
            throw new Error('Error: Server Error')
        }
        let products = await resp.json()
        return products
    }catch(error){
        alert(`Error: ${error}`)
    }
}

export const getProductDetails = async (productId, csrfToken) => {
    try{
        let resp = await fetch('/getProductDetails', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body : JSON.stringify({productId})
        })
        if(!resp.ok){
            throw new Error('Error: Server Error')
        }
        let productData = await resp.json()
        return productData
    }catch(error){
        alert(`Error: ${error}`)
    }
}

export const editProductData = async (updateData, productId, csrfToken) => {
    try{
        let resp = await fetch(`/update_product?productId=${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify(updateData)
        })
        if(!resp.ok){
            throw new Error('Error: Server Error')
        }
        let updatedProduct = await resp.json()
        return updatedProduct
    }catch(error){
        alert(`Error: ${error}`)
    }
}

export const deleteProduct = async (productId, csrfToken) => {
    try{
        await fetch(`/delete_product?productId=${productId}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
            },
        })
    }catch(error){
        alert(`Error: ${error}`)
    }
}
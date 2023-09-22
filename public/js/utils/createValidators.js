export function createValidator(inputValues){
    // Validator function, checks if there are empty fields and for unlawful chars in email or if password has atleast 1 letter and num in it 
    let errors = {}
    let isThereEmptyFields = checkForEmptyFields() // 
    if(isThereEmptyFields){return errors}
    errors.name = inputValues.name.length >= 4 ? '' : 'Product name must be at least 4 characters long!'
    errors.description = inputValues.description.length >= 20 ? '' : 'Product description should be at least 20 characters long !'
    errors.price = isNaN(inputValues.price)? 'Product price should be a number !' : ''
    errors.quantityAvailable = isNaN(inputValues.quantityAvailable) 
    ? 'Product quantity should be a whole number!' 
    : ''
    errors.image = inputValues.image.startsWith('http') || inputValues.image.startsWith('https')
    ? ''
    : 'Please provide a valid link for the product image !'
    return errors

    function checkForEmptyFields(){
        let isThereEmptyFields = false;
        Object.entries(inputValues).forEach(([key, value]) => {
            if(value === ''){
                errors[key] = `Please fill the required ${key} field !` 
                isThereEmptyFields = true
            }
        })
        return isThereEmptyFields
    }
} 
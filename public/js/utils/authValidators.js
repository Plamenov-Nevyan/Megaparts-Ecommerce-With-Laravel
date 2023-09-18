export function validator(inputValues, action){
    // Validator function, checks if there are empty fields and for unlawful chars in email or if password has atleast 1 letter and num in it 
    let errors = {}
    let isThereEmptyFields = checkForEmptyFields(inputValues, action) // 
    if(isThereEmptyFields){return errors}
    let emailValRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let passwordValRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    console.log(inputValues)
    if(action === 'register'){
        errors.username = inputValues.username.length > 4 ? '' : 'Username must be at least 4 characters long!'
        errors.email = inputValues["email-login"].length > 6 && emailValRegex.test(inputValues.email) ? '' : 'Please enter a valid email !'
        errors.phone = isNaN(inputValues.phone) || inputValues.phone.length < 8 ? 'Phone number can consist only of numbers and must be at least 8 characters long' : '' 
        errors.password = inputValues.password.length > 6 && passwordValRegex.test(inputValues.password) 
        ? '' 
        : 'Password must be at least 6 characters long and contain at least one letter and one number !'
    }else if (action === 'login'){
        errors["email-login"] = inputValues["email-login"].length > 6 && emailValRegex.test(inputValues["email-login"]) ? '' : 'Email must be valid and at least 6 characters long!'
        errors["password-login"] = inputValues["password-login"].length > 6 && passwordValRegex.test(inputValues["password-login"]) 
        ? '' 
        : 'Password must be at least 6 characters long and contain at least one letter and one number !'
    }

    return errors

    function checkForEmptyFields(inputValues,action){
        let isThereEmptyFields = false;
        Object.entries(inputValues).forEach(([key, value]) => {
            if(value === ''){
                action === 'register' ? errors[key] = `Please fill the required ${key} field !` : errors[key] = `Please fill the required ${key.split('-')[0]} field !` 
                isThereEmptyFields = true
            }
        })
        return isThereEmptyFields
    }
} 
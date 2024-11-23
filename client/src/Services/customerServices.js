const api_Url = "http://localhost:5123/api/customers"
export const getAllCustomers = () => {
    return fetch(api_Url).then(res => res.json())
}

export const postCustomer = (customerObj) => {
    return fetch(api_Url, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body:(JSON.stringify(customerObj))
    })
}

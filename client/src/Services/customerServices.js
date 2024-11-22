const api_Url = "http://localhost:5123/api/customers"
export const getAllCustomers = () => {
    return fetch(api_Url).then(res => res.json())
}

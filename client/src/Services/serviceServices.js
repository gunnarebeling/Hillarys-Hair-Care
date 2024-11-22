const api_Url = "http://localhost:5123/api/services"
export const getAllServices = () => {
    return fetch(api_Url).then(res => res.json())
}
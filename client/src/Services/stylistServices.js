const api_Url = "http://localhost:5123/api/stylists"
export const getAllStylists = () => {
    return fetch(api_Url).then(res => res.json())
}
const api_Url = "http://localhost:5123/api/stylists"
export const getAllStylists = () => {
    return fetch(api_Url).then(res => res.json())
}

export const updateStylist = (id) => {
    return fetch(`${api_Url}/${id}`,{
        method: 'PUT',
        
    })
}

export const postStylist = (stylistObj) => {
    return fetch(api_Url, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body:(JSON.stringify(stylistObj))
    })
}
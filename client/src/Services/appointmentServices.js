const api_Url = "http://localhost:5123/api/appointments"
export const getAllAppointments = () => {
    return fetch(api_Url).then(res => res.json())
}

export const postAppointment = (applicationObj) => {
    return fetch(api_Url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(applicationObj)

    })
}

export const getAppointmentDetails = (id) => {
    return fetch(`${api_Url}/${id}`).then(res => res.json())
}

export const deleteAppointment = (id) => {
    return fetch(`${api_Url}/${id}`, {
        method: 'DELETE'
    })
}
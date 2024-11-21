const api_Url = "http://localhost:5123/api/appointments"
export const getAllAppointments = () => {
    return fetch(api_Url).then(res => res.json())
}
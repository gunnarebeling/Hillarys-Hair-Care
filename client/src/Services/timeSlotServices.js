const api_Url = "http://localhost:5123/api/timeslots"
export const getAllTimeSlots = () => {
    return fetch(api_Url).then(res => res.json())
}
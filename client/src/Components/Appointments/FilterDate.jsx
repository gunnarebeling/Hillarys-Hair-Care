import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// eslint-disable-next-line react/prop-types
export const FilterDate = ({allAppointments, setFilter}) => {
    const [appointmentDate, setAppointmentDate] = useState(new Date ())

    useEffect(() => {
        let copy = [...allAppointments]
        const date = appointmentDate.toISOString().split('T')[0]
        copy = copy.filter(a => a.date === date)
        setFilter(copy)
        
    }, [appointmentDate])
    return (
        <div>
      <label>Select a Date:</label>
      <DatePicker
        selected={appointmentDate}
        onChange={(date) => setAppointmentDate(date)}
        dateFormat="yyyy/MM/dd"
      />
    </div>

    )
}
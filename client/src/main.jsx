
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppoointmentList } from './Components/Appointments/AppointmetList.jsx'
import { CreateAppointment } from './Components/Appointments/CreateAppointment.jsx'
import { AppointmentDetails } from './Components/Appointments/AppointmentDetails.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path='appointments'>
          <Route index element={<AppoointmentList/>} />
          <Route path='create' element={<CreateAppointment/>}/>
          <Route path=':appId' element={<AppointmentDetails/>}/>

        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
)

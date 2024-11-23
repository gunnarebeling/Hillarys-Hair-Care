
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppoointmentList } from './Components/Appointments/AppointmetList.jsx'
import { CreateAppointment } from './Components/Appointments/CreateAppointment.jsx'
import { AppointmentDetails } from './Components/Appointments/AppointmentDetails.jsx'
import { EditAppointment } from './Components/Appointments/EditAppointment.jsx'
import { StylistList } from './Components/Stylists/StylistList.jsx'
import { CreateStylist } from './Components/Stylists/CreateStylist.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path='appointments'>
          <Route index element={<AppoointmentList/>} />
          <Route path='create' element={<CreateAppointment/>}/>
          <Route path=':appId' element={<AppointmentDetails/>}/>
          <Route path=':appId/edit' element={<EditAppointment/>}/>
        </Route>
        <Route path='stylists'>
          <Route index element={<StylistList/>} />
          <Route path='create' element={<CreateStylist/>} />

        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
)


import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppoointmentList } from './Components/Appointments/AppointmetList.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<AppoointmentList/>} />
      </Route>
    </Routes>
  </BrowserRouter>
)

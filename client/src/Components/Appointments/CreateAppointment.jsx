
import { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { getAllCustomers } from '../../Services/customerServices';
import { getAllStylists } from '../../Services/stylistServices';
import DatePicker from 'react-datepicker';
import './Datestyle.css'
import { getAllTimeSlots } from '../../Services/timeSlotServices';
import { getAllAppointments, postAppointment } from '../../Services/appointmentServices';
import { getAllServices } from '../../Services/serviceServices';
import { useNavigate } from 'react-router-dom';


export const CreateAppointment = () => {
    const [allCustomers, setAllCustomers] = useState([])
    const [allStylists, setAllStylists] = useState([])
    const [allTimeSlots, setAllTimeSlots] = useState([])
    const [allAppointments, setAllAppointments] = useState([])
    const [allServices, setAllServices] = useState([])
    const [filteredTimeSlots, setFilteredTimeSlots] = useState([])
    const [filteredStylist, setFilteredStylists] = useState([])
    const [formData, setFormData] = useState({
        customerId: 0,
        stylistId: 0,
        date: '',
        timeSlot: 0,
        services:[]
    });
    const navigate = useNavigate()

    useEffect(() => {
        getAllCustomers().then(res => setAllCustomers(res))
        getAllStylists().then(res => {
            const availableStylists = res.filter(s => s.isActive)
            setAllStylists(availableStylists)})
        getAllTimeSlots().then(res => setAllTimeSlots(res))
        getAllAppointments().then(res => setAllAppointments(res))
        getAllServices().then(res => setAllServices(res))
    }, [])

    useEffect(() => {
        let stylists = [...allStylists]
        let timeslots = [...allTimeSlots]
       
        setFilteredStylists(stylists)
        setFilteredTimeSlots(timeslots)
       
    }, [allTimeSlots,allStylists])

    useEffect(() => {
        let filterTime = [...allTimeSlots]
        let filterStylists = [...allStylists]
        if (formData.timeSlot !== 0 && formData.date !== null) {
            filterStylists = filterStylists.filter(s => !allAppointments.some(a => s.id === a.stylistId && a.date === formData.date && a.timeSlotId === parseInt(formData.timeSlot)))
            setFilteredStylists(filterStylists)
        }
        if (formData.stylistId !== 0 && formData.date !== null ) {
            filterTime =  filterTime.filter(t => !allAppointments.some(a => a.timeSlotId === t.id && a.date === formData.date && a.stylistId === parseInt(formData.stylistId)))
            setFilteredTimeSlots(filterTime)
        }
    }, [formData])

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if ((name === "timeSlot" || name === "stylistId") && formData.date === "") {
           return alert("must select a date first")

        }
        if (type === "checkbox") {
            let copy = { ...formData };
            copy.services = copy.services.map(service =>
                service.id === parseInt(name)
                    ? { ...service, status: !service.status }
                    : service
            );
            setFormData(copy);
            
        }
        else{
            setFormData({
            ...formData,
            [name]: value
            });

        }
    };
    const handleDateChange = (date) => {
       
        setFormData({
            ...formData,
            date: date, // Update the date in formData
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.customerId === 0 || formData.stylistId === 0 || formData.date === '' || formData.timeSlot === '' || formData.services.every(s => s.status === false) ) {
            return alert("please finish form")
        }else{
            formData.date = formData.date.toISOString().split('T')[0]
            postAppointment(formData).then(
                navigate('/appointments')
            )
        }
        
    };

    return (
        <Container className="my-5">
        <Row className="justify-content-center">
            <Col md={6}>
            <h2>Create Appointment</h2>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCustomerId" className="mb-3">
                <Form.Label>Choose Customer</Form.Label>
                <Form.Control
                    as="select"
                    name="customerId"
                    value={formData.customerId}
                    onChange={handleChange}
                    required
                >
                    <option value="#">Choose</option>
                    {allCustomers.map(c => <option key={`customer-${c.id}`} value={c.id}>{c.name}</option>)}
                
                </Form.Control>
                </Form.Group>

                <Form.Group controlId="formDate" className="mb-3">
                    <div>
                        <Form.Label>Date</Form.Label>

                    </div>
                    <DatePicker
                                selected={formData.date}
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd" 
                                className="form-control"
                                minDate={new Date()} 
                                required
                            />
                </Form.Group>
                {/* Email */}
                <Form.Group controlId="formSlotId" className="mb-3">
                <Form.Label>Choose Time Slot</Form.Label>
                <Form.Control
                    as="select"
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    required
                >
                    <option value="#">Choose</option>
                    {filteredTimeSlots.map(s => <option key={`timeslot-${s.id}`} value={s.id}>{s.time}</option>)}
                
                </Form.Control>
                </Form.Group>
                <Form.Group controlId="formStylistId" className="mb-3">
                <Form.Label>Choose Stylist</Form.Label>
                <Form.Control
                    as="select"
                    name="stylistId"
                    value={formData.stylistId}
                    onChange={handleChange}
                    required
                >
                    <option value="#">Choose</option>
                    {filteredStylist.map(s => <option key={`stylist-${s.id}`} value={s.id}>{s.name}</option>)}
                
                </Form.Control>
                </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Select Services</Form.Label>
                {allServices.map(s => {
                   return( <Form.Check
                        key={s.id}
                        type="checkbox"
                        label={s.type}
                        name={s.id}
                        checked={formData.services.find(fs => fs.id === s.id)?.status || ""}
                        onChange={handleChange}
                    />)

                })}
                
            </Form.Group>

                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>
            </Col>
        </Row>
        </Container>
    );
    };


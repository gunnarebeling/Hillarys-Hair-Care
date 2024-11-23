import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import InputMask from "react-text-mask";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import {  getCustomerById, updateCustomer } from "../../Services/customerServices";
export const EditCustomer = () => {
    const {custId} = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        getCustomerById(custId).then( res => {
            setFormData({
                ...formData,
                name: res.name,
                phoneNumber: res.phoneNumber,
                email: res.email
            })
        })
    }, [])


    // Yup validation schema
    const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phoneNumber: Yup.string()
        .matches(/^\d{3}-\d{3}-\d{4}$/, "Phone number must be in the format 123-456-7890")
        .required("Phone number is required"),
    });

    // Handle change
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
    };

    // Handle submit with Yup validation
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Validate the form data using Yup
        await validationSchema.validate(formData, { abortEarly: false });
        setErrors({}); // Clear errors if validation passes
        console.log("Form submitted successfully:", formData);
        // Proceed with form submission logic (e.g., API call)
        updateCustomer(custId, formData).then(()=> {
            navigate('/customers')
        })

    } catch (validationErrors) {
        // Convert Yup errors to a more readable format
        const formattedErrors = validationErrors.inner.reduce((acc, err) => {
        acc[err.path] = err.message;
        return acc;
        }, {});
        setErrors(formattedErrors);
    }
    };

    return (
    <div className="container">
        <div>
        <h4>Edit Customer</h4>
        </div>
        <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
            name="name"
            type="text"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <InputMask
            mask={[/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholder="123-456-7890"
            className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            />
            {errors.phoneNumber && (
            <div className="invalid-feedback">{errors.phoneNumber}</div>
            )}
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
            Submit
        </Button>
        </Form>
    </div>
    );
}
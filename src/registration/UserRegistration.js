import React,{Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {FormGroup} from "react-bootstrap";
import "./UserRegistration.css";
import UserRegistrationAlert from "./UserRegistrationAlert";



class UserRegistration extends Component{
   constructor(props) {
       super(props);
       this.userRegistrationAlert = React.createRef();
   }

    handleSubmit = event =>{
       event.preventDefault();
       console.log(event.target.email.value);
       this.registerUser(event.target.firstName.value,event.target.lastName.value,
        event.target.email.value,event.target.password.value)
    }
    registerUser(firstName, lastName, email, password){
        fetch('http://localhost:8080/api/registration', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            })
        }).then(function (response){
            if(response.status === 200){
                this.showRegistrationAlert("success", "User registered", "Please confirm your email.");
            }else {
                this.showRegistrationAlert("failed", "User already exists", "Please choose a different email");
            }
        }.bind(this)).catch(function (error){
                this.showRegistrationAlert("failed", "Error", "Something went wrong");
        }.bind(this))
    }
    showRegistrationAlert(variant, heading, message){
       this.userRegistrationAlert.current.setVariant(variant);
       this.userRegistrationAlert.current.setHeading(heading);
       this.userRegistrationAlert.current.setMessage(message);
       this.userRegistrationAlert.current.setVisible(true);
    }

    render() {
        return (
            <>
                <div className="Register">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="firstName" size="lg">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control autoFocus name="firstName"/>
                        </Form.Group>
                        <Form.Group controlId="lastName" size="lg">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control autoFocus name="lastName"/>
                        </Form.Group>
                        <Form.Group controlId="email" size="lg">
                            <Form.Label>Email</Form.Label>
                            <Form.Control autoFocus name="email"/>
                        </Form.Group>
                        <Form.Group controlId="password" size="lg">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password"/>
                        </Form.Group>

                        <Button className="Button" blocksize="lg" type="submit">Register</Button>
                    </Form>
                </div>
                <UserRegistrationAlert ref={this.userRegistrationAlert}/>
            </>
        )
    }
}

export default UserRegistration;
import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {Alert} from "reactstrap";

import TextFieldGroup from "../common/TextFieldGroup";
import Button from "../common/Button";

import {register} from '../../store/actions/authActions';
import CheckBoxGroup from "../common/CheckBoxGroup";

const Signup = ({error, register}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setAdmin] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const validateForm = () => {
        return firstName.length > 0
            && lastName.length > 0
            && email.length > 0
            && password.length > 0;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create user object
        const newUser = {
            firstName,
            lastName,
            email,
            password,
            isAdmin,
            role: isAdmin ? "admin" : "normal"
        };

        // Attempt to Register
        console.log(newUser);
        register(newUser);
    }

    useEffect(() => {
        // Check for register error
        if (error.id === 'REGISTER_FAIL') {
            setErrorMsg(error.msg.msg);
        } else {
            setErrorMsg(null);
        }
    }, [error]);

    return (
        <div className="card mt-5 w-50 mx-auto">
            <article className="card-body">
                <h4 className="card-title text-center mb-4 mt-1">Registration</h4>
                {errorMsg && Object.keys(errorMsg).length !== 0 ?
                    <Alert color="danger">{errorMsg}</Alert> : null}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <TextFieldGroup defaultMessage="First Name"
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        classes="mb-3"
                                        onChange={e => setFirstName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <TextFieldGroup defaultMessage="Last Name"
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        classes="mb-3"
                                        onChange={e => setLastName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <TextFieldGroup defaultMessage="Email"
                                        id="email"
                                        name="email"
                                        type="email"
                                        classes="mb-3"
                                        onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <TextFieldGroup defaultMessage="*******"
                                        id="password"
                                        name="password"
                                        type="password"
                                        classes="mb-3"
                                        onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <CheckBoxGroup
                            id="isAdmin"
                            name="isAdmin"
                            checked={isAdmin}
                            value={isAdmin}
                            placeholder="Register as an admin user?"
                            onChange={e => setAdmin(e.target.checked)}/>
                    </div>
                    <div className="form-group">
                        <Button type="submit"
                                id="submit"
                                defaultMessage="Register"
                                classes="btn btn-info btn-block mb-3 mt-3"/>
                    </div>
                    <p>
                        Do you have account? <a href="/signin">Login</a>
                    </p>
                </form>
            </article>
        </div>
    );
}

const mapStateToProps = state => ({
    error: state.error
});

export default connect(mapStateToProps, {register})(Signup);

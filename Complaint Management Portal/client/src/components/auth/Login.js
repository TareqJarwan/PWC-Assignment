import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {Alert} from "reactstrap";

import TextFieldGroup from "../common/TextFieldGroup";
import Button from "../common/Button";

import {login} from '../../store/actions/authActions';

const Login = ({login, error}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create user object
        const newUser = {
            email,
            password
        };

        // Attempt to login
        console.log(newUser);
        login(newUser);
    }

    useEffect(() => {
        // Check for login error
        if (error.id === 'LOGIN_FAIL') {
            setErrorMsg(error.msg.msg);
        } else {
            setErrorMsg("");
        }
    }, [error]);

    return (
        <div className="card mt-5 w-50 mx-auto">
            <article className="card-body">
                <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>
                {errorMsg.length > 0 ?
                    <Alert color="danger">{errorMsg}</Alert> : null}
                <form onSubmit={handleSubmit}>
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
                        <Button type="submit"
                                id="submit"
                                defaultMessage="Login"
                                classes="btn btn-info btn-block mb-3"/>
                    </div>
                    <p>
                        Don't have an account? <a href="/signup">Register</a>
                    </p>
                </form>
            </article>
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, {login})(Login);

import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {Alert} from "reactstrap";

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import Button from '../common/Button';
import PhoneInputField from '../common/PhoneInputField';
import CheckBoxGroup from '../common/CheckBoxGroup';
import SelectListGroup from '../common/SelectListGroup';

import {
    countriesDropDownPreparation,
    existingCustomerDropDownPreparation,
    occupationDropDownPreparation
} from "../../utils/dataInitializer";
import {addComplaint} from "../../store/actions/complaintActions";

const AddComplaint = ({addComplaint, error, auth}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [occupation, setOccupation] = useState("");
    const [existingCustomer, setExistingCustomer] = useState("");
    const [location, setLocation] = useState("");
    const [message, setMessage] = useState("");
    const [agree, setAgreed] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const resetFields = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setOccupation("");
        setExistingCustomer("");
        setMessage("");
        setLocation("")
    }
    const onSubmit = (event) => {
        event.preventDefault();

        // Create complaint object
        const newComplaint = {
            firstName,
            lastName,
            email,
            phoneNumber,
            occupation,
            existingCustomer,
            location,
            message,
            user: auth.user._id
        };

        console.log(newComplaint);

        addComplaint(newComplaint);

        resetFields();
    }

    useEffect(() => {
        if (error)
            setErrorMsg(error.msg.msg || error.msg);
        else
            setErrorMsg(null);
    }, [error]);

    const errors = {}

    const existingCustomerOptions = existingCustomerDropDownPreparation();
    const occupationOptions = occupationDropDownPreparation();
    const countriesOptions = countriesDropDownPreparation();

    return (
        <div className="container h-100">
            <div className="jumbotron my-5">
                <div className="panel-body m-5 w-50 text-center mx-auto">
                    <form onSubmit={onSubmit} className="my-5">
                        <div className="row mt-5 mb-3">
                            <h3 className="text-center">We Are at Your Service</h3>
                            <p className="text-center">Our service operatives are available to assist you anytime.Just
                                fill the form below</p>
                        </div>

                        {errorMsg && Object.keys(errorMsg).length !== 0 ?
                            <Alert color="danger">{errorMsg}</Alert> : null}

                        <div className="form-group row">
                            <div className="col-6">
                                <TextFieldGroup id="firstName"
                                                type="text"
                                                defaultMessage="First Name"
                                                name="firstName"
                                                value={firstName}
                                                onChange={e => setFirstName(e.target.value)}
                                                error={errors.firstName}/>
                            </div>

                            <div className="col-6">
                                <TextFieldGroup id="lastName"
                                                type="text"
                                                defaultMessage="Last Name"
                                                name="lastName"
                                                value={lastName}
                                                onChange={e => setLastName(e.target.value)}
                                                error={errors.lastName}/>
                            </div>
                        </div>
                        <div className="form-group row mt-2">
                            <div className="col-12">
                                <TextFieldGroup id="email"
                                                type="email"
                                                defaultMessage="Email"
                                                name="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                error={errors.email}/>
                            </div>
                        </div>
                        <div className="form-group row mt-2">
                            <div className="col-6">
                                <div className="col-12">
                                    <PhoneInputField id="phoneNumber"
                                                     name="phoneNumber"
                                                     defaultMessage="Phone number"
                                                     handleChange={setPhoneNumber}
                                                     phone={phoneNumber}
                                                     error={errors.phoneNumber}/>
                                </div>
                            </div>
                            <div className="col-6">
                                <SelectListGroup id="occupation"
                                                 placeholder="Occupation"
                                                 name="occupation"
                                                 value={occupation}
                                                 onChange={e => setOccupation(e)}
                                                 error={errors.occupation}
                                                 options={occupationOptions}/>
                            </div>
                        </div>
                        <div className="form-group row mt-2">
                            <div className="col-6">
                                <SelectListGroup id="existingCustomer"
                                                 placeholder="Existing Customer"
                                                 name="existingCustomer"
                                                 value={existingCustomer}
                                                 onChange={e => setExistingCustomer(e)}
                                                 error={errors.existingCustomer}
                                                 options={existingCustomerOptions}/>
                            </div>
                            <div className="col-6">
                                <SelectListGroup id="location"
                                                 placeholder="Location"
                                                 name="location"
                                                 value={location}
                                                 onChange={e => setLocation(e)}
                                                 error={errors.location}
                                                 options={countriesOptions}/>
                            </div>
                        </div>

                        <div className="form-group row mt-2">
                            <div className="col-12">
                                <TextAreaFieldGroup
                                    id="message"
                                    name="message"
                                    placeholder="Message"
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}/>
                            </div>
                        </div>

                        <div className="form-group row mt-2">
                            <div className="col-12 text-right">
                                <CheckBoxGroup
                                    id="agree"
                                    name="present"
                                    checked={agree}
                                    value={agree}
                                    placeholder="I agree to the Privacy Policy"
                                    onChange={e => setAgreed(e.target.checked)}/>
                            </div>
                        </div>

                        <div className="form-group row mt-3 mb-2">
                            <div className="col-12">
                                <Button type="submit"
                                        id="event.submit"
                                        defaultMessage="Send Request"
                                        classes="btn btn-info w-100"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.error,
    auth: state.auth
});


export default connect(mapStateToProps, {addComplaint})(AddComplaint);

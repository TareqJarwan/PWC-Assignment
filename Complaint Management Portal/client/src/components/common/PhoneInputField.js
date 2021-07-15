import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags'

import 'react-phone-number-input/style.css'

const PhoneInputField = ({ id, phone, handleChange, defaultMessage, name, error }) => {
    return (
        <>
            <PhoneInput
                id={id}
                country="JO"
                flags={flags}
                name={name}
                placeholder={defaultMessage}
                value={phone}
                className={classNames(
                    'form-control ltr-direction',
                    { 'is-invalid': error })}
                onChange={handleChange} />
            {error && (<div className="invalid-feedback">{error}</div>)}
        </>
    );
};

PhoneInputField.propTypes = {
    id: PropTypes.string,
    phone: PropTypes.string,
    handleChange: PropTypes.func,
    defaultMessage: PropTypes.string,
    error: PropTypes.string,
    name: PropTypes.string,
};

export default PhoneInputField;
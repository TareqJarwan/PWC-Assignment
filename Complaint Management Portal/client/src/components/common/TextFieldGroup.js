import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TextFieldGroup = ({id, name, defaultMessage, value, error, info, type, onChange, disabled, classes}) => {
    return (
        <>
            <input type={type}
                   id={id}
                   placeholder={defaultMessage}
                   name={name}
                   value={value}
                   onChange={onChange}
                   disabled={disabled}
                   autoComplete="off"
                   className={classNames(
                       'form-control', classes,
                       {'is-invalid': error}
                   )}/>

            {info && (<small className="form-text text-muted">{info}</small>)}
            {error && (<div className="invalid-feedback">{error}</div>)}
        </>
    )
};

TextFieldGroup.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    defaultMessage: PropTypes.string,
    value: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.string,
};

TextFieldGroup.defaultProps = {
    type: 'text'
};

export default TextFieldGroup;

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({ id, name, placeholder, value, error, info, onChange }) => {
    return (
        <>
            <textarea
                rows="10"
                id={id}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className={classnames(
                    'form-control',
                    { 'is-invalid': error }
                )} />

            {info && <small className="form-text text-muted">{info}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
        </>
    );
};

TextAreaFieldGroup.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
};

export default TextAreaFieldGroup;

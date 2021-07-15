import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxGroup = ({id, name, placeholder, value, type, onChange, disabled, checked}) => {
    return (
        <div className="form-check">
            <input className="form-check-input"
                   type={type}
                   value={value}
                   id={id}
                   disabled={disabled}
                   checked={checked}
                   name={name}
                   onChange={onChange}/>
            <label className="form-check-label float-start" htmlFor={id}>
                {placeholder}
            </label>
        </div>


    )
};

CheckBoxGroup.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.bool,
    type: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    checked: PropTypes.bool
};

CheckBoxGroup.defaultProps = {
    type: 'checkbox'
};

export default CheckBoxGroup;

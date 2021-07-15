import React from 'react';
import PropTypes from 'prop-types';
import SelectSearch from "react-select-search";

import 'react-select-search/style.css';

const SelectListGroup = ({ id, name, value, error, info, onChange, options, placeholder }) => {
    return (
        <>
            <div dir="ltr">
                <SelectSearch id={id} options={options}
                    value={value}
                    name={name}
                    onChange={onChange}
                    placeholder={placeholder} />
                {info && (<small className="form-text text-muted">{info}</small>)}
                {error && (<div className="invalid-feedback">{error}</div>)}
            </div>
        </>
    )
};

SelectListGroup.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array
};

export default SelectListGroup;
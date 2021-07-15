import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({ id, name, defaultMessage, type, disabled, classes, onClick, loading }) => {
    return (
        <>
            <button type={type}
                id={id}
                name={name}
                disabled={disabled}
                onClick={onClick}
                className={classNames(classes, { 'not-allowed-cursor': disabled })}>
                {loading && <i className="fa fa-spin fa-refresh" />}
                {defaultMessage}
            </button>
        </>
    );
};

Button.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    defaultMessage: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    classes: PropTypes.string,
    onClick: PropTypes.func,
    loading: PropTypes.bool
};

Button.defaultProps = {
    type: 'button'
};

export default Button;

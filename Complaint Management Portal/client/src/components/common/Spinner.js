import React from 'react';
import PropTypes from "prop-types";
import {css} from '@emotion/core';
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({loading, size}) => {
    const styles = css`
        display: block;
        margin: auto 40%;
        border-color: black;
    `;
    return (
        <div className='sweet-loading'>
            <ClipLoader
                css={styles}
                sizeUnit={"px"}
                size={size}
                color={'black'}
                loading={loading}/>
        </div>
    );
};

Spinner.defaultProps = {
    size: 100
};

Spinner.propTypes = {
    loading: PropTypes.bool,
};

export default Spinner;
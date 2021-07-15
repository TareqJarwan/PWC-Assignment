import React from 'react';
import PropTypes from "prop-types";

const ProgressBar = ({progress}) => {
    return (
        <div className="progress">
            <div className="progress-bar progress-bar-striped bg-info progress-bar-animated"
                 role="progressbar"
                 aria-valuenow={progress}
                 aria-valuemin="0"
                 aria-valuemax="100"
                 style={{"width": progress+"%"}}>
                <span className="small">{progress}%</span>
            </div>
        </div>
    );
};

ProgressBar.propTypes = {
    progress: PropTypes.number,
};

export default ProgressBar;

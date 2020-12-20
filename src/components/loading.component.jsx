import React from 'react';

export const LoadingComponent = (props) => {
    return (
        <div className="center">
            <hr className="left-separator" />
                <div className="spinner-border text-secondary center" role="status" />
            <hr className="right-separtor" />
        </div>
    ); 
}

export default LoadingComponent;
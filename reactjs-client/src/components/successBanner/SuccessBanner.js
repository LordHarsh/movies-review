import React from "react";
import './SuccessBanner.css';

export const SuccessBanner = ({message}) => {
    return (
        <div className="success-banner">
            <p>{message}</p>
        </div>
    );
};

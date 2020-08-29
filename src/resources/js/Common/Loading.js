import React, { useState, useContext,Fragment  } from 'react';
import MDSpinner from 'react-md-spinner';

export const Loading = (props) => {

    return(
        
        <div className={`loading-icon ${props.h}`}>
            <MDSpinner />
            <em className="mt-3 txt_M">{props.text}.</em>
        </div>
    )
}
import React from 'react';

export const PageHeaderTitle = (props) => {

    return (
        <div className="page-header">
            <h1 className="txt_XL">{props.title}</h1>
        </div>
    );
    
}

export const PageHeaderSubTitle = (props) => {

    return(
        <div className="page-sub-header">
            <h3 className="txt_XS">{props.title}</h3>
        </div>
    );

    
}
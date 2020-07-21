import React from 'react';
import ReactDOM from 'react-dom';
export class PageHeaderTitle extends React.Component{
    render(){
        return (
            <div className="page-header">
                <h1 className="txt_XL">{this.props.title}</h1>
            </div>
        );
    }
}

export class PageHeaderSubTitle extends React.Component{
    render(){
        return(
            <div className="page-sub-header">
                <h3 className="txt_XS">{this.props.title}</h3>
            </div>
        );

    }
}
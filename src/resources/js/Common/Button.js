import React from 'react';
export const Button =(props) => {
    let dom;
    if(props.btn[2]=='loading'){
        dom=(<><i className="fas fa-spinner"></i><span>{props.btn[0]}</span></>);
    }else if(props.btn[2]=='check'){
        dom=(<><i className="fas fa-check"></i><span>{props.btn[0]}</span></>);
    }else if(props.btn[2]=='miss'){
        dom=(<><i className="fas fa-times"></i><span>{props.btn[0]}</span></>);
    }else{
        dom=(<span>{props.btn[0]}</span>);
    }
    return(
        <div>
            <button className={`w-100 button-common txt_S ${props.btn[1]}`} onClick={props.onclick}>{dom}</button>
        </div>
    );
}
export const LabelButtonX = (props) => {
    return(
        <p className="labelButton-common txt_L text-center labelButton-border" onClick={props.onclick}>
            {props.btn}
        </p>
    )
}
export const LabelButton = (props) =>{
    return(
        <em className={`labelButton-common txt_XS ${props.btn[1]}`} onClick={props.onclick}>{props.btn[0]} <i className="fas fa-arrow-right"></i></em>
    )
}
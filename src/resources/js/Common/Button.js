import React from 'react';
export function Button(props){
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
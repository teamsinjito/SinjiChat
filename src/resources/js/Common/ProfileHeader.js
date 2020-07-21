import React from 'react';
export function ProfileHeader(props){
    return(
        <>
            <h1 className="profile-header-txt txt_XL w-75">{props.title}</h1>
            <hr className="header-line"></hr>
        </>
    )
}
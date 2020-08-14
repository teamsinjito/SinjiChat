import React from 'react';
export const ProfileHeader = (props) => {
    return(
        <>
            <h1 className="profile-header-txt txt_XL w-75">{props.title}</h1>
            <hr className="header-line"></hr>
        </>
    )
}

export const ProfileTxtLabel = (props) => {
    return(
        <p className="profile-label txt_L">{props.label}</p>
    )
}
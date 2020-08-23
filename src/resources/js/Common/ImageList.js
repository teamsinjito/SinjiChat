import React, { Fragment } from 'react';

const ImageList = ({listElement,menu,index,onClick}) =>{

    const TALK="Talk"
    const MYPAGE="MyPage"
    const ADDGROUP="AddGroup"
    const ADDFRIEND="AddFriend"
    const REQUEST="Request"

    if(menu　==　TALK){

        return(
            <div className="user-list">
                <img 
                    src={`data:image/jpg;base64,${listElement.icon}`} 
                    alt=''  
                    className="w-100 pr-2 pl-2" 
                    data-index={index}
                    onClick={onClick}
                /> 
                <p className="text-center txt_M list-txt">
                    {listElement.name}
                    {listElement.new == null  ? '' :"（+"+listElement.new+"）"}
                </p>
            </div>
        )
    }
    else if(menu == MYPAGE){
        return(
            <Fragment>
                <img 
                    src={listElement.icon} 
                    alt=''  
                    className="w-100 pr-2 pl-2"
                    id={listElement.id}
                    onClick={onClick}
                /> 
                <p className="text-center txt_M list-txt">
                    {listElement.name}
                </p>
            </Fragment>
        )
    }
    else if(menu == ADDFRIEND){
        return(
            <div className="user-list">
                <img 
                    src={`data:image/jpg;base64,${listElement.icon}`} 
                    alt=''  
                    className="w-100 pr-2 pl-2" 
                    data-index={index}
                    onClick={onClick}
                /> 
                <p className="text-center txt_M list-txt">
                    {listElement.name}
                    {listElement.new == null  ? '' :"（+"+listElement.new+"）"}
                </p>
            </div>
        )
    }
    else if(menu == ADDGROUP){
        return(
            <Fragment>
                <div className="add-group-list user-list" onClick={onClick} data-id={listElement.id}>
                    <img 
                        src={`data:image/jpg;base64,${listElement.icon}`} 
                        alt=''  
                        className={`w-100 pr-2 pl-2 img-opacity-${listElement.checked}`} 
                    /> 
                    <div className={`selected-message-wrapper w-100 pr-2 pl-2 select-image-${listElement.checked}`}>
                        <em className="selected-message w-100 txt_M">selected</em>
                    </div>
                </div>
                <p className="text-center txt_M list-txt">
                    {listElement.name}
                </p>
            </Fragment>
        )
    }
    else if(menu== REQUEST){

        return(
            <div className="user-list">
                <img 
                    src={listElement.requesttype == "Friend" ? `data:image/jpg;base64,${listElement.icon}`:listElement.icon} 
                    alt=''  
                    className="w-100 pr-2 pl-2" 
                    data-index={index}
                    onClick={onClick}
                /> 
                <p className="text-center txt_M list-txt">
                    {listElement.name}
                </p>
            </div>
        )
    }
    else{

    }
}

export default ImageList
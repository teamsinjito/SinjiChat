import React, { Fragment } from 'react';

const ImageList = ({listElement,menu,index,onClick}) =>{

    const TALK="Talk"
    const MYPAGE="MyPage"
    const ADDFRIEND="AddFriend"

    if(menu　==　TALK){

        return(
                <Fragment>
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
                </Fragment>
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
            <Fragment>
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
            </Fragment>
        )
    }
    else{

    }
}

export default ImageList
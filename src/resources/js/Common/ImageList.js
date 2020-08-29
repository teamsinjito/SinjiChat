import React, { Fragment } from 'react';
import {RadioGroup, Radio} from 'react-radio-group';
import {ProfileTxtLabel} from './ProfileHeader';

const ImageList = ({listElement,menu,index,onClick,selectedMenu,method}) =>{

    const TALK="Talk"
    const MYPAGE="MyPage"
    const ADDGROUP="AddGroup"
    const ADDFRIEND="AddFriend"
    const REQUEST="Request"
    const TIMELINE="TimeLine"

    if(menu　==　TALK){

        return(
            <div className="user-list">
                <img 
                    src={listElement.icon}
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
                    src={listElement.icon}  
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
                        src={listElement.icon} 
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
                    src={listElement.icon} 
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
    else if(menu== TIMELINE){
        return(
        // ★★★表示できたらipad用のcol設定追加して
        <div className="container form-group mt-5">
            <div className="row">
                {/* 左側要素 */}
                <div className="col-xl-8 col-12">
                    {/* タイトル */}
                    <ProfileTxtLabel label="テスト"/>
                    {/* 本文 */}
                    <ProfileTxtLabel label={listElement.message}/>
                </div>
                
                {/* 要素右側 */}
                <div className="col-xl-4 col-12">
                    <img src={listElement.image} className="w-100"/>
                </div>

                {/* ラジオボタン(スマホレイアウト時のみ表示) */}
                <div className="row  pc-none w-100">
                    <div className="offset-3 col-6 p-0 mt-5">
                        <RadioGroup Component="radio-group" selectedValue={selectedMenu} onChange={method}>
                        <label className={`radio-mark mark-profile-${selectedMenu}`}>
                            <Radio value="profile"/>
                        </label>
                        <label className={`radio-mark mark-image-${selectedMenu}`}>
                            <Radio value="image"/>
                        </label>
                    </RadioGroup>
                    </div>
                </div>
                
            </div>
        </div>
        )
    }
    else{

    }
}

export default ImageList
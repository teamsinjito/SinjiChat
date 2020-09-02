import React, { useState  } from 'react';
import {ProfileHeader,ProfileTxtLabel} from '../Common/ProfileHeader';
import {Button} from '../Common/Button';
import axios from "axios";

export const Request = (props) => {
    const button=[['許可','btn-active','none'],
                ['許可中','btn-lock','loading'],
                ['許可済み','btn-lock','check'],
                ['許可失敗','btn-active','miss'],
                ['許可','btn-lock','none']];
    const buttonIgnore=[['無視','btn-active','none'],
                ['無視中','btn-lock','loading'],
                ['無視済み','btn-lock','check'],
                ['無視失敗','btn-active','miss'],
                ['無視','btn-lock','none']];
    const [btn,setButton] = useState(button[0]);
    const [btnIgnore,setButtonIgnore] = useState(buttonIgnore[0]);

    //リクエスト許可
    function requestOK(){
        setButton(button[1])
        setButtonIgnore(buttonIgnore[4])

        axios
            .post('/Request/post/allow',{

                room_id:props.room_id,
                type:props.type

            })
            .then((res) => {


                setButton(button[2])   

            })
            .catch(error => {

                setButton(button[3])
                setButtonIgnore(buttonIgnore[0])

            })
    }

    //リクエスト無視
    function requestNG(){

        setButton(button[4])
        setButtonIgnore(buttonIgnore[1])

        axios
            .post('/Request/post/ignore',{

                room_id:props.room_id,
                type:props.type

            })
            .then((res) => {


                setButtonIgnore(buttonIgnore[2])   

            })
            .catch(error => {

                setButtonIgnore(buttonIgnore[3])
                setButton(button[0])

            })
    }
    return(
        <div className="container form-group mt-5" >
            <div className="row">
                <div className="col-xl-8 col-md-6 col-12"  style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>   
                    <ProfileHeader title={`${props.type}-Profile`}/>
                    <ProfileTxtLabel label={props.name}/>
                    <ProfileTxtLabel label={props.profile}/>
                    <br></br>
                    <div className="row">
                        <div className="col-4 p-0 pc-show">
                            <Button btn={btn} onclick={requestOK}/>
                        </div>
                        <div className="col-4 p-0 ml-3 pc-show">
                            <Button btn={btnIgnore} onclick={requestNG}/>
                        </div>
                    </div>

                </div>
                <div className="col-xl-4 col-md-6 col-12">
                    <div className="text-center friend-profile">
                        <img src={props.icon} className="w-100"/>
                    </div>
                </div>
            </div>
            <div className="pc-none mt-5 p-0">
                <div className="row">
                    <div className="col-6">
                        <Button btn={btn} onclick={requestOK}/>
                    </div>
                    <div className="col-6">
                        <Button btn={btnIgnore} onclick={requestNG}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
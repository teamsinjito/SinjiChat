import React, { useState, useContext  } from 'react';
import {ProfileHeader,ProfileTxtLabel} from '../../Common/ProfileHeader';
import {Button} from '../../Common/Button';
import axios from "axios";

import {Store,Provider} from '../../components/store'

export const AddFriendProfile = (props) => {

    const {state, dispatch} = useContext(Store)　//store参照
    const button=[['申請','btn-active','none'],
                    ['申請中','btn-lock','loading'],
                    ['申請済み','btn-lock','check'],
                    ['友達追加済み','btn-lock','check'],
                    ['申請失敗','btn-active','miss']];
    const [btn,setButton] = useState(button[props.status])

    //友達申請
    function requestFriend(){

        setButton(button[1])

        axios
            .post('/AddFriend/post',{

                to_user_id:props.id

            })
            .then((res) => {

                setButton(button[res.data])   
                updateStatusButton(res.data);

            })
            .catch(error => {

                console.log(error)
                setButton(button[4])
                updateStatusButton(button[4])

            })
            
    }

    //申請ボタンの状態を更新
    function updateStatusButton(status){

        const listCopy = state.allUser.map((output,index)=>{

            if(output.id == props.id){

                output.status=status
            }
            return output;
        })

        dispatch({type:'GET_ALL_USER_LIST',payload:listCopy})

    }

    return(
        
        <div className="container form-group mt-5">
            <div className="row">
                <div className="col-xl-8 col-md-6 col-12" style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>    
                    <ProfileHeader title="Profile"/>
                    <ProfileTxtLabel label={props.name}/>
                    <ProfileTxtLabel label={props.profile}/>
                    <br></br>
                    <div className="col-xl-4 p-0 pc-show">
                        <Button btn={btn} onclick={requestFriend}/>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6 col-12">
                    <div className="text-center friend-profile">
                        <img src={props.icon} className="w-100"/>
                    </div>
                </div>
            </div>
            <div className="row  pc-none">
                <div className="offset-3 col-6 p-0 mt-5">
                    <Button btn={btn} onclick={requestFriend}/>
                </div>
            </div>
        </div>
        
    )
    
}
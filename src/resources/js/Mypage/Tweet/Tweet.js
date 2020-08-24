import React, { useState, useContext,Fragment  } from 'react';
import {PageHeaderTitle as HeaderTitle,PageHeaderSubTitle as HeaderSubTitle} from '../../Common/PageHeader';
import {InputTweetTxt} from '../../Common/InputTxt';
import {CanvasImage} from '../../Common/CanvasImage';
import {Button} from '../../Common/Button';
import axios from "axios";
import {RadioGroup, Radio} from 'react-radio-group'
import {Store,Provider} from '../../components/store'

export const Tweet = () => {

    const {state, dispatch} = useContext(Store)　//store参照
    const [message,setMessage] = useState("")  //テキストボックス入力値
    const [image,setImage] = useState("") //画像
    const [errorMessage,setErrorMessage]=useState("")
    const [errorImage,setErrorImage]=useState("")
    const [selectedMenu,setSelectedMenu] = useState("profile")

    const button=[['投稿','btn-active','none'],
                    ['投稿中','btn-lock','loading'],
                    ['投稿済み','btn-lock','check'],
                    ['投稿失敗','btn-active','miss']];
    const [btn,setButton] = useState(button[0])

    //投稿
    function postTweet(){

        var errorFlg =[]

        //本文のバリデーションチェック
        if(message == ""){
            errorFlg.push(true)
            setErrorMessage("本文は入力必須です");

        }else if(message.length > 20){
            errorFlg.push(true)
            setErrorMessage("本文は250文字以下で入力してください");        
        }else{
            setErrorMessage("");
        }

        //挿入画像のバリデーションチェック
        if(image==""){
            errorFlg.push(true)
            setErrorImage("画像は挿入必須です");
        }else{
            setErrorImage("");
        }

        //エラーフラグが立っていれば、処理を中断
        if(errorFlg.includes(true)){
            return;
        }else{
            //グループ申請
            setButton(button[1])

            axios
                .post('/TimeLine/post',{
                    message:message,
                    image:image,
                })
                .then((res) => {

                    setButton(2)

                })
                .catch(error => {
                    setButton(3)
                })
        }


    }
    function handleChange(value){
        setSelectedMenu(value);
    }
    return(
        <div className="container mb-0 form-group h-100" style={{position: "relative"}}>
            <HeaderTitle title="Tweet"/>
            <HeaderSubTitle title="新しい名言をまた一つ生み出そうか"/>
            <div className="row" style={{height:"60%"}}>
                <div className={`col-sm-6 col-xl-8 col-12 visibleProfile-${selectedMenu}`}>    
                    <InputTweetTxt
                        value={message} 
                        onChange={()=>setMessage(event.target.value)}
                    />
                </div>
                <div className={`col-sm-6 col-xl-4 col-12 p-0 visibleImage-${selectedMenu}`}>
                    <CanvasImage setImage={setImage}/>
                </div>
            </div>
            <div className="row  pc-none">
                <div className="offset-3 col-6 p-0 mt-3">
                    <RadioGroup Component="radio-group" selectedValue={selectedMenu} onChange={handleChange}>
                        <label className={`radio-mark mark-profile-${selectedMenu}`}>
                            <Radio value="profile"/>
                        </label>
                        <label className={`radio-mark mark-image-${selectedMenu}`}>
                            <Radio value="image"/>
                        </label>
                    </RadioGroup>
                </div>
            </div>
            <br></br>
            <div className="row">
                <div className="error-txt text-center w-100">
                    {errorMessage}<p>{errorImage}</p>
                </div>
            </div>    
            <div className="row">
                <div className="mt-5 offset-3 col-6 offset-sm-4 col-sm-4">
                    <Button btn={btn} onclick={postTweet}/>
                </div>
            </div>
        </div>
    )
}
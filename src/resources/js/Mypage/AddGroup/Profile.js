import React, { useState, useContext  } from 'react';
import {PageHeaderTitle as HeaderTitle,PageHeaderSubTitle as HeaderSubTitle} from '../../Common/PageHeader';
import {ProfileHeader} from '../../Common/ProfileHeader';
import {InputNameTxt,InputProfileTxt} from '../../Common/InputTxt';
import {CanvasImage} from '../../Common/CanvasImage';
import {Button} from '../../Common/Button';
import axios from "axios";
import {RadioGroup, Radio} from 'react-radio-group'

export const AddGroupProfile = (props) => {


    const [nameValue,setNameValue] = useState("")  //テキストボックス入力値
    const [profileValue,setProfileValue] = useState("")  //テキストボックス入力値
    const [image,setImage] = useState("") //プロフィール画像
    const [errorName,setErrorName]=useState("")
    const [errorProfile,setErrorProfile]=useState("")
    const [errorImage,setErrorImage]=useState("")
    const [selectedMenu,setSelectedMenu] = useState("profile")

    const button=[['作成','btn-active','none'],
                    ['作成中','btn-lock','loading'],
                    ['作成済み','btn-lock','check'],
                    ['作成失敗','btn-active','miss']];
    const [btn,setButton] = useState(button[0])

    //グループ申請
    function requestGroup(){

        var errorFlg =[]

        //名前のバリデーションチェック
        if(nameValue == ""){
            errorFlg.push(true)
            setErrorName("名前は入力必須です");

        }else if(nameValue.length > 20){
            errorFlg.push(true)
            setErrorName("名前は20文字以下で入力してください");        
        }else{
            setErrorName("");
        }

        //一言メッセージのバリデーションチェック
        if(profileValue.length > 20){
            errorFlg.push(true)
            setErrorProfile("メッセージは20文字以下で入力してください"); 
        }else{
            setErrorProfile("");
        }

        //挿入画像のバリデーションチェック
        if(image==""){
            errorFlg.push(true)
            setErrorImage("アイコンは必須入力です");
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
                .post('/AddGroup/post',{
                    name:nameValue,
                    profile:profileValue,
                    icon:image,
                    to_user_id:props.selected
                })
                .then((res) => {

                    setButton(button[res.data])

                })
                .catch(error => {
                    console.log(error)
                    setButton(button[error])
                })
        }


    }
    function handleChange(value){
        setSelectedMenu(value);
    }
    return(
        <div className="container form-group h-100">
            <HeaderTitle title="Add-Group"/>
            <HeaderSubTitle title="グループのプロフィールを設定しましょう"/>
            <div className="row" style={{height:"60%"}}>
                <div className={`col-xl-8 col-md-6 col-12 visibleProfile-${selectedMenu}`}  style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>    
                    <ProfileHeader title="Profile"/>
                    <InputNameTxt 
                        value={nameValue} 
                        onChange={()=>setNameValue(event.target.value)}
                        error={errorName}
                    />
                    <InputProfileTxt
                        value={profileValue} 
                        onChange={()=>setProfileValue(event.target.value)}
                        error={errorProfile}
                        errorImage={errorImage}
                    />
                    <br></br>
                    <div className="col-xl-4 p-0 pc-show">
                        <Button btn={btn} onclick={requestGroup}/>
                    </div>
                </div>
                <div className={`col-xl-4 col-md-6 col-12 p-0 visibleImage-${selectedMenu}`}>
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
                    <div className="mt-5">
                        <Button btn={btn} onclick={requestGroup}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
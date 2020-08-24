import React, { useState, useContext,Fragment  } from 'react';
import {PageHeaderTitle as HeaderTitle,PageHeaderSubTitle as HeaderSubTitle} from '../../Common/PageHeader';
import {ProfileHeader} from '../../Common/ProfileHeader';
import {InputNameTxt,InputProfileTxt} from '../../Common/InputTxt';
import {CanvasImage} from '../../Common/CanvasImage';
import {Button} from '../../Common/Button';
import axios from "axios";
import {RadioGroup, Radio} from 'react-radio-group'
import {Store,Provider} from '../../components/store'

export const Option = () => {

    const {state, dispatch} = useContext(Store)　//store参照
    const [nameValue,setNameValue] = useState(state.intervalGetData.me[0].name)  //テキストボックス入力値
    const [profileValue,setProfileValue] = useState((state.intervalGetData.me[0].profile == null ? "":state.intervalGetData.me[0].profile))  //テキストボックス入力値
    const [image,setImage] = useState(state.intervalGetData.me[0].icon) //プロフィール画像
    const [errorName,setErrorName]=useState("")
    const [errorProfile,setErrorProfile]=useState("")
    const [errorImage,setErrorImage]=useState("")
    const [selectedMenu,setSelectedMenu] = useState("profile")

    const button=[['変更','btn-active','none'],
                    ['変更中','btn-lock','loading'],
                    ['変更済み','btn-active','check'],
                    ['変更失敗','btn-active','miss']];
    const [btn,setButton] = useState(button[0])

    //自身のデータ変更
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
                .post('/Option/post',{
                    name:nameValue,
                    profile:profileValue,
                    image:image,

                })
                .then((res) => {

                    setButton(button[2])

                })
                .catch(error => {

                    setButton(button[3])
                })
        }


    }
    function handleChange(value){
        setSelectedMenu(value);
    }
    return(
        <div className="container form-group h-100">
            <HeaderTitle title="Option"/>
            <HeaderSubTitle title="プロフィールを編集することができます"/>
            <div className="row" style={{height:"60%"}}>
                <div className={`col-sm-6 col-md-8 col-12 visibleProfile-${selectedMenu}`}>    
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
                <div className={`col-sm-6 col-md-4 col-12 p-0 visibleImage-${selectedMenu}`}>
                    <CanvasImage 
                        setImage={setImage}
                        initialImage={image}
                    />
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
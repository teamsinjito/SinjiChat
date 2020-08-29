import React, { useState, useContext,Fragment  } from 'react';
import {Button} from '../../Common/Button';
import { motion } from "framer-motion";
import FileInputComponent from 'react-file-input-previews-base64'
import { withRouter,useHistory } from 'react-router';
import axios from "axios";

const button=[['追加','btn-active','none'],
            ['追加中','btn-lock','loading'],
            ['追加済み','btn-active','check'],
            ['追加失敗','btn-active','miss']];
const backButton=[['戻る','btn-active','none'],
                ['戻る','btn-lock','none']];
const EditIcon = () => {
    const [error,setError]=useState("");
    const [btn,setButton] = useState(button[0]);
    const [backBtn,setBackBtn]=useState(backButton[0]);
    const [icon,setIcon]=useState([]);
    const history = useHistory();

    function setInputIcon(file){
        var newIcons=[];
        file.map((f,index)=>{
            newIcons = newIcons.concat(f.base64);

        });
        setIcon(newIcons);
    }
    function postNewIcon(){
        setError("")
        //未入力の場合
        if(icon.length==0){
            
            setError("アイコンは入力必須です")

            return

        }
        console.log(icon)
        setButton(button[1])
        setBackBtn(backButton[1])

        axios
            .post('/Admin/post/new/icon',{

                icon:icon

            })
            .then((res) => {

                setButton(button[2]);
                setBackBtn(backButton[0])

            })
            .catch(error => {

                setError(error)
                setButton(button[3])
                setBackBtn(backButton[0])
            })
    }
    function backPage(){
        history.push("/");
    }
    return(
        <motion.div
            animate={{x: 0,opacity: 1}}
            initial={{x: 100,opacity: 0}}
            exit={{x: -100,opacity: 0}}
            transition={{duration: 0.2}}
            className="h-100"
        >
            <div className="row" 
                style={{height:"80%",display:"flex",alignItems:"center",position:"relative"}}
            >
                <p className="profile-label txt_M col-12">新しいユーザアイコンを追加してください</p>
                <div className="error-txt position-error-txt text-center w-100">
                    {error}
                </div>

                <div className="col-12" style={{position:"absolute"}}>
                {icon.map((i,index)=>
                    <p key={index}>{i.name}</p>
                )}
                <FileInputComponent
                    labelStyle={{display:"none"}}//ラベルは不要なので非表示にする
                    parentStyle={{}} //スタイル
                    multiple={true} //複数ファイル選択
                    imagePreview={true} //ファイルのプレビュー
                    accept="image/*" //許可するファイルのtype
                    callbackFunction={file => { //選択後のコールバック関数 
                        setInputIcon(file);
                            
                        
                    }}
                    buttonComponent={ //クリック時に選択ダイアログを開くコンポーネント

                                <i className="far fa-plus-square inputImg" style={{position:"absolute"}}></i>                            
                    }
                />
                </div>
                <div className="offset-sm-2 col-sm-4 col-6">

                    <Button btn={backBtn} onclick={backPage}/>

                </div>
                <div className="col-sm-4 col-6">

                    <Button btn={btn} onclick={postNewIcon}/>

                </div>
            </div>
            
        </motion.div>

    )
};

export default withRouter(EditIcon)
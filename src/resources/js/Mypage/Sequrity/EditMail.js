import React, { useState } from 'react';
import {Button} from '../../Common/Button';
import {InputMailTxt} from '../../Common/InputTxt';
import { motion } from "framer-motion";
import { withRouter,useHistory } from 'react-router';
import axios from "axios";

const button=[['変更','btn-active','none'],
            ['変更中','btn-lock','loading'],
            ['変更済み','btn-active','check'],
            ['変更失敗','btn-active','miss']];
const backButton=[['戻る','btn-active','none'],
                ['戻る','btn-lock','none']];
const EditMail = () => {
    const [value,setValue]= useState("");
    const [error,setError]=useState("");
    const [btn,setButton] = useState(button[0]);
    const [backBtn,setBackBtn]=useState(backButton[0]);
    const history = useHistory();

    function postNewMail(){
        setError("")
        //未入力の場合
        if(value==""){
            
            setError("メールアドレスは入力必須です")

            return

        }else if(value.length >60){

            setError("メールアドレスは60文字以下で入力してください")

            return
        }

        setButton(button[1])
        setBackBtn(backButton[1])

        axios
            .post('/Sequrity/post/new/mail',{

                email:value

            })
            .then((res) => {

                setButton(button[2]);
                setBackBtn(backButton[0])

            })
            .catch(error => {

                setError(error.response.data.errors.email)
                setButton(button[3])
                setBackBtn(backButton[0])
            })
    }
    function backPage(){
        history.push("/preedit/mail");
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
                <p className="profile-label txt_M col-12">新しいメールアドレスを入力してください</p>
                <div className="error-txt position-error-txt text-center w-100">
                    {error}
                </div>

                <div className="offset-sm-3 col-sm-6 col-12" style={{position:"relative"}}>

                    <InputMailTxt 
                        value={value} 
                        onChange={()=>setValue(event.target.value)}
                    />
                </div>
                <div className="offset-sm-2 col-sm-4 col-6">

                    <Button btn={backBtn} onclick={backPage}/>

                </div>
                <div className="col-sm-4 col-6">

                    <Button btn={btn} onclick={postNewMail}/>

                </div>
            </div>
            
        </motion.div>

    )
};

export default withRouter(EditMail)
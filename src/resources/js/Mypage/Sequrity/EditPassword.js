import React, { useState } from 'react';
import {Button} from '../../Common/Button';
import {InputPassTxt} from '../../Common/InputTxt';
import { motion } from "framer-motion";
import { withRouter,useHistory } from 'react-router';
import axios from "axios";

const button=[['次へ','btn-active','none'],
            ['次へ','btn-lock','loading']]
const backButton=[['戻る','btn-active','none'],
                ['戻る','btn-lock','none']];

const EditPassword = () => {
    const [value,setValue]= useState("");
    const [error,setError]=useState("");
    const [btn,setButton] = useState(button[0]);
    const [backBtn,setBackBtn]=useState(backButton[0]);
    const history = useHistory();

    function postNewValid(){
        setError("")
        //未入力の場合
        if(value==""){
            
            setError("パスワードは入力必須です")

            return

        }else if(value.length >60){

            setError("パスワードは60文字以下で入力してください")

            return

        }else if(value.length < 8){

            setError("パスワードは8文字以上で入力してください")

            return
        }

        setButton(button[1])
        setBackBtn(backButton[1])

        axios
            .post('/Sequrity/post/new/valid',{

                password:value

            })
            .then((res) => {

                history.push('/confirm/password')

            })
            .catch(error => {

                setError(error.response.data.errors.password)
                setButton(button[0])
                setBackBtn(backButton[0])
            })
    }
    function backPage(){
        history.push("/preedit/password");
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
                <p className="profile-label txt_M col-12">新しいパスワードを入力してください</p>
                <div className="error-txt position-error-txt text-center w-100">
                    {error}
                </div>

                <div className="offset-sm-3 col-sm-6 col-12" style={{position:"relative"}}>

                    <InputPassTxt 
                        value={value} 
                        onChange={()=>setValue(event.target.value)}
                    />
                </div>
                <div className="offset-sm-2 col-sm-4 col-6">

                    <Button btn={backBtn} onclick={backPage}/>

                </div>
                <div className="col-sm-4 col-6">

                    <Button btn={btn} onclick={postNewValid}/>

                </div>
            </div>
            
        </motion.div>

    )
};

export default withRouter(EditPassword)
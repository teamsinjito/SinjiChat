import React, { useState, useContext,Fragment  } from 'react';
import {Button} from '../../Common/Button';
import {InputPassTxt} from '../../Common/InputTxt';
import { withRouter,useHistory } from 'react-router';
import { motion } from "framer-motion";
import axios from "axios";

const button=[['次へ','btn-active','none'],
                ['次へ','btn-lock','loading']];
const backButton=[['戻る','btn-active','none']];
const PreEditMail = () => {
    const [value,setValue]= useState("");
    const [error,setError]=useState("");
    const [btn,setButton] = useState(button[0])
    const history = useHistory();

    function checkPass(){
        setButton(button[1])

        axios
            .post('/Sequrity/post/match',{

                password:value

            })
            .then((res) => {
                if(res.data==0){
                    history.push('/edit/password')

                }else{
                    setError('パスワードが一致しません')
                }
                setButton(button[0]);


            })
            .catch(error => {

                setError('パスワードが一致しません')
                setButton(button[0])

            })
    }

    function backPage() {
        history.push('/')
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
                <p className="profile-label txt_M col-12">現在のパスワードを入力してください</p>
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

                    <Button btn={backButton[0]} onclick={backPage}/>

                </div>
                <div className="col-sm-4 col-6">

                    <Button btn={btn} onclick={checkPass}/>

                </div>
            </div>
            
        </motion.div>

    )
};

export default withRouter(PreEditMail)
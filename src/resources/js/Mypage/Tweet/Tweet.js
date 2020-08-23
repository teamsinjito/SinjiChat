import React, { Component} from 'react';
import ReactDOM from "react-dom";
import {PageHeaderTitle as HeaderTitle,PageHeaderSubTitle as HeaderSubTitle} from '../../Common/PageHeader';
import FileInputComponent from 'react-file-input-previews-base64';
import {Button} from '../../Common/Button';
import axios from "axios";
import { ajaxTransport } from 'jquery';
import {RadioGroup, Radio} from 'react-radio-group'

//psql -U admin sinjichat

//登録ボタン設定値
const button=[['呟く','btn-active','none'],
                ['呟き中','btn-lock','loading'],
                ['呟き済','btn-lock','check'],
                ['申請失敗','btn-active','miss']];

const errorMessage=['本文は入力必須です',
                    '本文は250文字以下で入力してください',
                    '画像は挿入必須です',
                    ];

const canvasWidth = "368";
const canvasHeight = "554";


export class Tweet extends React.Component{

    //コンストラクタが必要
    //ここでボタンの初期表示を設定する必要がある
    //requestTweetをOnclickで呼び出すためにbindしている？
    constructor(props){
        super(props);
        this.requestTweet=this.requestTweet.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state={
            status:button[0],
            tweetHonbun:null,
            tweetImage:null,
            textCount:0,
            errorLavelText:"",
            errorLavelImage:"",
            selectedValue: 'text',
            // selectedMenu:'text',
        }
    }

    requestTweet(){
        //入力値取得
        this.state.tweetHonbun = document.getElementById('honbun').value;
        this.state.textCount = document.getElementById('honbun').value.length;

        //エラー判定フラグ
        var errorChecker = false;

        //エラーメッセージ初期化(前回分をリセットする)
        this.setState({errorLavelText:""});
        this.setState({errorLavelImage: ""});

        //要素チェック1(本文入力確認)
        if(this.state.tweetHonbun == ""){
            this.setState({errorLavelText: errorMessage[0]});
            errorChecker = true;
            console.log(this.state.errorLavelText);
        }
        //要素チェック2(本文文字数確認)
        else　if(this.state.textCount > 250){
            this.setState({errorLavelText: errorMessage[1]});
            errorChecker = true;
            console.log(this.state.errorLavelText);
        }
        //要素チェック3(画像入力確認)
        if(this.state.tweetImage == null){
            this.setState({errorLavelImage: errorMessage[2]});
            errorChecker = true;
            console.log(this.state.errorLavelImage);
        }

        //フラグが立っている時、エラー要素があるので処理を落とす
        if(errorChecker == true){
            return;
        }

        //ここまで来たらエラーはないのでaxiosでPOST処理を行う
        //ここで申請中ボタンに切り替えている
        //この処理を行うとrender処理が走る(差分描画のみ行う)
        this.setState({status: button[1]})
        axios
            //POST処理
            //(入力したTweet内容を引数で投げる) 
            .post('/TimeLine/post',{
                message:this.state.tweetHonbun,
                image:this.state.tweetImage
            })
            //res：返り値(Modelでretarnで指定している値)
            .then((res) => {
                console.log("STATUS_CODE:"+res.data)
                this.setState({status: button[res.data]})
            })
                //error：コントロール側でcatchした際に戻ってくる値
            .catch(error => {
                console.log("STATUS_CODE*"+error)
                this.setState({status: button[error]})
            })
    }

    handleChange(value) {
        console.log(value);
        this.setState({selectedValue: value});
        // this.setState({selectedMenu: value});

        //選択した値によって表示項目を切り替える
        if(value == "text"){
            document.getElementById("canvas-area").style.display ="none";
            document.getElementById("input-area").style.display ="block";
        }
        else{
            document.getElementById("canvas-area").style.display ="block";
            document.getElementById("input-area").style.display ="none";
        }
    }

    bgImgSet(file){        
        // var bgImg = new Image();
        // var context = this.refs.canvas.getContext('2d');
        // var canvas = this.refs.canvas;

        // bgImg.onload = function () {
        //     context.clearRect(0, 0, canvas.width, canvas.height);
        //     context.globalCompositeOperation = 'source-over';
        //     context.drawImage(bgImg,(canvasWidth-bgImg.width)/2,(canvasHeight-bgImg.height)/2, bgImg.width, bgImg.height);
        // };
        // bgImg.src = file.base64;
        var elem = document.getElementById("previewImage");
        elem.src = file.base64;
    }

    render(){
        return(
            //①「container」はあってもなくてもOK　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
            //全体的に真ん中に寄る感じ
            //rowは内包する要素を横並びにする役割を担っている
            //レスポンシブの根幹を担っているのはcol-??-?
            //　→デバイスサイズごとに設定する必要がある
            //「xl」だと大体macbookぐらい
            //今回はxl以外に別デバイス用の設定が必要でそれがcol-12
            <div className="container form-group mt-5 tweet-area h-100">
                {/* //タイトル */}
                <HeaderTitle title="Tweet"/>
                <HeaderSubTitle title="新しい名言をまた一つ生み出そうか"/>
                
                <div className="row">
                    <div id="input-area" className="col-xl-8 col-12 input-area">
                        <textarea id="honbun" rows="10" cols="80" placeholder="本文を入力・・・"/>
                        <br></br>
                        <div className="offset-4 col-xl-4 p-0 pc-show">
                            
                            {/* 送信ボタン */}
                            <Button btn={this.state.status} onclick={this.requestTweet}/>
                            <div id="errorLabelText" className="error-message">{this.state.errorLavelText}</div>
                            <div id="errorLabelImage" className="error-message">{this.state.errorLavelImage}</div>
                        </div>
                    </div>

                    <div id="canvas-area" className="col-xl-4 col-10 canvas-area-tweet p-0  phone-layout">   
                        <FileInputComponent
                            labelStyle={{display:"none"}}//ラベルは不要なので非表示にする
                            imageStyle={{height:"100%"}}//プレビュー画像に付与するスタイル情報
                            parentStyle={{}} //スタイル
                            imagePreview={false} //ファイルのプレビュー
                            multiple={false} //複数ファイル選択
                            callbackFunction={file => { //選択後のコールバック関数
                                console.log(file)
                                this.setState({tweetImage: file.base64});
                                this.bgImgSet(file); 
                            }}
                            buttonComponent={ //クリック時に選択ダイアログを開くコンポーネント
                                <div className="img-wrapper">
                                    <div className="img-block">

                                        <img id="tweetImage" className="inputImg" border="1" src="/img/upload.png"></img>                                
                                    </div>
                                </div>
                            }
                            accept="image/*" //許可するファイルのtype
                        />
                        <img id="previewImage" className="previewImage"></img>
                        {/* <div className="w-100 canvas-inner-wrapper">
                            <canvas
                                ref="canvas"
                                width={canvasWidth + "px"} 
                                height={canvasHeight + "px"}
                                className="canvas-inner"
                            />
                        </div> */}
                    </div>
                </div> 

                {/* ★★★ここのdiv要素はスマートフォンの時のみ表示する要素 */}
                {/* 送信ボタンとエラーラベル */}
                <div className="col-xl-4 col-12 pc-none">
                    {/* ラジオボタン(スマホ時入力項目切替用) */}

                    <RadioGroup className="changeRadio" selectedValue={this.state.selectedValue} onChange={this.handleChange}>
                        <Radio value="text" />本文
                        <Radio value="image" />画像
                    </RadioGroup>

                    {/* <div className="offset-3 col-6 p-0 mt-3">
                    <RadioGroup Component="radio-group" className="changeRadio" selectedValue={this.state.selectedValue} onChange={this.handleChange}>
                        <label className={`radio-mark mark-profile-${this.state.selectedMenu}`}>
                            <Radio value="text"/>本文
                        </label>
                        <label className={`radio-mark mark-image-${this.state.selectedMenu}`}>
                            <Radio value="image"/>画像
                        </label>
                    </RadioGroup>
                    </div> */}

                    {/* エラーメッセージラベル */}
                    <div id="errorLabelText" className="error-message">{this.state.errorLavelText}</div>
                    <div id="errorLabelImage" className="error-message">{this.state.errorLavelImage}</div>

                    {/* 送信ボタン */}
                    <Button btn={this.state.status} onclick={this.requestTweet}/>
                </div>
            </div>
        );  
    }
}
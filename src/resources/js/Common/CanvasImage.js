import React,{ useState, useContext,useRef,useEffect, Fragment } from 'react';
import FileInputComponent from 'react-file-input-previews-base64'

export const CanvasImage = (props) => {

    const canvasWidth = "368";
    const canvasHeight = "554";
    const canvasRef = useRef(null);

    function bgImageSet(file){
        var bgImg = new Image();
        var context = canvasRef.current.getContext('2d');
        var canvas = canvasRef.current;
        context.clearRect(0, 0, canvas.width, canvas.height);

        bgImg.onload = function () {
            context.globalCompositeOperation = 'source-over';
            console.log(bgImg.width);
            console.log(bgImg.height);
            // context.drawImage(bgImg,(canvasWidth-bgImg.width)/2,(canvasHeight-bgImg.height)/2, bgImg.width, bgImg.height);
            context.drawImage(bgImg,0,0, canvas.width, canvas.height);
        };
        bgImg.src = file.base64;

        //挿入した画像を格納
        props.setImage(file.base64);

    }

    return(
        <div className="canvas-area">
            <FileInputComponent
                labelStyle={{display:"none"}}//ラベルは不要なので非表示にする
                parentStyle={{}} //スタイル
                imagePreview={false} //ファイルのプレビュー
                multiple={false} //複数ファイル選択
                callbackFunction={file => { //選択後のコールバック関数         
                    bgImageSet(file); 
                }}
                buttonComponent={ //クリック時に選択ダイアログを開くコンポーネント
                    <div className="img-wrapper">
                        <div className="img-block">
                            <i className="far fa-plus-square inputImg"></i>                            
                        </div>
                    </div>
                }
                accept="image/*" //許可するファイルのtype
            />
            <div className="w-100 h-100 canvas-inner-wrapper">
                <canvas
                    ref={canvasRef}
                    className="canvas-inner w-100 h-100"
                />
            </div>
        </div>
    )
}


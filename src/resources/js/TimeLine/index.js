import React,{ useState, useContext, useEffect,Fragment } from 'react';
import {PageHeaderTitle as HeaderTitle,PageHeaderSubTitle as HeaderSubTitle} from '../Common/PageHeader';
import axios from "axios";
import ImageList from '../Common/ImageList';
import {Loading} from '../Common/Loading';
import Slider from "react-slick";
import {Store,Provider} from '../components/store'

export const TimeLineIndex = () => {

    const {state, dispatch} = useContext(Store)　//store参照
    
    const [value,setValue] = useState([])  //ツイートデータ
    const [message,setMessage] =useState(<Loading h="h-75" text="タイムライン取得中..."/>)

    const [selectedMenu,setSelectedMenu] = useState("profile")
    const [firstOrder,setFirstOrder] = useState(false)
    const [loadingFlg,setLodingFlg] = useState(false)


    //初期処理(最新データ10件を取得)
    useEffect(() => {
        axios
            .get('/TimeLine/get')
            .then((res) => {
                if(res.data.length > 0){
                    setValue(res.data)

                }else{
                    setMessage('ハートを動かす名言達がまだありません')
                }
                setFirstOrder(true);
            })
            .catch(error => {
                console.log(error)
                setMessage(error)
                setFirstOrder(true);
            })
    },[]);
    
    const settings={
        className: "center",
        infinite: false,
        slidesToShow: 1,
        swipeToSlide: true,
        afterChange: current => getOldData(current),
    }

    //最新データを都度取得
    useEffect(()=>{

        if(firstOrder){
            
            while(loadingFlg){

            }

            setLodingFlg(true);

            //配列を結合
            const concatTimeLine=state.intervalGetData.timeLine.concat(value);
            
            //重複しているタイムラインデータを除外
            let tempAry=[];
            let newTimeLine = concatTimeLine.filter(item=>{
                if(tempAry.indexOf(item.id)==-1){
                    tempAry.push(item.id);
                    return item;
                }
            })

            setValue(newTimeLine);

            setLodingFlg(false);
        }
    },[state.intervalGetData.timeLine])

    function handleChange(value){
        setSelectedMenu(value)
    }

    function getOldData(f){

        //最古ページが表示された場合、古いデータ10件をとってくる
        if(value.length - 1 == f){

            //intervalgetdataによる更新と処理が重なると整合性が合わないので、
            //loadingFlgを立てる
            while(loadingFlg){

            }

            setLodingFlg(true);

            const currentId = value[f].id;

            //タイムラインテーブルにまだ古いデータがある場合
            if(currentId > 1){

                //データ取得
                axios
                .get('/TimeLine/old/get',{
                    params: {

                        id:currentId
                    }
                    
                })
                .then((res) => {
                    if(res.data.length > 0){

                        const newTimeLine = value.concat(res.data);
                        setValue(newTimeLine)
    
                    }
                })
                .catch(error => {
                    console.log("Error:"+error)

                })
            }
            setLodingFlg(false);
        }
    }

    return(
        <Fragment>
            <div className="timeline-area h-100" name="/TimeLine">                 
                <HeaderTitle title="TimeLine"/>
                <HeaderSubTitle title="ハートを動かす名言達があります!!!"/>
                {value.length > 0 ?
                    <Fragment>

                        <div className="list-container">
                            <Slider {...settings}>
                            {value.map((list,index)=>
                                <ImageList 
                                    listElement={list} 
                                    menu='TimeLine' 
                                    key={index}
                                    index={index}
                                    selectedMenu={selectedMenu}
                                    method={handleChange}

                                />
                            )}
                            </Slider>
                        </div>
                    </Fragment>
                : <em>{message}</em>
                }
            </div>
        </Fragment>
    );
}

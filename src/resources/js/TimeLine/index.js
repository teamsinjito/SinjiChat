import React,{ useState, useContext, useEffect,Fragment } from 'react';
import {PageHeaderTitle as HeaderTitle,PageHeaderSubTitle as HeaderSubTitle} from '../Common/PageHeader';
import axios from "axios";
import ImageList from '../Common/ImageList';
import Slider from "react-slick";
import {Store,Provider} from '../components/store'

export const TimeLineIndex = () => {

    //**************************************************************
    //変数・定数宣言部
    //**************************************************************
    const {state, dispatch} = useContext(Store)　//store参照
    
    const [value,setValue] = useState([])  //ツイートデータ
    const [message,setMessage] =useState('Loading...')

    const [view,setView] =useState(false)
    const [openDom,setDom]=useState("") //プロフィール画面DOM
    const [selectUserId,setSelectUserId] = useState([])

    var timeLineData=[];

    //**************************************************************
    //初期処理(最新データ10件を取得)
    //**************************************************************
    useEffect(() => {
        axios
            .get('/TimeLine/get')
            .then((res) => {
                if(res.data.length > 0){
                    setValue(res.data)
                    timeLineData = res.data

                    console.log(res.data)
                    console.log(timeLineData.length)
                }else{
                    setMessage('※ データが0件です')
                }
            })
            .catch(error => {
                console.log(error)
                setMessage(error)
            })
    },[]);

    function handleChange(){

    }

    //**************************************************************
    //描画処理
    //**************************************************************
    return(
        <Fragment>
            <div className="timeline-area h-100">                 
                <HeaderTitle title="TimeLine"/>
                <HeaderSubTitle title="ハートを動かす名言達があります"/>
                {value.length > 0 ?
                    <Fragment>
                        {/* タイムラインスライダー */}
                        <div className="list-container">
                            <Slider {...state.swipeSettingTimeLine}>
                            {value.map((list,index)=>
                                <ImageList 
                                    listElement={list} 
                                    menu='TimeLine' 
                                    key={index}
                                    index={index}
                                    selectedMenu="profile"
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
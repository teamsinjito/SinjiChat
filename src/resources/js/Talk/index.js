import React,{ useState, useContext, Fragment } from 'react';
import {PageHeaderTitle as HeaderTitle,PageHeaderSubTitle as HeaderSubTitle} from '../Common/PageHeader';
import {InputFilterTxt} from '../Common/InputTxt';
import ImageList from '../Common/ImageList';
import Slider from "react-slick";
import Rodal from 'rodal';
import {Talk} from './Talk';

import {Store,Provider} from '../components/store'

export const TalkIndex = () => {

    const {state, dispatch} = useContext(Store)　//store参照
    const [value,setValue] = useState("")  //テキストボックス入力値
    const [view ,setView] = useState(false) //トーク画面表示フラグ
    const [openDom,setDom]=useState("") //トーク画面DOM

    //トーク表示
    function openModal(e){

        document.body.setAttribute('style', 'overflow: hidden;');
        //Domを構築
        setDom(<Talk 
            index={e.currentTarget.attributes.getNamedItem('data-index').value}
            />
        )
        //トーク画面表示
        setView(true);
    }

    //トーク画面非表示
    function closeModal(){

        document.body.removeAttribute('style', 'overflow: hidden;')
        setDom("")
        //トーク画面非表示
        setView(false);

    }

    return (

        <Fragment>
            <div className="Talk-area h-100 mb-5" name="/Talk">
                {/* ヘッダー */}
                <HeaderTitle title="Talk"/>
                <HeaderSubTitle title="最高の友達と赴くままに語ろう"/>
                {state.intervalGetData.myFriendList.length > 0 ? 

                    <Fragment>
                        {/* テキストボックス */}
                        <InputFilterTxt 
                            value={value} 
                            onChange={()=>setValue(event.target.value)}
                        />
                        {/* 友達リスト */}
                        <div className="list-container">
                            <Slider {...state.swipeSetting}>
                            {state.intervalGetData.myFriendList.filter(listFilter => listFilter.name.includes(value)).map((list,index)=>
                                <ImageList 
                                    listElement={list} 
                                    menu='Talk' 
                                    key={index}
                                    index={index}
                                    onClick={openModal}
                                />
                            )}
                            </Slider>
                        </div>
                    </Fragment>
                    : <em>※ データが0件です</em>
                }        
            </div>

            {/* トーク画面 */}
            <Rodal
                visible={view}
                onClose={closeModal}
                animation="slideUp"
                className="modal2-area"
            >
                {openDom}
            </Rodal>
        </Fragment>

    );
}
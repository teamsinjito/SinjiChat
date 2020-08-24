import React, { useContext,useState } from 'react';
import {PageHeaderTitle as HeaderTitle,PageHeaderSubTitle as HeaderSubTitle} from '../Common/PageHeader';
import Slider from "react-slick";
import ImageList from'../Common/ImageList';
import {AddGroup} from './AddGroup/AddGroup';
import {AddFriend} from './AddFriend/AddFriend';
import {Tweet} from './Tweet/Tweet';
import {Option} from './Option/Option';
import Rodal from 'rodal';

import {Store,Provider} from '../components/store'


export const MypageIndex = () => {

    const {state, dispatch} = useContext(Store)　//store参照
    const[view,setView]=useState(false) //各種モーダル画面表示フラグ
    const[openDom,setDom]=useState("") //各種モーダル画面DOM

    //メニューリスト
    const list =[
        {icon:'/img/Tweet.png',name:'名言をタイムラインに投稿します',id:'menu1'},
        {icon:'/img/AddGroup.png',name:'トークグループを作成します',id:'menu2'},
        {icon:'/img/AddFriend.png',name:'友達申請メールを送ります',id:'menu3'},
        {icon:'/img/Option.png',name:'ユーザ情報を編集します',id:'menu4'},
        {icon:'/img/Security.png',name:'ログイン情報を編集します',id:'menu5'}
    ]

    //モーダル表示
    function openModal(e){
        const id = e.currentTarget.id;

        if(id=="menu1"){
            setDom(<Tweet/>)
        }else if(id=="menu2"){
            setDom(<AddGroup/>)
        }else if(id=="menu3"){
            setDom(<AddFriend/>)
        }else if(id=="menu4"){
            setDom(<Option/>)
        }else{
            setDom(<AddFriend/>)         
        }

        //モーダル表示
        setView(true);
        document.body.setAttribute('style', 'overflow: hidden;')

    }

    //モーダル非表示
    function closeModal() {

        setDom("")
        //モーダル非表示
        setView(false);
        document.body.removeAttribute('style', 'overflow: hidden;')

    }

    return (
        <div className="mypage-area h-100 mt-5" name="/Mypage">
            {/* ヘッダー */}
            <HeaderTitle title="MyPage"/>
            <br></br>
            <HeaderSubTitle title="幸せとは自分で掴み取るものさ"/>

            {/* 各リスト */}
            <div className="list-container">
                <Slider {...state.swipeSettingMyPage}>
                    {list.map((li,index)=>
                        <ImageList
                            listElement={li}
                            menu='MyPage'
                            key={index}
                            index={index}
                            onClick={openModal}
                        />
                    )}
                </Slider>
            </div>
            <hr></hr>

            {/* モーダル画面 */}
            <Rodal 
                visible={view}
                onClose={closeModal}
                animation="door"
                className="modal2-area"
                >
                {openDom}
            </Rodal>
        </div>
    );
}
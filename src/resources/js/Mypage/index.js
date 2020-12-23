import React, { useContext,useState,useEffect } from 'react';
import {PageHeaderTitle as HeaderTitle,PageHeaderSubTitle as HeaderSubTitle} from '../Common/PageHeader';
import Slider from "react-slick";
import ImageList from'../Common/ImageList';
import {AddGroup} from './AddGroup/AddGroup';
import {AddFriend} from './AddFriend/AddFriend';
import {Tweet} from './Tweet/Tweet';
import {Option} from './Option/Option';
import {Sequrity} from './Sequrity/Sequrity';
import {Admin} from './Admin/Admin';
import Rodal from 'rodal';
import {Store,Provider} from '../components/store'



export const MypageIndex = () => {

    const {state, dispatch} = useContext(Store)　//store参照
    const[view,setView]=useState(false) //各種モーダル画面表示フラグ
    const[openDom,setDom]=useState("") //各種モーダル画面DOM
    const admin ="administrator";
    //メニューリスト
    const [list,setList] =useState([
        {icon:'/img/Tweet.png',name:'名言をタイムラインに投稿します!',id:'menu1'},
        {icon:'/img/AddGroup.png',name:'トークグループを作成します',id:'menu2'},
        {icon:'/img/AddFriend.png',name:'友達申請メールを送ります',id:'menu3'},
        {icon:'/img/Option.png',name:'ユーザ情報を編集します',id:'menu4'},
        {icon:'/img/Security.png',name:'ログイン情報を編集します',id:'menu5'}
    ]);

    useEffect(() => {

        if(state.intervalGetData.me[0].admin == admin){

            var newList = list.concat({icon:'/img/Admin.png',name:'管理者画面を表示します',id:'menu6'});
            setList(newList);
        }

    },[])
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
        }else if(id=="menu5"){
            setDom(<Sequrity/>)         
        }else{
            setDom(<Admin/>)
        }

        //モーダル表示
        setView(true);
        document.body.setAttribute('style', 'overflow: hidden;')
        document.addEventListener( 'touchmove',scrollOff, false);

    }

    //モーダル非表示
    function closeModal() {
        history.replaceState('','','/')
        setDom("")

        //モーダル非表示
        setView(false);
        document.body.removeAttribute('style', 'overflow: hidden;')
        document.removeEventListener( 'touchmove', scrollOff, false );
    }

    var scrollOff = function( e ){
        e.preventDefault();
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
                className="modal-area"
                >
                {openDom}
            </Rodal>
        </div>
    );
}
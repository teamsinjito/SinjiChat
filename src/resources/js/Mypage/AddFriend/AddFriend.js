import React,{ useState, useContext, useEffect,Fragment } from 'react';
import {PageHeaderTitle as HeaderTitle,PageHeaderSubTitle as HeaderSubTitle} from '../../Common/PageHeader';
import axios from "axios";
import {InputFilterTxt} from '../../Common/InputTxt';
import ImageList from '../../Common/ImageList';
import {Loading} from '../../Common/Loading';
import Slider from "react-slick";
import {AddFriendProfile} from './Profile';
import Rodal from 'rodal';

import {Store,Provider} from '../../components/store'

export const AddFriend = () => {
    
    const {state, dispatch} = useContext(Store)　//store参照
    const [value,setValue] = useState("")  //テキストボックス入力値
    const [view,setView] =useState(false)
    const [openDom,setDom]=useState("") //プロフィール画面DOM
    const [message,setMessage] =useState(<Loading h="h-75" text="ユーザーリスト取得中..."/>)

    useEffect(() => {
        axios
            .get('/AddFriend/get')
            .then((res) => {
                if(res.data.length > 0){
                    dispatch({type:'GET_ALL_USER_LIST',payload:res.data})

                }else{
                    setMessage('※ データが0件です')
                }
    
            })
            .catch(error => {
                console.log(error)
            })

    },[]);
    
    //ユーザプロフィール表示
    function openModal(e){
        const index =e.currentTarget.attributes.getNamedItem('data-index').value

        document.body.setAttribute('style', 'overflow: hidden;');
        //Domを構築
        setDom(<AddFriendProfile 
                icon={state.allUser[index].icon}
                id={state.allUser[index].id}
                name={state.allUser[index].name}
                profile={state.allUser[index].profile}
                status={state.allUser[index].status}
            />
        )
        //ユーザプロフィール表示
        setView(true);
    }

    //ユーザプロフィール非表示
    function closeModal(){

        document.body.removeAttribute('style', 'overflow: hidden;')
        setDom("")
        //ユーザプロフィール非表示
        setView(false);

    }

    return(
        <Fragment>
            <div className="addfriend-area h-100">                 
                <HeaderTitle title="Add-Friend"/>
                <HeaderSubTitle title="人生を共に謳歌する最高の仲間を見つけよう"/>
                {state.allUser.length > 0 ?

                    <Fragment>
                        {/* テキストボックス */}
                        <InputFilterTxt 
                            value={value} 
                            onChange={()=>setValue(event.target.value)}
                        />
                        {/* 友達リスト */}
                        <div className="list-container">
                            <Slider {...state.swipeSetting}>
                            {state.allUser.filter(listFilter => listFilter.name.includes(value)).map((list,index)=>
                                <ImageList 
                                    listElement={list} 
                                    menu='AddFriend' 
                                    key={index}
                                    index={index}
                                    onClick={openModal}
                                />
                            )}
                            </Slider>
                        </div>
                    </Fragment>
                : <em>{message}</em>
                }
            </div>

            {/* プロフィール画面 */}
            <Rodal
                visible={view}
                onClose={closeModal}
                animation="slideUp"
                className="modal2-area flex-area"
            >
                {openDom}
            </Rodal>
        </Fragment>
    );
    
}
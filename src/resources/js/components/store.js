import React, {useReducer} from 'react'
import reducer from './reducer'
import res from './../../sass/_variables.scss';

const initialState={

    intervalGetData:{  

        myChatHistory:[], //チャット履歴
        myFriendList:[], //友達リスト
        request:[], //友達申請、グループ申請
        firstLoadFlg:true, //初期表示ローディングフラグ
    },
    
    allUser:[],//全ユーザリスト AddFriend用

    allMyFriend:[], //全友達リスト　AddGroup用

    postFlg:false, //データ送信中フラグ

    swipeSettingMyPage:{
        className: "center",
        infinite: false,
        slidesToShow: 3,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: parseInt(res.pad),
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: parseInt(res.phone),
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    },
    swipeSetting:{
        className: "center",
        infinite: false,
        slidesToShow: 4,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: parseInt(res.pad),
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: parseInt(res.phone),
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    }
}

const Store = React.createContext()

const Provider=({children})=>{

    const [state,dispatch]=useReducer(reducer,initialState)

    return <Store.Provider value={{state,dispatch}}>{children}</Store.Provider>

}


export {Store,Provider}
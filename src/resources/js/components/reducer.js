const reducer = (state = {}, action={}) => {

    switch(action.type) {
        case 'GET_INTERVAL_DATA':
            if(state.postFlg == false){
                return{
                    ...state,
                    intervalGetData:{
                        ...state.intervalGetData,
                        myFriendList:action.payload.friend,
                        myChatHistory:action.payload.talk,
                        request:action.payload.request,
                        firstLoadFlg:false,
                        me:action.payload.me,
                        timeLine:action.payload.timeLine,
                        newMessagesCnt:action.payload.newMessagesCnt

                    }
                }
            }
            
        case 'GET_ALL_USER_LIST':
            return{
                ...state,
                allUser:action.payload
            }

        case 'GET_ALL_MY_FRIEND_LIST':
            return{
                ...state,
                allMyFriend:action.payload
            }
        case 'GET_ALL_STAMP_LIST':
            return{
                ...state,
                allStamps:action.payload
            }
        case 'LOOK_AHEAD':
            var newMessage = state.intervalGetData.myChatHistory.concat([action.payload])

            return{
                ...state,
                postFlg:true, //データ送信中フラグ
                intervalGetData:{
                    ...state.intervalGetData,
                    myChatHistory:newMessage
                }
            }
        case 'END_SEND_TALK':
            return{
                ...state,
                postFlg:false
            }

        default:
            return state
    }
}

export default reducer
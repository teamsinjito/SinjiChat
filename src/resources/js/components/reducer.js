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
                        firstLoadFlg:false
                    }
                }
            }
            
        case 'GET_ALL_USER_LIST':
            return{
                ...state,
                allUser:action.payload
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
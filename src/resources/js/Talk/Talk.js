import React,{ useState, useContext,useRef,useEffect, Fragment } from 'react';
import Moment from 'moment';
import FileInputComponent from 'react-file-input-previews-base64'
import {Store,Provider} from '../components/store'

export const Talk = (props) =>{

    const [profileVisible,setProfileVisile]=useState('non-active')
    const [chatVisible,setChatVisile]=useState('show-active')
    const [stampOpen,setStampOpen]=useState('')
    const [value,setValue]=useState('')
    const [canSend,setCanSend]=useState(false)
    const [selectedStamp,setSelectedStamp]=useState('')
    const [stampPreview,setStampPreview]=useState('')
    const {state, dispatch} = useContext(Store)　//store参照
    const messagesEndRef = useRef(null)


    //トークリストに変更がある場合、既読フラグ更新処理が行われる
    useEffect(updateReadFlg, [state.intervalGetData.myChatHistory.filter(talkFilter => talkFilter.room_id==(friendData('id')))]);

    function visibleProfileArea(){

        setProfileVisile('show-active');
        setChatVisile('non-active');

    }

    function visibleChatArea(){

        setProfileVisile('non-active');
        setChatVisile('show-active');

    }

    //友達のデータを返す
    function friendData($attribute){
        if($attribute == 'icon'){
            return(
                state.intervalGetData.myFriendList[props.index].icon
            )
        }else if($attribute == 'id'){
            return(
                state.intervalGetData.myFriendList[props.index].id
            )
        }else if($attribute == 'name'){
            return(
                state.intervalGetData.myFriendList[props.index].name
            )
        }else if($attribute == 'new'){
            return(
                state.intervalGetData.myFriendList[props.index].new
            )
        }else if($attribute == 'profile'){
            return(
                state.intervalGetData.myFriendList[props.index].profile
            )
        }else if($attribute == 'status'){
            return(
                state.intervalGetData.myFriendList[props.index].status
            )
        }

    }
    //既読フラグ更新
    function updateReadFlg(){

        //新着メッセージがあれば実行
        if(friendData('new') > 0){

            axios
                .post('/Talk/upDateReadFlg',{
                    room_id:friendData('id')
                })
                .then((res) => {
                    
                    console.log("success:既読フラグ更新")
                    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })

                })
                .catch(error => {
                    console.log('error:既読フラグ更新 '+error)
        
                })
        }

    }

    function openStampList(){
        if(stampOpen==""){
            setStampOpen('stamp-open')
        }else{
            closeStampList()
        }
    }
    function closeStampList(){
        setStampOpen('')
        resetSelectedStamp()
    }
    function handleChange(event){
        setValue(event.target.value)
        if(event.target.value!=''){
            setCanSend(true)
        }else{
            setCanSend(false)
        }
    }

    function previewStamp(e){
        setSelectedStamp(e.currentTarget.src)
        setStampPreview('over-ray')
    }
    function resetSelectedStamp(){
        setSelectedStamp('')
        setStampPreview('')
    }

    //メッセージ送信
    function sendMessage(){
        if(value=='') return;

        const message = value;

        var newMessage ={room_id:friendData('id'),from_user_id:0,message:message,created_at: new Date()}

        dispatch({type:'LOOK_AHEAD',payload:newMessage})
        

        setValue('')
        setCanSend(false)
        axios
            .post('/Talk/post',{
                message:message,
                id:friendData('id')
            })
            .then((res) => {
                dispatch({type:'END_SEND_TALK'})
                messagesEndRef.current.scrollIntoView({ behavior: "smooth" })

            })
            .catch(error => {
                dispatch({type:'END_SEND_TALK'})
                console.log(error)

            })
    }

    //画像送信
    function sendImage(files){
        files.map((file,index)=>{
            
            const inputFile = file.base64;

            var newMessage ={room_id:friendData('id'),from_user_id:0,image:inputFile,created_at: new Date()}

            dispatch({type:'LOOK_AHEAD',payload:newMessage})

            axios
                .post('/Talk/imagePost',{
                    image:inputFile,
                    id:friendData('id')
                })
                .then((res) => {

                    dispatch({type:'END_SEND_TALK'})
                    console.log("送信成功")
                    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
                })
                .catch(error => {

                    dispatch({type:'END_SEND_TALK'})
                    console.log(error)
        
                })
        });
    }

    //スタンプ送信
    function sendStamp(){

        var newMessage ={room_id:friendData('id'),from_user_id:0,image:selectedStamp,created_at: new Date()}

        dispatch({type:'LOOK_AHEAD',payload:newMessage})

        axios
            .post('/Talk/imagePost',{
                image:selectedStamp,
                id:friendData('id')
            })
            .then((res) => {
                dispatch({type:'END_SEND_TALK'})
                console.log("成功2")
                messagesEndRef.current.scrollIntoView({ behavior: "smooth" })

            })
            .catch(error => {
                dispatch({type:'END_SEND_TALK'})
                console.log(error)

            })
    }

    return(
        <div className="talk-area h-100">
            <div className="talk-area-in h-100 w-100">
                <ProfileArea 
                    icon={friendData('icon')}
                    name={friendData('name')}
                    profile={friendData('profile')}
                    visible={profileVisible} 
                    onClick={visibleChatArea}
                />

                <div className={`chat-area col-xl-8 col-12 w-100 ${chatVisible}`}>
                    <div className="chat-area-in w-100">
                        <ChatHeader visible={visibleProfileArea} name={friendData('name')}/>

                        <div className={`line-bc txt_XS ${stampOpen}-bc`} id="talk-modal" onClick={closeStampList}>
                            {state.intervalGetData.myChatHistory.filter(talkFilter => talkFilter.room_id==(friendData('id'))).map((talk,index)=>
                            <Fragment key={index} >
                                <div>
                                    <TalkDate
                                        index={index}
                                        date={talk.created_at}
                                        myChatHistory={state.intervalGetData.myChatHistory}
                                        id={friendData('id')}
                                    />

                                    {talk.from_user_id==0 ?
                                        <MyComment 
                                            created_at={talk.created_at}
                                            image={talk.image}
                                            message={talk.message}
                                        />:
                                        <OtherComment
                                            created_at={talk.created_at}
                                            image={talk.image}
                                            message={talk.message}
                                            icon = {talk.icon}
                                        />
                                    }
                                </div>
                            </Fragment>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="chat-under">

                            <hr></hr>
                            <div className="input-row">
                                <FileUploadBtn sendImage={sendImage} />
                                
                                <StampUploadBtn onClick={openStampList} />

                                <TextAreaWithBtn 
                                    onChange = {handleChange}
                                    value = {value}
                                    sendMessage = {sendMessage}
                                    canSend = {canSend}
                                />
                            </div>
                            <StampListArea 
                                openFlg = {stampOpen}
                                preview = {previewStamp}
                                previewFlg = {stampPreview}
                                reset = {resetSelectedStamp}
                                select = {selectedStamp}
                                send = {sendStamp}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

const ProfileArea = ({icon,name,profile,visible,onClick}) =>{

    return(
        <div className={`profile-area  pl-0 pr-0 col-xl-4 col-12 w-100 ${visible}`}>
            <img src={icon} className="w-100"/>
            <div className="w-100 profile-txt-area gray_touka pt-5 pb-5">
                <p className="txt_L mb-5">{name}</p>
                <p className="txt_L">{profile}</p>
            </div>
            <div className="change-chat-area">
                <i className="fas fa-chevron-right txt_M" onClick={onClick}></i>
            </div>
        </div>
    )
}
const ChatHeader = ({visible,name}) => {
    return(
        <div className="chat-header">
            <div className="chat-header-in">
                <p className="change-profile-area mb-0">
                    <i className="fas fa-chevron-left txt_M" onClick={visible}></i>
                </p>
                <p className="txt_L mt-3 ml-5 mb-0">{name}</p>
            </div>
            <hr></hr>
        </div>
    )
}
const TalkDate = ({index,date,myChatHistory,id}) => {

    return(
        <Fragment>
            {index==0 ? 
                <div className="date-header txt_XXS">
                    -- {Moment(date).format('YYYY年MM月DD日')} --
                </div>
                :Moment(myChatHistory.filter(talkFilter => talkFilter.room_id==(id))[index-1].created_at).format('YYYY年MM月DD日') ==Moment(date).format('YYYY年MM月DD日') ? "" :
                <div className="date-header txt_XXS">
                    -- {Moment(date).format('YYYY年MM月DD日')} --
                </div>
            }
        </Fragment>
    )
}
const MyComment = ({created_at,image,message}) => {

    return(
        <div className="mycomment">
            <span className="txt_XXS">{Moment(created_at).format('H:mm')}</span>
            {message == null ? 
                <img src={image} /> :
                <p>{message}</p> 
            }
        </div>
    )
}

const OtherComment = ({created_at,image,message,icon}) => {

    return(
        <div className="balloon6">
            <div className="faceicon">
                <img src={icon} className=""/>
            </div>
            <div className="chatting">
                <div className="says">
                    {message == null ? 
                        <img src={image} /> :
                        <p>{message}</p> 
                    }
                    <span className="txt_XXS">
                        {Moment(created_at).format('H:mm')}
                    </span>
                </div>
            </div>
        </div>
    )
}

const FileUploadBtn = ({sendImage}) => {

    return(
        <div className="image-btn txt_L">
            <FileInputComponent 
                labelStyle={
                    {display:"none"}
                }
                parentStyle={{margin:0}}
                callbackFunction={file=>{
                    sendImage(file)
                }}
                buttonComponent={
                    <i className="fas fa-image"></i>
                }
                imagePreview={false} 
                multiple={true}
                textBoxVisible={false}
                accept="image/*"
            />
        </div>
    )
}

const StampUploadBtn = ({onClick}) => {

    return(
        <div className="stamp-btn txt_L">
            <i className="far fa-grin" onClick={onClick}></i>
        </div>
    )
}

const TextAreaWithBtn = ({onChange,value,sendMessage,canSend}) => {

    return(
        <Fragment>
            <div  className="txt-input" >

                <textarea type="text" className="w-100"
                    onChange={onChange} 
                    value={value}
                    onKeyPress={e =>{if (e.key == 'Enter') {
                        if(e.shiftKey){

                        }else{
                            console.log("Enter")
                            e.preventDefault()
                            sendMessage()
                        }
                    }
                    }}
                />
            </div>
            <div className="txt-send txt_L">

                <i className={`fas fa-location-arrow send-${canSend}`} onClick={sendMessage}></i>

            </div>
        </Fragment>
    )
}

const StampListArea = ({openFlg,preview,previewFlg,reset,select,send}) => {

    const stamps =[
        {icon:'/img/stamp/fusagikomu_businessman.png'},
        {icon:'/img/stamp/job_taisyoku_daikou_man.png'},
        {icon:'/img/stamp/salaryman_money.png'},
        {icon:'/img/stamp/skip_businessman.png'},
        {icon:'/img/stamp/yaruki_moeru_businessman.png'},
        {icon:'/img/stamp/yaruki_moetsuki_businessman.png'}
    ]

    return(
        <div className="stamp-area">
            <div className={`stamp-area-in text-center ${openFlg}`}>
                {stamps.map((stamp,index)=>
                    <div className="stamp col-4" key={index}>
                        <img src={stamp.icon} alt='' className="stamp-icon" onClick={preview}/>
                    </div>
                )}
            </div>
            <div className={`text-center stamp-preview white_touka ${previewFlg}`} onClick={reset}>
                
                <div className="col-4">
                    <img src={select} className="stamp-icon" onClick={send}/>
                </div>
            </div>
        </div>
    )
}
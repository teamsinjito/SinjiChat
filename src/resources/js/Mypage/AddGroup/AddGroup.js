import React,{ useState, useContext, useEffect,Fragment } from 'react';
import {PageHeaderTitle as HeaderTitle,PageHeaderSubTitle as HeaderSubTitle} from '../../Common/PageHeader';
import axios from "axios";
import {InputFilterTxt} from '../../Common/InputTxt';
import ImageList from '../../Common/ImageList';
import {Loading} from '../../Common/Loading';
import Slider from "react-slick";
import {AddGroupProfile} from './Profile';
import {LabelButton} from '../../Common/Button';
import Rodal from 'rodal';

import {Store,Provider} from '../../components/store'

export const AddGroup = () => {

    const {state, dispatch} = useContext(Store)　//store参照
    const [value,setValue] = useState("")  //テキストボックス入力値
    const [view,setView] =useState(false)
    const [openDom,setDom]=useState("") //プロフィール画面DOM
    const [message,setMessage] =useState(<Loading h="h-75" text="友達リスト取得中..."/>)
    const [selectUserId,setSelectUserId] = useState([])
    const button=[['Make Profile','btn-lock'],
                    ['Make Profile','btn-active']];
    const [btn,setButton] = useState(button[0])
    var selectedUser=[];

    useEffect(() => {
        axios
            .get('/AddGroup/get')
            .then((res) => {
                if(res.data.length > 0){
                    dispatch({type:'GET_ALL_MY_FRIEND_LIST',payload:res.data})

                }else{
                    setMessage('※ データが0件です')
                }
    
            })
            .catch(error => {
                console.log(error)
            })

    },[]);

    useEffect(() => {

        if(state.allMyFriend.length > 0){

            state.allMyFriend.map((output,index)=>{

                if(output.checked){

                    selectedUser.push(output.id)

                }
            })

            setSelectUserId(selectedUser);

            if(selectedUser.length > 0){

                setButton(button[1])

            }else{

                setButton(button[0])

            }
        }

    },[state.allMyFriend]);

    function selectUser(e){

        const id = e.currentTarget.attributes.getNamedItem('data-id').value

        const listCopy = state.allMyFriend.map((output,index)=>{

            if(output.id == id){

                output.checked=!output.checked
            }
            return output;
        })

        dispatch({type:'GET_ALL_MY_FRIEND_LIST',payload:listCopy})
    }
    //トーク表示
    function openModal(e){

        document.body.setAttribute('style', 'overflow: hidden;');
        //Domを構築
        setDom(<AddGroupProfile selected={selectUserId}/>)
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

    return(
        <Fragment>
            <div className="addfriend-area h-100">                 
                <HeaderTitle title="Add-Group"/>
                <HeaderSubTitle title="グループに追加する友達を選びましょう"/>
                {state.allMyFriend.length > 0 ?

                    <Fragment>
                        {/* テキストボックス */}
                        <InputFilterTxt 
                            value={value} 
                            onChange={()=>setValue(event.target.value)}
                        />
                        {/* 友達リスト */}
                        <div className="list-container mb-0">
                            <Slider {...state.swipeSetting}>
                            {state.allMyFriend.filter(listFilter => listFilter.name.includes(value)).map((list,index)=>
                                <ImageList 
                                    listElement={list} 
                                    menu='AddGroup' 
                                    key={index}
                                    index={index}
                                    onClick={selectUser}
                                    selectImageFlg={false}
                                />
                            )}
                            </Slider>
                        </div>
                        <div>
                            <div className="offset-8 col-4 offset-sm-10 col-sm-2 p-0">
                                <LabelButton btn={btn} onclick={openModal}/>
                            </div>
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
                className="modal-area flex-area"
            >
                {openDom}
            </Rodal>
        </Fragment>
    );
}
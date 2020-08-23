import React,{ useState, useContext, useEffect,Fragment } from 'react';
import {PageHeaderTitle as HeaderTitle,PageHeaderSubTitle as HeaderSubTitle} from '../Common/PageHeader';
import {InputFilterTxt} from '../Common/InputTxt';
import ImageList from '../Common/ImageList';
import Slider from "react-slick";
import {Request} from './Request';
import Rodal from 'rodal';
import {Store,Provider} from '../components/store';

export const RequestIndex = () => {

    const {state, dispatch} = useContext(Store)　//store参照
    const [value,setValue] = useState("")  //テキストボックス入力値
    const [view ,setView] = useState(false) //トーク画面表示フラグ
    const [openDom,setDom]=useState("") //トーク画面DOM

    //Requestプロフィール表示
    function openModal(e){
        const index =e.currentTarget.attributes.getNamedItem('data-index').value

        document.body.setAttribute('style', 'overflow: hidden;');

        //Domを構築
        setDom(<Request 
                icon={state.intervalGetData.request[index].icon}
                room_id={state.intervalGetData.request[index].room_id}
                name={state.intervalGetData.request[index].name}
                profile={state.intervalGetData.request[index].profile}
                type={state.intervalGetData.request[index].requesttype}
            />
        )
        //Requestプロフィール画面表示
        setView(true);
    }

    //Requestプロフィール画面非表示
    function closeModal(){

        document.body.removeAttribute('style', 'overflow: hidden;')
        setDom("")
        //Requestプロフィール画面非表示
        setView(false);

    }


    return (
        <Fragment>
            <div className="h-100">
                <HeaderTitle title="Request"/>
                <HeaderSubTitle title="グループへの参加および友達申請が来ています"/>
                {state.intervalGetData.request.length > 0 ?
                    <Fragment>
                        {/* テキストボックス */}
                        <InputFilterTxt 
                            value={value} 
                            onChange={()=>setValue(event.target.value)}
                        />
                        {/* 申請リスト */}
                        <div className="list-container">
                            <Slider {...state.swipeSetting}>
                            {state.intervalGetData.request.filter(listFilter => listFilter.name.includes(value)).map((list,index)=>
                                <ImageList 
                                    listElement={list} 
                                    menu='Request' 
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
            {/* Requestプロフィール画面 */}
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

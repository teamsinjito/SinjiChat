import React, { useState, useContext,useRef }  from 'react';
import { useInView } from "react-intersection-observer";
import useInterval from 'use-interval';
import ReactDOM from 'react-dom';
import {TopIndex as Top} from './Top/index';
import {MypageIndex as Mypage} from './Mypage/index';
import {TalkIndex as Talk} from './Talk/index';
import {TimeLineIndex as TimeLine} from './TimeLine/index';
import {RequestIndex as Request} from './Request/index';
import {SideBarNav} from './Nav/SideBarNav';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {Store,Provider} from './components/store'

const MainArea=()=>{
    
    const {state, dispatch} = useContext(Store) 
    const [ref, inView] = useInView({
        threshold: 0
    });

    useInterval(()=>{

        axios
            .get('/get')
            .then((res) => {
                        
                dispatch({type:'GET_INTERVAL_DATA',payload:res.data})
                console.log(state)

            })
            .catch(error => {
                dispatch({type:'ERROR_SELECT_MYFRIENDS'})
                return state
            })

            
            
    },5000)

    return (
        <>
        {state.intervalGetData.firstLoadFlg == false ?
            <>
                <SideBarNav 
                    inView={(!inView).toString()}
                    pageWrapId={"page-wrap"} 
                    outerContainerId={"App"}
                />
                <div id="page-wrap" className="h-100">
                    <Top innerref={ref}/>
                    <Mypage />
                    <Talk />
                    <TimeLine />
                </div>
            </>:<em>loading</em>}   
        </>
    );
}

const Main=()=> {

    return(

        <Provider>
            <MainArea />
        </Provider>

    )
}

if (document.getElementById('home-id')) {
    ReactDOM.render(<Main />, document.getElementById('home-id'));
}
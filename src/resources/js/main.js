import React from 'react';
import ReactDOM from 'react-dom';
import {Brank} from './Common/Brank';
import {TopIndex as Top} from './Top/index';
import {MypageIndex as Mypage} from './Mypage/index';
import {TalkIndex as Talk} from './Talk/index';
import {TimeLineIndex as TimeLine} from './TimeLine/index';
import {RequestIndex as Request} from './Request/index';
import { useInView } from "react-intersection-observer";
import {SideBarNav} from './Nav/SideBarNav';

export default function Main() {

    const [ref, inView,entry] = useInView({
        threshold: 0
    });

        
        return (
            <>
                <SideBarNav 
                    inView={(!inView).toString()}
                    pageWrapId={"page-wrap"} 
                    outerContainerId={"App"}
                />
                <div id="page-wrap" className="h-100">

                    <Top innerref={ref}/>
                    {/* <Brank /> */}
                    <Mypage />
                    <Talk />
                    <TimeLine />
                </div>
            </>
        );
    }


// export default Index;

if (document.getElementById('home-id')) {
    ReactDOM.render(<Main />, document.getElementById('home-id'));
}
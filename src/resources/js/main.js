import React, { useState, useEffect,useRef }  from 'react';
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

    const [friendList,setFriendData]=useState([]);
    const [talkList,setTalkData]=useState([]);

    const refFriendList = useRef(friendList);
    const refTalkList = useRef(talkList);
    const [loading,updateLoad]=useState(true);

    function sleep(milliseconds) {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }

    async function main() {
        // console.log('main')
        for (let i = 0; i < 50; i++) {
            // console.log('main loop')

            axios
                .get('/get')
                .then((res) => {

                    setFriendData(res.data.friend);
                    setTalkData(res.data.talk);
                    // console.log(refFriendList.current);
                    // console.log(refTalkList.current);
                    updateLoad(false);
                })
                .catch(error => {
                    console.log(error)
                })
            await sleep(5000);
        }
    }

    useEffect(() => {

        refFriendList.current = friendList;
        refTalkList.current = talkList;

    }, [friendList,talkList]);

    useEffect(() => {
        main()
    },[])

        return (
            <>
            {loading == false ?
            <>
                <SideBarNav 
                    inView={(!inView).toString()}
                    pageWrapId={"page-wrap"} 
                    outerContainerId={"App"}
                />
                <div id="page-wrap" className="h-100">
                    <Top innerref={ref}/>
                    <Mypage />
                    <Talk list={refFriendList.current} talk={refTalkList.current}/>
                    <TimeLine />
                </div>
            </>:<em>loading</em>}

            </>
        );
    }


// export default Index;

if (document.getElementById('home-id')) {
    ReactDOM.render(<Main />, document.getElementById('home-id'));
}
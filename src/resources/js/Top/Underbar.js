import React from 'react';
import {MypageIndex} from '../Mypage/index';
import {RequestIndex} from '../Request/index';
import {TalkIndex} from '../Talk/index';
import {TimeLineIndex} from '../TimeLine/index';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from '../Common/Layout';

export const Underbar = (props) => {
    return(
        <div className="sidebar-area">
            <Router>
                <Layout layouts={props.layouts}>    
                    <Route  name="/Mypage"path="/Mypage" component={MypageIndex} />
                    <Route  path="/Request" component={RequestIndex} />
                    <Route  path="/Talk" component={TalkIndex} />
                    <Route  path="/TimeLine" component={TimeLineIndex} />             
                </Layout>
            </Router>
        </div>
    )
}
import React from 'react';
import {Title} from '../Common/Title';
import {Sidebar} from '../Common/Sidebar';
import {Underbar} from './Underbar';


export const TopIndex = (props) => {

        return (
            
            <div className="top-area h-100" ref={props.innerref}>
                
                <div className="col-xl-9 col-12 p-0 left-side">
                    {/* タイトルタグ */}
                    <div className="bgImg src1"></div>
                    <div className="bgImg src2"></div>
                    <div className="bgImg src3"></div>
                    <div className="bgImg src4"></div>
                    <Title />
                </div>
                <div className="col-xl-3 pc-right-side">
                    {/* サイドバータグ */}
                    <Sidebar layouts="side"/>
                </div>
                <div className="col-12 p-0 phone-right-side">
                    <Underbar layouts="under"/>
                </div>
            </div>
        );
    };


import React from 'react';
import ReactDOM from 'react-dom';

// タイトル
export function Title() {
    return (
        <div className="text">
            <p className="title-white title_w">
                SinjiChat
            </p>
        </div>
    );
}
// サイドバー用
export function SideBarTitle() {
    return (
        <p className="title-black title_B">
            SinjiChat
        </p>
    );
}   
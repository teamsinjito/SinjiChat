import React from 'react';
import ReactDOM from 'react-dom';

// タイトル
export const Title = () => {
    return (
        <div className="text text-center">
            <p className="title-white title_w">
                SinjiChat
            </p>
        </div>
    );
}
// サイドバー用
export const SideBarTitle = () => {
    return (
        <p className="title-black title_B text-center">
            SinjiChat
        </p>
    );
}   
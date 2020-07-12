import React from 'react';
import ReactDOM from 'react-dom';
import TitleWhite from './TitleWhite'
function TitleSide() {
    return (
        <div className="title-side-parent">
            <div className="title-side-children">  
                <TitleWhite />
            </div>
        </div>
    );
}

export default TitleSide;

if (document.getElementById('titleside')) {
    ReactDOM.render(<TitleSide />, document.getElementById('titleside'));
}
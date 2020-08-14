import React, { useState } from 'react';
import {Sidebar} from '../Common/Sidebar';
import { slide as Menu } from 'react-burger-menu'

export const SideBarNav = (props) => {

    const [menuOpen,setMenuOpen] = useState(true) //サイドバー表示フラグ
    
    //サイドバー表示切替
    function handleStateChange(state) {

        setMenuOpen(state.isOpen)

    }

    return(

        <Menu {...props} 
            className={`visible-${props.inView} open-${menuOpen}`} 
            right 
            noOverlay
            onStateChange={handleStateChange} 
            >
            <Sidebar layouts="side"/>
        </Menu>
        
    )
    
}
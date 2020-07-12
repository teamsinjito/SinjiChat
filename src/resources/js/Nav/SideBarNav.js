import React from 'react';
import {Sidebar} from '../Common/Sidebar';
import { slide as Menu } from 'react-burger-menu'
import { render } from 'react-dom';

export class SideBarNav extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: true
        }

        this.handleStateChange=this.handleStateChange.bind(this);  
        }
        
        handleStateChange(state) {
            this.setState({menuOpen:state.isOpen})
        }

    render(){

        return(
    
                <Menu {...this.props} 
                    className={`visible-${this.props.inView} open-${this.state.menuOpen}`} 
                    right 
                    noOverlay
                    onStateChange={this.handleStateChange} 
                    >
                    <Sidebar  layouts="side"/>
                </Menu>
            
        )
    }


}
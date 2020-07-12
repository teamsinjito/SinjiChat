import React from 'react';
import { Link } from "react-scroll";

export default class Layout extends React.Component {


    render() {
        return (
            <div className={`layout  layout-${this.props.layouts}`}>
                {/* {this.props.children} */}
                <Link
                    activeClass="active" 
                    to="/Mypage" 
                    spy={true} 
                    smooth={true}
                    offset={0}
                    duration= {1000}
                    className={`menu txt_L ${this.props.layouts}`}
                    ><span>MyPage</span></Link>
                <Link 
                    activeClass="active" 
                    to="/Talk" 
                    spy={true} 
                    smooth={true}
                    offset={0}
                    duration= {1000}
                    className={`menu txt_L ${this.props.layouts}`}
                    ><span>Talk</span></Link>
                <Link 
                    activeClass="active" 
                    to="/TimeLine" 
                    spy={true} 
                    smooth={true}
                    offset={0}
                    duration= {1000}
                    className={`menu txt_L ${this.props.layouts}`}
                    ><span>TimeLine</span></Link>
                <Link to="/Request" className={`menu txt_L ${this.props.layouts}`}><span>Request</span></Link>
                <Link to="/logout" className={`menu txt_L ${this.props.layouts}`}><span>LogOut</span></Link>
            </div>
        )
    }
}
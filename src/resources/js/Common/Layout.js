import React from 'react';
import { Link } from "react-scroll";

const Layout = (props) => {

    return (
        <div className={`layout  layout-${props.layouts}`}>
            <Link
                activeClass="active" 
                to="/Mypage" 
                spy={true} 
                smooth={true}
                offset={0}
                duration= {1000}
                className={`menu txt_L ${props.layouts}`}
                ><span>MyPage</span></Link>
            <Link 
                activeClass="active" 
                to="/Talk" 
                spy={true} 
                smooth={true}
                offset={0}
                duration= {1000}
                className={`menu txt_L ${props.layouts}`}
                ><span>Talk</span></Link>
            <Link 
                activeClass="active" 
                to="/TimeLine" 
                spy={true} 
                smooth={true}
                offset={0}
                duration= {1000}
                className={`menu txt_L ${props.layouts}`}
                ><span>TimeLine</span></Link>
            <Link to="/Request" className={`menu txt_L ${props.layouts}`}><span>Request</span></Link>
            <Link to="/logout" className={`menu txt_L ${props.layouts}`}><span>LogOut</span></Link>
        </div>
    )
}

export default Layout;
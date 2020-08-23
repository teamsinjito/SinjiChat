import React,{ useState, useContext, Fragment }  from 'react';
import { Link } from "react-scroll";
import {RequestIndex} from '../Request';
import {Store,Provider} from '../components/store';
import Rodal from 'rodal';

const Layout = (props) => {

    const {state, dispatch} = useContext(Store)　//store参照
    const [view,setView] =useState(false)
    const [openDom,setDom]=useState("") //プロフィール画面DOM

    //Request表示
    function openModal(e){
        document.body.setAttribute('style', 'overflow: hidden;');
        //Domを構築
        setDom(<RequestIndex />)
        //Request画面表示
        setView(true);
    }

    function closeModal(){

        document.body.removeAttribute('style', 'overflow: hidden;')
        setDom("")
        //Request画面非表示
        setView(false);

    }

    return (
        <Fragment>
            <div className={`layout  layout-${props.layouts}`}>
                <Link
                    activeClass="active" 
                    to="/Mypage" 
                    spy={true} 
                    smooth={true}
                    offset={0}
                    duration= {1000}
                    className={`menu  text-center txt_L ${props.layouts}`}
                    ><span>MyPage</span></Link>
                <Link 
                    activeClass="active" 
                    to="/Talk" 
                    spy={true} 
                    smooth={true}
                    offset={0}
                    duration= {1000}
                    className={`menu  text-center txt_L ${props.layouts}`}
                    ><span>Talk</span></Link>
                <Link 
                    activeClass="active" 
                    to="/TimeLine" 
                    spy={true} 
                    smooth={true}
                    offset={0}
                    duration= {1000}
                    className={`menu  text-center txt_L ${props.layouts}`}
                    ><span>TimeLine</span></Link>
                <Link 
                    to="/Request" 
                    onClick={openModal}
                    className={`menu  text-center txt_L ${props.layouts}`}
                ><span>{state.intervalGetData.request.length > 0 ? "Request(+"+state.intervalGetData.request.length+")":"Request"}</span>
                </Link>
                <Link to="/logout" className={`menu  text-center txt_L ${props.layouts}`}><span>LogOut</span></Link>
            </div>

            {/* Request画面 */}
            <Rodal
                visible={view}
                onClose={closeModal}
                animation="door"
                className="modal-area flex-area"
            >
                {openDom}
            </Rodal>
        </Fragment>
    )
}

export default Layout;
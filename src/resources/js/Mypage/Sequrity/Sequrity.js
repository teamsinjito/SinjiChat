import React, { useState, useContext,Fragment  } from 'react';
import {PageHeaderTitle as HeaderTitle,PageHeaderSubTitle as HeaderSubTitle} from '../../Common/PageHeader';
import {LabelButtonX} from '../../Common/Button';
import {Link,Route,useLocation,Switch,BrowserRouter} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PreEditMail from'./PreEditMail';
import PreEditPassword from './PreEditPassword';
import EditMail from './EditMail';
import EditPassword from './EditPassword';
import ConfirmEditPassword from './ConfirmEditPassword';
const labelBtn = ['E-mail','Password']

export const Sequrity = () => {
    
    return(
        <div className="container form-group mb-0 h-100">
            <HeaderTitle title="Sequrity"/>
            <HeaderSubTitle title="メールアドレスおよびパスワードを編集します"/>

            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </div>
    )
}
const Routes = () => {

    const location = useLocation();
    const [_, rootPath] = location.pathname.split("/");

    return (
        <div className="h-75" style={{textAlign:"center"}}>
            <AnimatePresence exitBeforeEnter initial={false}>
            <Switch location={location} key={rootPath}>
                <Route path="/edit/mail" component={EditMail} />
                <Route path="/edit/password" component={EditPassword} />
                <Route path="/confirm/password" component={ConfirmEditPassword} />
                <Route path="/preedit/mail" component={PreEditMail} />
                <Route path="/preedit/password" component={PreEditPassword} />
                <Route path="/" component={Home} />
            </Switch>
            </AnimatePresence>
        </div>
    );
};
//初期表示画面
const Home = () => (
    <motion.div
        animate={{x: 0,opacity: 1}}
        initial={{x: 100,opacity: 0}}
        exit={{x: -100,opacity: 0}}
        transition={{duration: 0.2}}
        className="h-100"
    >
        <div className="row" 
            style={{height:"80%",display:"flex",alignItems:"center"}}
        >     

            <div className="col-sm-6 col-12 mt-5">
                <Link to="/preedit/mail">

                    <LabelButtonX btn={labelBtn[0]}/>
                </Link>
            </div>
            <div className="col-sm-6 col-12 mt-5">
                <Link to="/preedit/password">

                    <LabelButtonX btn={labelBtn[1]}/>
                </Link>
            </div>
        </div>
    </motion.div>
);

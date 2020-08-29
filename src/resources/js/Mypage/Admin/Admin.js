import React, { useState, useContext,Fragment  } from 'react';
import {PageHeaderTitle as HeaderTitle,PageHeaderSubTitle as HeaderSubTitle} from '../../Common/PageHeader';
import {LabelButtonX} from '../../Common/Button';
import {Link,Route,useLocation,Switch,BrowserRouter} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import EditIcon from './EditIcon';
import EditStamp from './EditStamp';

const labelBtn = ['Icon','Stamp']

export const Admin = () => {
    
    return(
        <div className="container form-group mb-0 h-100">
            <HeaderTitle title="Admin"/>
            <HeaderSubTitle title="各種項目を設定します"/>

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
                <Route path="/admin/icon" component={EditIcon} />
                <Route path="/admin/stamp" component={EditStamp} />
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
                <Link to="/admin/icon">

                    <LabelButtonX btn={labelBtn[0]}/>
                </Link>
            </div>
            <div className="col-sm-6 col-12 mt-5">
                <Link to="/admin/stamp">

                    <LabelButtonX btn={labelBtn[1]}/>
                </Link>
            </div>
        </div>
    </motion.div>
);

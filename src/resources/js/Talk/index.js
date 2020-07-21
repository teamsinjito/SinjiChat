import React from 'react';
import {PageHeaderTitle as HeaderTitle,PageHeaderSubTitle as HeaderSubTitle} from '../Common/PageHeader';
import axios from "axios";
import {Auto} from '../Common/AutoSuggest';

export class TalkIndex extends React.Component {
    constructor(props){
        super(props);
        this.state={
            list:[],
            menu:"Talk",
            message:"Loading...",
        }
        // axios
        // .get('/Talk/get')
        // .then((res) => {
        //     // console.log(res.data);
        //     if(res.data.friend.length > 0){
        //         this.setState({list: res.data.friend})
        //         // console.log(this.state.list)
        //     }else{
        //         this.setState({message:"※ データが0件です"})
        //     }

        // })
        // .catch(error => {
        //     // console.log(error)
        // })
    }    

    render(){
        
        return (
            <div className="Talk-area h-100 mb-5" name="/Talk">                 
                <HeaderTitle title="Talk"/>
                <HeaderSubTitle title="最高の友達と赴くままに語ろう"/>
        {this.props.list.length > 0 ? <Auto list={this.props.list} talk={this.props.talk} menu={this.state.menu}/> : <em>※ データが0件です</em>}
                
            </div>
        );

    }
}
import React from 'react';
import {PageHeaderTitle as HeaderTitle,PageHeaderSubTitle as HeaderSubTitle} from '../../Common/PageHeader';
import axios from "axios";
import {Auto} from '../../Common/AutoSuggest';


export class AddFriend extends React.Component{
    
    constructor(){
        super();
        this.state={
            list:[],
            menu:"AddFriend",
            message:"Loading..."
        }

        axios
            .get('/AddFriend/get')
            .then((res) => {
                if(res.data.length > 0){
                    this.setState({list: res.data})
                    console.log(this.state.list)
                }else{
                    this.setState({message:"※ データが0件です"})
                }

            })
            .catch(error => {
                console.log(error)
            })
    }


    render(){
        return(
            <div className="addfriend-area h-100">                 
                <HeaderTitle title="Add-Friend"/>
                <HeaderSubTitle title="人生を共に謳歌する最高の仲間を見つけよう"/>
        {this.state.list.length > 0 ? <Auto list={this.state.list} menu={this.state.menu}/> : <em>{this.state.message}</em>}
                
            </div>
        );
    }
}
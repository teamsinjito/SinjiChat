import React from 'react';
import {PageHeaderTitle as HeaderTitle,PageHeaderSubTitle as HeaderSubTitle} from '../../Common/PageHeader';
import axios from "axios";
import {Auto} from '../../Common/AutoSuggest';


export class AddFriend extends React.Component{

    constructor(){
        super();
        this.state={
            list:[]
        }

        axios
            .get('/AddFriend/get')
            .then((res) => {
                if(res.data.length > 0){
                    this.setState({list: res.data})
                }else{
                    this.setState({list: [{icon:'',name:"※ データが0件です",id:''}]})
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
                {this.state.list.length > 0 ? <Auto list={this.state.list}/> : <em>Loading...</em>}
                
            </div>
        );
    }
}
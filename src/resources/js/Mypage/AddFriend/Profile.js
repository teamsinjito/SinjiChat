import React from 'react';
import {ProfileHeader} from '../../Common/ProfileHeader';
import {ProfileTxtLabel} from '../../Common/ProfileTxt';
import {Button} from '../../Common/Button';
import axios from "axios";

const button=[['申請','btn-active','none'],
                ['申請中','btn-lock','loading'],
                ['申請済み','btn-lock','check'],
                ['友達追加済み','btn-lock','check'],
                ['申請失敗','btn-active','miss']];


export class AddFriendProfile extends React.Component{
    constructor(props){
        super(props);
        this.requestFriend=this.requestFriend.bind(this);
        this.state={
            status:button[this.props.status],
        }
        
    }
    componentDidMount(){

        this.setState({
            status:button[this.props.status]
        });
        

    }
    requestFriend(){
        this.setState({status: button[1]})
        axios
            .post('/AddFriend/post',{
                to_user_id:this.props.id
            })
            .then((res) => {
                console.log("STATUS_CODE:"+res.data)
                this.setState({status: button[res.data]})
                this.props.update(this.props.id,res.data);
            })
            .catch(error => {
                console.log("STATUS_CODE*"+error)
                this.setState({status: button[error]})
                this.props.update(this.props.id,error);
            })
            
    }
    render(){
        return(
            
            <div className="container form-group mt-5">
                <div className="row">
                    <div className="col-xl-7 col-12">    
                        <ProfileHeader title="Profile"/>
                        <ProfileTxtLabel label={this.props.name}/>
                        <ProfileTxtLabel label={this.props.profile}/>
                        <br></br>
                        <div className="col-xl-4 p-0 pc-show">
                            <Button btn={this.state.status} onclick={this.requestFriend}/>
                        </div>
                    </div>
                    <div className="col-xl-5 col-12">
                        <img src={this.props.src} className="w-100"/>
                    </div>
                </div>
                <div className="row  pc-none">
                    <div className="offset-3 col-6 p-0 mt-5">
                        <Button btn={this.state.status} onclick={this.requestFriend}/>
                    </div>
                </div>
            </div>
            
        )
    }
}
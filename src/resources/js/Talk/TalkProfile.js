import React from 'react';
import Moment from 'moment';
export class TalkProfile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            value: '',
            talks:this.props.talks,
            newMessage:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.sendMessage=this.sendMessage.bind(this);

    }
    sendMessage(){
        const message = this.state.value;
        this.setState({value: ''});
        axios
        .post('/Talk/post',{
            message:message,
            id:this.props.id
        })
        .then((res) => {
            
            console.log("成功")
            this.props.send(this.props.id,message,)
            console.log(this.props.talks)
        })
        .catch(error => {
            console.log(error)

        })
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    render(){
        // console.log(this.props.talks)
        return(
            <div className="h-100">
                <div className="row talk-area-in h-100 w-100">
                    <div className="profile-area h-100">
                        <img src={this.props.src} className="h-100"/>
                        <div className="w-100 profile-txt-area gray_touka pt-5 pb-5">
                            <p className="txt_L mb-5">{this.props.name}</p>
                            <p className="txt_L">{this.props.profile}</p>
                        </div>

                    </div>
                    <div className="chat-area h-100">
                        <div className="chat-area-in h-75 w-100">

                            <p className="txt_L mt-3 ml-5">{this.props.name}</p>
                            <hr></hr>
                            <div className="line-bc txt_XS">
                                {this.props.talks.map((talk,index)=>

                                <div key={index}>{index==0 ? 
                                    <div className="date-header txt_XXS">
                                        -- {Moment(talk.created_at).format('YYYY年MM月DD日')} --
                                    </div>
                                    :Moment(this.props.talks[index-1].created_at).format('YYYY年MM月DD日') ==Moment(talk.created_at).format('YYYY年MM月DD日') ? "" :
                                    <div className="date-header txt_XXS">
                                        -- {Moment(talk.created_at).format('YYYY年MM月DD日')} --
                                    </div>}

                                    {talk.from_user_id==0 ?
                                    <div className="mycomment">
                                        <span className="txt_XXS">{Moment(talk.created_at).format('H:mm')}</span>
                                        <p>
                                        {talk.message}
                                        </p>
                                    </div>:
                                    <div className="balloon6">
                                        <div className="faceicon">
                                            <img src={this.props.src} className=""/>
                                        </div>
                                        <div className="chatting">
                                        <div className="says">
                                            <p>{talk.message}</p>
                                        </div>
                                        <span className="txt_XXS">{Moment(talk.created_at).format('H:mm')}</span>
                                        </div>
                                    </div>}
                                </div>)}

                            </div>
                        </div>
                        <hr></hr>
                        <input type="text" className="w-75" onChange={this.handleChange} value={this.state.value}/>
                        <button onClick={this.sendMessage}>送信</button>
                    </div>

                </div>
            </div>
        );
    }
}
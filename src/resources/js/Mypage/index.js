import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {PageHeaderTitle as HeaderTitle,PageHeaderSubTitle as HeaderSubTitle} from '../Common/PageHeader';
import {SwipeToSlide} from '../Common/SwipeList'
import {AddFriend} from './AddFriend/AddFriend'
import {Tweet} from './Tweet/Tweet'
import Rodal from 'rodal';


const list =[
    {icon:'/img/Tweet.png',name:'名言をタイムラインに投稿します',id:'menu1'},
    {icon:'/img/AddGroup.png',name:'トークグループを作成します',id:'menu2'},
    {icon:'/img/AddFriend.png',name:'友達申請メールを送ります',id:'menu3'},
    {icon:'/img/Option.png',name:'ユーザ情報を編集します',id:'menu4'},
    {icon:'/img/Security.png',name:'ログイン情報を編集します',id:'menu5'}
]
const columnCnt = 3

export class MypageIndex extends Component {

    constructor(props){
        super(props);
        this.openModal=this.openModal.bind(this);
        this.state={
            openDom:"",
            visible:false
        };
        this.closeModal = this.closeModal.bind(this);
    }
    openModal(e){
        const id = e.currentTarget.id;

        if(id=="menu1"){
            this.setState({openDom:<Tweet/>})
        }else if(id=="menu2"){
            this.setState({openDom:<AddFriend/>})
        }else if(id=="menu3"){
            this.setState({openDom:<AddFriend/>})
    
        }else if(id=="menu4"){
            this.setState({openDom:<AddFriend/>})
        }else{
            this.setState({openDom:<AddFriend/>})          
        }
        this.setState({visible: true});
        console.log(e.currentTarget.id);
        document.body.setAttribute('style', 'overflow: hidden;')
    }  
    closeModal() {
        this.setState({visible: false});
        document.body.removeAttribute('style', 'overflow: hidden;')
    }

    render(){

        return (
            <div className="mypage-area h-100 mt-5" name="/Mypage">
                <HeaderTitle title="MyPage"/>
                <br></br>
                <HeaderSubTitle title="幸せとは自分で掴み取るものさ"/>
                <SwipeToSlide list={list} show={columnCnt} open={this.openModal} base64={false}/>
                <hr></hr>
    

                <Rodal 
                    visible={this.state.visible}
                    onClose={this.closeModal}
                    animation="door"
                    className={`modal-area ${this.state.openDom}`}
                    >
                    {this.state.openDom}
                </Rodal>
            </div>
        );
    }
}
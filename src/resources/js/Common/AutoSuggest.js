import React from 'react';
import Autosuggest from 'react-autosuggest';
import {SwipeToSlide} from '../Common/SwipeList';
import Rodal from 'rodal';
import {AddFriendProfile} from '../Mypage/AddFriend/Profile';
import {TalkProfile} from '../Talk/TalkProfile';

var opendom=""
var select_id=""
var select_src=""
var select_profile=""
var select_name=""
var select_status=""
const ADDFRIEND="AddFriend"
var addFriendOpenFlg = false
const TALK="Talk"
const ADDGROUP="AddGroup"

export class Auto extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: [],
            result:[],
            menu:this.props.menu,
            visible:false,
            list:this.props.list,

        };
        this.onChange=this.onChange.bind(this);
        this.onSuggestionsFetchRequested=this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested=this.onSuggestionsClearRequested.bind(this);
        this.openModal=this.openModal.bind(this);
        this.getSuggestions=this.getSuggestions.bind(this);
        this.getSuggestionValue=this.getSuggestionValue.bind(this);
        this.renderSuggestion=this.renderSuggestion.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateStatusButton= this.updateStatusButton.bind(this);
        this.sendMessage= this.sendMessage.bind(this);

    }
    componentDidMount(){
        this.setState({
            result: this.state.list
        });
        

    }

    updateStatusButton(id,status){
        const list_copy = this.state.result.map((output,index)=>{
            if(output.id==id){
                output.status=status;
                // console.log(output)
            }
            return output;
        })
        this.setState({
            result: list_copy,
            menu:ADDFRIEND
        });
    }

    sendMessage(){

    }
    openModal(e){

        select_id=e.currentTarget.id
        select_src=e.currentTarget.src
        select_profile=e.currentTarget.attributes.getNamedItem('data-profile').value
        select_name=e.currentTarget.attributes.getNamedItem('data-name').value
        select_status=e.currentTarget.attributes.getNamedItem('data-status').value
        if(this.state.menu==ADDFRIEND){

            opendom=<AddFriendProfile id={select_id} src={select_src} profile={select_profile} name={select_name} status={select_status} update={this.updateStatusButton} />

            addFriendOpenFlg=true

        }
        this.setState({visible: true});

    };

    closeModal() {
        opendom=""
        addFriendOpenFlg=false
        this.setState({visible: false});
    }
    onChange (event, {newValue} ){
        this.setState({
            value: newValue
        });
    };
    onSuggestionsFetchRequested ({ value }){
        this.setState({
            suggestions: this.getSuggestions(value),
            result: this.getSuggestions(value)
        });
    };

    getSuggestions(value){
        const inputValue = (value.trim()).toLowerCase();
        const inputLength = inputValue.length;
    
        return inputLength === 0 ? this.state.list : this.state.list.filter(list =>
            list.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    }
    getSuggestionValue (suggestion){};
    
    renderSuggestion (suggestion) {};

    onSuggestionsClearRequested () {
        this.setState({
            suggestions: this.state.list,

        });
    };
    render(){

        console.log(this.props.menu)
        const { value, suggestions,result } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: '',
            value,
            onChange: this.onChange
        };


        if(this.state.menu==ADDFRIEND){

            // opendom=<AddFriendProfile id={select_id} src={select_src} profile={select_profile} name={select_name} status={select_status} update={this.updateStatusButton} />

        }else if(this.state.menu==ADDGROUP){


        }else if(this.state.menu==TALK && !addFriendOpenFlg){

            const talks= this.props.talk.filter(function(item,index){
                if(item.room_id==select_id) return true;
            })

            opendom=<TalkProfile id={select_id} src={select_src} profile={select_profile} name={select_name} talks={talks} send={this.sendMessage}/>
        }
        return(
            <>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                    alwaysRenderSuggestions={true}
                    focusInputOnSuggestionClick={true}
                />
                {/* AddFriend */}
                {this.state.menu ==ADDFRIEND ?
                <SwipeToSlide list={result} show={4} open={this.openModal}
                base64={true}/> :
                // Talk
                <SwipeToSlide list={result} show={4} open={this.openModal}
                base64={true}/>
                }

                <Rodal 
                    visible={this.state.visible}
                    onClose={this.closeModal}
                    animation="slideUp"
                    className={`modal2-area ${this.state.openDom}`}
                    >
                    {opendom}
                </Rodal>
            </>

        );
    }
}
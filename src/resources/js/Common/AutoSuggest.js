import React from 'react';
import Autosuggest from 'react-autosuggest';
import {SwipeToSlide} from '../Common/SwipeList'

export class Auto extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: [],
            result:[],
            openDom:"",
        };
        this.onChange=this.onChange.bind(this);
        this.onSuggestionsFetchRequested=this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested=this.onSuggestionsClearRequested.bind(this);
        this.openModal=this.openModal.bind(this);
        this.getSuggestions=this.getSuggestions.bind(this);
        this.getSuggestionValue=this.getSuggestionValue.bind(this);
        this.renderSuggestion=this.renderSuggestion.bind(this);
        
    }
    componentDidMount(){
        this.setState({
            result: this.props.list
        });
    }
    openModal(e){
        console.log(e.currentTarget.id);



    };  
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
    
        return inputLength === 0 ? this.props.list : this.props.list.filter(list =>
            list.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    }
    getSuggestionValue (suggestion){};
    
    renderSuggestion (suggestion) {};

    onSuggestionsClearRequested () {
        this.setState({
            suggestions: this.props.list,

        });
    };
    render(){

        const { value, suggestions,result } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: '',
            value,
            onChange: this.onChange
        };

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
                <SwipeToSlide list={result} show={4} open={this.openModal}
                base64={true}/>
            </>

        );
    }
}
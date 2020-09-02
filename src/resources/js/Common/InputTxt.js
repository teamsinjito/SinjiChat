import React from 'react';

export const InputFilterTxt = ({value,onChange}) =>{

    return(

        <div className="input-txt-container input-filter-margin text-center">
            <input className="input-txt input-filter-txt"type="text" value={value} onChange={onChange}/>
        </div>
        
    )
    
}

export const InputNameTxt = ({value,onChange,error}) => {

    return(
        <div className="input-txt-container input-margin">
            <input className="input-txt name-txt"type="text" value={value} onChange={onChange} placeholder="名前…" maxLength={20}/>
            {error == ""  ? '' : <p className="error-txt">{error}</p>}         
        </div>
    )
}

export const InputProfileTxt = ({value,onChange,error,errorImage}) => {

    return(
        <div className="input-txt-container input-margin">
            <textarea className="input-txt profile-txt"type="text" value={value} onChange={onChange} rows={3} cols={2} placeholder="一言メッセージ…" maxLength={20}/>
            {error == ""  ? '' : <p className="error-txt">{error}</p>}
            {errorImage == ""  ? '' :<p className="error-txt">{errorImage}</p>}
        </div>
    )
}

export const InputTweetTxt = ({value,onChange}) => {

    return(
        <div className="input-txt-container h-100">
            <textarea className="input-txt tweet-txt"type="text" value={value} onChange={onChange} rows={3} cols={2} placeholder="一言メッセージ…" maxLength={250}/>
        </div>
    )
}

export const InputMailTxt = ({value,onChange}) => {

    return(
        <div className="input-txt-container">
            <input className="input-txt input-underline w-100" 
                type="text" 
                value={value} 
                onChange={onChange} 
                maxLength={60} 
                autoFocus
            />
        </div>
    )
}
export const InputPassTxt = ({value,onChange}) => {

    return(
        <div className="input-txt-container">
            <input className="input-pass input-underline w-100" 
                type="password" 
                value={value} 
                onChange={onChange} 
                maxLength={60} 
                autoFocus                     
            />
        </div>
    )
}
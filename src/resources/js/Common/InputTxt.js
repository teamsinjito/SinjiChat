import React from 'react';

const InputFilterTxt = ({value,onChange}) =>{

    return(

        <div className="input-fitler-txt-container">
            <input className="input-fitler-txt"type="text" value={value} onChange={onChange}/>
        </div>
        
    )
    
}

export default InputFilterTxt
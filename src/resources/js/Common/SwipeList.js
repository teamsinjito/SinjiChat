import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import res from './../../sass/_variables.scss';

export class SwipeToSlide extends Component {

    render(){

        const settings = {
            className: "center",
            infinite: false,
            slidesToShow: this.props.show,
            swipeToSlide: true,
            responsive: [
                {
                    breakpoint: parseInt(res.pad),
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: parseInt(res.phone),
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        };

        
        return(
            <div className="list-container">
                <Slider {...settings}>
                    
                    {this.props.list.map((list,index)=>
                    <React.Fragment key={index}>
                        {/* バイナリの場合デコードする */}
                        {this.props.base64 ? <img src={`data:image/jpg;base64,${list.icon}`} alt='' onClick={this.props.open} className="w-100 pr-2 pl-2" id={list.id} data-profile={list.profile} data-name={list.name} data-status={list.status}/> :
                        <img src={list.icon} alt='' onClick={this.props.open} className="w-100 pr-2 pl-2" id={list.id} data-profile={list.profile} data-name={list.name} data-status={list.status}/>}
                        <p className="text-center txt_M list-txt">{list.name}</p>
                    </React.Fragment>
                    )}
                </Slider>
            </div>
        )
    }

}

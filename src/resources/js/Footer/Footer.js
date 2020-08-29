import React, { useState, useContext,Fragment  } from 'react';
import { animateScroll as scroll } from 'react-scroll';
export const Footer = () => {

    function pageTop(){
        scroll.scrollToTop();
    }
    return (
        <div className="w-100 footer text-center">

                <div className="col-12 text-center">
                    <i className="fas fa-angle-up txt_XS" onClick={pageTop}></i>
                </div>
                <div className="col-12 mt-3 mb-3 text-center">
                    <p className="txt_XS">© 2020 Team SINJITO</p>
                </div>

        </div>
    );
}
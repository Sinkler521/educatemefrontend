import React from 'react'
import './Cube.css'

export const Cube = ({ classNames, offset, translateZ, mouseX, mouseY }) => {
    const style = {
        transform: `translate3d(${(mouseX / offset) / 2}px, ${(mouseY / offset) / 2}px, ${translateZ}) rotateX(30deg) rotateY(30deg)`
    };
    return (
        <div className="wrap">
            <div className={classNames + ' cube'} style={style}>
                <div className="front"></div>
                <div className="back"></div>
                <div className="top"></div>
                <div className="bottom"></div>
                <div className="left"></div>
                <div className="right"></div>
            </div>
        </div>
    );
}
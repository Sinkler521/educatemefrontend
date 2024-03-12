import React, {useState} from "react";
import './Startnow.css';
import {NavLink} from "react-router-dom";
import {Cube} from '../../Cube/Cube'

export const Startnow = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [indexFirstRow, setIndexFirstRow] = useState({
        'medium-z': [0, 4, 6],
        'strong-z': [1, 2, 7],
    })
    const [indexSecondRow, setIndexSecondRow] = useState({
        'medium-z': [1, 5, 7],
        'strong-z': [0, 2, 6],
    })
    const [indexThirdRow, setIndexThirdRow] = useState({
        'medium-z': [2, 5, 6],
        'strong-z': [1, 3, 6],
    })

    const createLineOfCubes = (cubes, indexRow) => {
        return (
            <div>
                {[...Array(cubes)].map((_, index) => {
                    let classNames = "startnow-floating-square";
                    if (indexRow['medium-z'].includes(index)) {
                        classNames += ' medium-z';
                    }
                    if (indexRow['strong-z'].includes(index)) {
                        classNames += ' strong-z';
                    }
                    const [offset, translateZ] = calcOffsetAndZ(classNames)
                    return (
                        <Cube index={index} classNames={classNames} offset={offset} translateZ={translateZ} mouseX={mousePosition.x} mouseY={mousePosition.y}/>
                    );
                })}
            </div>
        )
    }


    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const boundingRect = e.currentTarget.getBoundingClientRect();
        const offsetX = clientX - boundingRect.left - boundingRect.width / 2;
        const offsetY = clientY - boundingRect.top - boundingRect.height / 2;
        setMousePosition({ x: offsetX, y: offsetY });
    };


    const calcOffsetAndZ = (className) => {
        let offset = 10;
        let translateZ = 0
        if (className.includes('medium-z')) {
            offset = 2;
            translateZ = '-10rem'
        } else if (className.includes('strong-z')) {
            offset = 5;
            translateZ = '-20rem'
        }
        return [offset, translateZ];
    };

    return (
        <>
            <div className="startnow-container" onMouseMove={handleMouseMove}>
                <div className="startnow-content">
                    <h2>Дорога к знаниям лежит тут</h2>
                    <NavLink to='login'>Присоединиться</NavLink>
                </div>
                <div className="startnow-floating-squares-grid">
                    {createLineOfCubes(6, indexFirstRow)}
                    {createLineOfCubes(5, indexSecondRow)}
                    {createLineOfCubes(4, indexThirdRow)}
                </div>
            </div>
        </>
    )
}
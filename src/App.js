import './App.scss';
import { useState, useEffect } from 'react';

import tiles from './tiles.json';

import Board from './components/Board.js';
import Controller from './components/Controller.js';
import Instructions from './components/Instructions.js';
import { getByTitle } from '@testing-library/dom';

function App() {
    const [arrow, setArrow] = useState('\u2B9D');
    const [counterX, setCounterX] = useState(3);
    const [counterY, setCounterY] = useState(3);
    const [arrowTop, setArrowTop] = useState(43.8);
    const [arrowLeft, setArrowLeft] = useState(43.8);
    const [up, setUp] = useState('\u2B9D');
    const [left, setLeft] = useState('');
    const [right, setRight] = useState('');
    const [down, setDown] = useState('');
    const [path, setPath] = useState([]);
    const [errors, setErrors] = useState([]);
    const [errorToggle, setErrorToggle] = useState('off');

    const setCounter = (dir) => {
        const pathData = path;

        if (counterX === 3 && counterY === 3) {
            if (dir === 'ArrowUp') {
                setArrow('\u2B9D');
                setCounterY(counterY + 1);
                setArrowTop(arrowTop - 18);
                setUp('/ w /');
                setLeft('/ j /');
                setRight('/ r /');
                setDown('');
            }
        } else {
            if (dir === 'ArrowUp') {
                if (counterX !== 3 || (counterX === 3 && counterY + 1 !== 3)) {
                    const newPathData = [
                        ...pathData,
                        {
                            x: counterX,
                            y: counterY,
                            chosen: up,
                        },
                    ];
                    setArrow('\u2B9D');
                    setCounterY(counterY + 1);
                    setArrowTop(arrowTop - 18);
                    setUp('/ w /');
                    setLeft('/ j /');
                    setRight('/ r /');
                    setDown('\u2B9F');
                    setPath(newPathData);
                }
            }
            if (dir === 'ArrowDown') {
                if (counterX !== 3 || (counterX === 3 && counterY - 1 !== 3)) {
                    const newPathData = [
                        ...pathData,
                        {
                            x: counterX,
                            y: counterY,
                            chosen: down,
                        },
                    ];
                    setArrow('\u2B9F');
                    setCounterY(counterY - 1);
                    setArrowTop(arrowTop + 18);
                    setUp('\u2B9D');
                    setLeft('/ r /');
                    setRight('/ j /');
                    setDown('/ w /');
                    setPath(newPathData);
                }
            }

            if (dir === 'ArrowLeft') {
                if (counterY !== 3 || (counterY === 3 && counterX - 1 !== 3)) {
                    const newPathData = [
                        ...pathData,
                        {
                            x: counterX,
                            y: counterY,
                            chosen: left,
                        },
                    ];
                    setArrow('\u2B9C');
                    setCounterX(counterX - 1);
                    setArrowLeft(arrowLeft - 18);
                    setUp('/ r /');
                    setLeft('/ w /');
                    setRight('\u2B9E');
                    setDown('/ j /');
                    setPath(newPathData);
                }
            }
            if (dir === 'ArrowRight') {
                if (counterY !== 3 || (counterY === 3 && counterX + 1 !== 3)) {
                    const newPathData = [
                        ...pathData,
                        {
                            x: counterX,
                            y: counterY,
                            chosen: right,
                        },
                    ];
                    setArrow('\u2B9E');
                    setCounterX(counterX + 1);
                    setArrowLeft(arrowLeft + 18);
                    setUp('/ j /');
                    setLeft('\u2B9C');
                    setRight('/ w /');
                    setDown('/ r /');
                    setPath(newPathData);
                }
            }
        }
    };

    useEffect(() => {
        const counter = document.querySelector('#counter');
        counter.style.top = `${arrowTop}%`;
        counter.style.left = `${arrowLeft}%`;
        counterX === 2 && counterY === 3 && setRight('');
        counterX === 4 && counterY === 3 && setLeft('');
        counterX === 3 && counterY === 2 && setUp('');
        counterX === 3 && counterY === 4 && setDown('');
    }, [arrowTop, arrowLeft]);

    const checkPath = () => {
        // console.log('path:', path);
        if (errorToggle === 'off') {
            let checkedErrors = [];
            path.map((step) => {
                tiles.map((tile) => {
                    if (
                        step.x === tile.x &&
                        step.y === tile.y &&
                        step.chosen !== tile.correct
                    ) {
                        const newCheckedErrors = [
                            ...checkedErrors,
                            {
                                x: step.x,
                                y: step.y,
                                correct: tile.correct,
                                chosen: step.chosen,
                            },
                        ];
                        checkedErrors = newCheckedErrors;
                    }
                });
            });
            setErrors(checkedErrors);
            setErrorToggle('on');
        } else {
            setErrorToggle('off');
        }
    };

    console.log('App errorToggle:', errorToggle);
    console.log('errors:', errors);

    return (
        <div className="App">
            <Board
                tiles={tiles}
                setCounter={setCounter}
                arrow={arrow}
                counterX={counterX}
                counterY={counterY}
                path={path}
                errors={errors}
                errorToggle={errorToggle}
            />
            <div className="sidebar">
                <Controller
                    setCounter={setCounter}
                    up={up}
                    right={right}
                    left={left}
                    down={down}
                />
                <Instructions />
                <button className="sidebar__button" onClick={checkPath}>
                    show mistakes
                </button>
            </div>
        </div>
    );
}

export default App;

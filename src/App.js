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
    const [errorToggle, setErrorToggle] = useState('on');

    const setCounter = (dir) => {
        if (counterX > 0 && counterX < 6 && counterY > 0 && counterY < 6) {
            errorToggle === 'on' ? setErrorToggle('off') : setErrorToggle('on');
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
                if (dir === 'ArrowUp' && up !== '') {
                    if (
                        counterX !== 3 ||
                        (counterX === 3 && counterY + 1 !== 3)
                    ) {
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
                        setDown('');
                        setPath(newPathData);
                    }
                }
                if (dir === 'ArrowDown' && down !== '') {
                    if (
                        counterX !== 3 ||
                        (counterX === 3 && counterY - 1 !== 3)
                    ) {
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
                        setUp('');
                        setLeft('/ r /');
                        setRight('/ j /');
                        setDown('/ w /');
                        setPath(newPathData);
                    }
                }

                if (dir === 'ArrowLeft' && left !== '') {
                    if (
                        counterY !== 3 ||
                        (counterY === 3 && counterX - 1 !== 3)
                    ) {
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
                        setRight('');
                        setDown('/ j /');
                        setPath(newPathData);
                    }
                }
                if (dir === 'ArrowRight' && right !== '') {
                    if (
                        counterY !== 3 ||
                        (counterY === 3 && counterX + 1 !== 3)
                    ) {
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
                        setLeft('');
                        setRight('/ w /');
                        setDown('/ r /');
                        setPath(newPathData);
                    }
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
        checkPath();
        if (
            counterX === 0 ||
            counterX === 6 ||
            counterY === 0 ||
            counterY === 6
        ) {
            checkFinish();
        }
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

    // console.log('App errorToggle:', errorToggle);
    // console.log('errors:', errors);
    const checkFinish = () => {
        tiles.map((tile) => {
            if (
                tile.x === counterX &&
                tile.y === counterY &&
                tile.correct === 'yes'
            ) {
                errorToggle === 'on' && setErrorToggle('off');
                checkPath();
                checkResult();
            }
            if (
                tile.x === counterX &&
                tile.y === counterY &&
                tile.correct === 'no'
            ) {
                console.log('result: Sorry bozo, bad exit!');

                return (
                    <div className="results">
                        Sorry, that's the wrong exit - try again!
                    </div>
                );
            }
        });
    };

    const checkResult = () => {
        if (errors === []) {
            console.log('result: You got there - well done!');
            return <div className="results">You got there - well done!</div>;
        } else {
            console.log('result: Sorry bozo!');

            return (
                <div className="results">
                    Sorry, you didn't get it all right - try again!
                </div>
            );
        }
    };

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
                <Instructions />
                <Controller
                    setCounter={setCounter}
                    up={up}
                    right={right}
                    left={left}
                    down={down}
                />
                <button
                    className="sidebar__button sidebar__button--show-errors"
                    onClick={checkPath}
                >
                    show mistakes: {errorToggle}
                </button>
                <button
                    className="sidebar__button"
                    onClick={() => window.location.reload(false)}
                >
                    start again
                </button>
            </div>
        </div>
    );
}

export default App;

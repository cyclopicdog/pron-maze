import './App.scss';
import { useState, useEffect } from 'react';

import Board from './components/Board.js';
import Controller from './components/Controller.js';
import Instructions from './components/Instructions.js';

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

    const setCounter = (dir) => {
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
                    setArrow('\u2B9D');
                    setCounterY(counterY + 1);
                    setArrowTop(arrowTop - 18);
                    setUp('/ w /');
                    setLeft('/ j /');
                    setRight('/ r /');
                    setDown('\u2B9F');
                }
            }
            if (dir === 'ArrowDown') {
                if (counterX !== 3 || (counterX === 3 && counterY - 1 !== 3)) {
                    setArrow('\u2B9F');
                    setCounterY(counterY - 1);
                    setArrowTop(arrowTop + 18);
                    setUp('\u2B9D');
                    setLeft('/ r /');
                    setRight('/ j /');
                    setDown('/ w /');
                }
            }

            if (dir === 'ArrowLeft') {
                if (counterY !== 3 || (counterY === 3 && counterX - 1 !== 3)) {
                    setArrow('\u2B9C');
                    setCounterX(counterX - 1);
                    setArrowLeft(arrowLeft - 18);
                    setUp('/ r /');
                    setLeft('/ w /');
                    setRight('\u2B9E');
                    setDown('/ j /');
                }
            }
            if (dir === 'ArrowRight') {
                if (counterY !== 3 || (counterY === 3 && counterX + 1 !== 3)) {
                    setArrow('\u2B9E');
                    setCounterX(counterX + 1);
                    setArrowLeft(arrowLeft + 18);
                    setUp('/ j /');
                    setLeft('\u2B9C');
                    setRight('/ w /');
                    setDown('/ r /');
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
        console.log({ counterX, counterY });
    }, [arrowTop, arrowLeft]);

    return (
        <div className="App">
            <Board
                setCounter={setCounter}
                arrow={arrow}
                counterX={counterX}
                counterY={counterY}
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
            </div>
        </div>
    );
}

export default App;

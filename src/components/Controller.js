import { useEffect } from 'react';

export default function Controller({ setCounter, up, left, right, down }) {
    return (
        <div className="controller">
            <div className="controller__row controller__row--top">
                <button
                    className="controller__button controller__button--up"
                    onClick={() => setCounter('ArrowUp')}
                >
                    {up}
                </button>
            </div>
            <div className="controller__row controller__row--middle">
                <button
                    className="controller__button controller__button--left"
                    onClick={() => setCounter('ArrowLeft')}
                >
                    {left}
                </button>
                <button
                    className="controller__button controller__button--right"
                    onClick={() => setCounter('ArrowRight')}
                >
                    {right}
                </button>
            </div>
            <div className="controller__row controller__row--bottom">
                <button
                    className="controller__button controller__button--down"
                    onClick={() => setCounter('ArrowDown')}
                >
                    {down}
                </button>
            </div>
        </div>
    );
}

import { state, useState, useEffect } from 'react';

export default function Player() {
    const [arrow, setArrow] = useState('\u2B9D');
    let arrow_top = 43;
    let arrow_left = 45;

    const setCounter = (dir) => {
        const counter = document.querySelector('#counter');

        if (dir === 'ArrowUp') {
            setArrow('\u2B9D');
            arrow_top -= 18;
        }
        if (dir === 'ArrowDown') {
            setArrow('\u2B9F');
            arrow_top += 18;
        }

        if (dir === 'ArrowLeft') {
            setArrow('\u2B9C');
            arrow_left -= 18;
        }
        if (dir === 'ArrowRight') {
            setArrow('\u2B9E');
            arrow_left += 18;
        }

        counter.style.top = `${arrow_top}%`;
        counter.style.left = `${arrow_left}%`;
    };

    useEffect(() => {
        setCounter();
        // only add the event listener when the component is rendered
        window.addEventListener('keydown', (e) => setCounter(e.key));
        // to remove the component when/if the component is unmounted
        return () => {
            window.removeEventListener('keydown', (e) => setCounter(e.key));
        };
    }, []);

    return (
        <div className="player" id="counter">
            {arrow}
        </div>
    );
}

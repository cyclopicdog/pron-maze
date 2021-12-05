import { useEffect } from 'react';

export default function Phrase({ tile, tileNo, counterX, counterY }) {
    const backgroundColor = () => {
        const thisTile = document.getElementById(`${tileNo}`);
        console.log(tileNo);
        tile.x === counterX &&
            tile.y === counterY &&
            thisTile.classList.add('board__visited');
    };
    useEffect(() => {
        backgroundColor();
    }, [counterX, counterY]);

    return (
        <div className="board__tile" id={tileNo}>
            <div className="board__empty-ninth board__empty-ninth--top-left"></div>
            <div className="board__empty-ninth"></div>
            <div className="board__empty-ninth board__empty-ninth--top-right"></div>
            <div className="board__empty-ninth"></div>
            <div className="board__phrase">{tile.phrase}</div>
            <div className="board__empty-ninth"></div>
            <div className="board__empty-ninth board__empty-ninth--bottom-left"></div>
            <div className="board__empty-ninth"></div>
            <div className="board__empty-ninth board__empty-ninth--bottom-right"></div>
        </div>
    );
}

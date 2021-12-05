import { useEffect } from 'react';

export default function Phrase({
    tile,
    tileNo,
    counterX,
    counterY,
    path,
    errors,
    errorToggle,
}) {
    const backgroundColor = () => {
        const thisTile = document.getElementById(`${tileNo}`);
        tile.x === counterX &&
            tile.y === counterY &&
            thisTile.classList.add('board__visited');
    };

    useEffect(() => {
        backgroundColor();
    }, [counterX, counterY]);

    const showError = () => {
        const thisTile = document.getElementById(`${tileNo}`);
        errorToggle === 'on'
            ? errors.map((error) => {
                  if (error.x === tile.x && error.y === tile.y) {
                      thisTile.classList.remove('board__visited');
                      thisTile.classList.add('board__error');
                  }
              })
            : path.map((step) => {
                  if (step.x === tile.x && step.y === tile.y) {
                      thisTile.classList.remove('board__error');
                      thisTile.classList.add('board__visited');
                  }
              });
    };

    useEffect(() => {
        showError();
    }, [errorToggle]);

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

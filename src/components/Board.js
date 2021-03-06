import Exit from './Exit.js';
import Phrase from './Phrase.js';
import Start from './Start.js';
import Player from './Player.js';

export default function Board({
    tiles,
    arrow,
    counterX,
    counterY,
    path,
    errors,
    errorToggle,
}) {
    return (
        <div className="board">
            <Player arrow={arrow} />
            {tiles.map((tile, i) =>
                tile.type === 'exit' ? (
                    <Exit tile={tile} key={i} tileNo={i} />
                ) : tile.type === 'phrase' ? (
                    <Phrase
                        tile={tile}
                        key={i}
                        tileNo={i}
                        counterX={counterX}
                        counterY={counterY}
                        path={path}
                        errors={errors}
                        errorToggle={errorToggle}
                    />
                ) : (
                    tile.type === 'start' && <Start tile={tile} key={i} />
                )
            )}
        </div>
    );
}

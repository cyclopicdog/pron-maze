import tiles from '../tiles.json';
import Exit from './Exit.js';
import Phrase from './Phrase.js';
import Start from './Start.js';
import Player from './Player.js';

export default function Board() {
    const board = document.querySelector('board');

    return (
        <div className="board">
            <Player board={board} />
            {tiles.map((tile, i) =>
                tile.type === 'exit' ? (
                    <Exit tile={tile} key={i} />
                ) : tile.type === 'phrase' ? (
                    <Phrase tile={tile} key={i} />
                ) : (
                    tile.type === 'start' && <Start tile={tile} key={i} />
                )
            )}
        </div>
    );
}

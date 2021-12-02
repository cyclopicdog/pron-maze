export default function Start({ tile, key }) {
    return (
        <div className="board__other-tile board__other-tile--start" key={key}>
            {tile.phrase}
        </div>
    );
}

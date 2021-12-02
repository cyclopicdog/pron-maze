export default function Exit({ tile, key }) {
    return (
        <div className="board__other-tile board__other-tile--exit">
            {tile.phrase}
        </div>
    );
}

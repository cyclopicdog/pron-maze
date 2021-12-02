export default function Phrase({ tile, key }) {
    return (
        <div className="board__tile" key={key}>
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

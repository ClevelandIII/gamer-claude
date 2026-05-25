export default function Game(props) {
    return (
        <div className="gameContain">
            <div className="game" onClick={props.onClick}>
                <img src={props.src} alt={props.name} />
                <p>{props.name}</p>
            </div>
        </div>
    );
}

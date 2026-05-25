export default function CallButton(props) {
    return (
        <section className="callButton">
            <p>Ready? Click the button to get recommendations for new games!</p>
            <button onClick={props.onClick}>Go!</button>
        </section>
    );
}

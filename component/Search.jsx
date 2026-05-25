export default function Search(props) {
    return (
        <>
            <input
                type="text"
                placeholder="Search for a game"
                name="game"
                onChange={props.onChange}
            />
        </>
    );
}

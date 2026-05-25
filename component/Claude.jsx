import ReactMarkdown from "react-markdown";

export default function Claude(props) {
    return (
        <section className="claude" ref={props.ref}>
            <div>
                <ReactMarkdown>{props.recipe}</ReactMarkdown>
            </div>
        </section>
    );
}

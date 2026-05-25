import React from "react";
import Game from "../component/Game";
import Header from "../component/Header";
import Search from "../component/Search";
import { Carousel } from "nuka-carousel";
import List from "../component/List";
import CallButton from "../component/CallButton";
import { getRecommendations } from "../ai";
import Claude from "../component/Claude";

function App() {
    const [games, setGames] = React.useState([]);
    const [searched, setSearched] = React.useState("");
    const [collection, setCollection] = React.useState([]);
    const [claudeResponse, setClaudeResponse] = React.useState("");
    const apiKey = import.meta.env.VITE_API_KEY;
    let pageSize = 20;

    const scroll = React.useRef();

    React.useEffect(() => {
        const url = `https://api.rawg.io/api/games?${searched}&key=${apiKey}`;

        fetch(url, {
            method: "GET",
            headers: { accept: "application/json" },
        })
            .then((result) => result.json())
            .then((data) => setGames(data.results));
    }, [searched]);

    React.useEffect(() => {
        if (claudeResponse != "") {
            scroll.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [claudeResponse]);

    async function getResults(event) {
        console.log(event.get("game"));
        let game = event.get("game");
        setSearched("search=" + game);
    }

    function getName(event) {
        let exists = false;

        const text =
            event.target.innerText == ""
                ? event.target.alt
                : event.target.innerText;

        for (let item of collection) {
            if (item == text) {
                exists = true;
            }
        }

        if (!exists) {
            setCollection((prev) => [...prev, text]);
        }
    }

    const list = games.map((prev) => (
        <Game
            name={prev.name}
            src={prev.background_image}
            key={prev.id}
            onClick={getName}
        />
    ));

    const listCollection = collection.map((prev) => (
        <List name={prev} key={prev} />
    ));

    async function claudeCall() {
        let recommendations = await getRecommendations(collection);
        setClaudeResponse(recommendations);
    }

    return (
        <>
            <Header />
            <form action={getResults}>
                <Search />
            </form>
            {/* <section className="gameContainer">{list}</section> */}
            <Carousel
                showDots
                className="carousel"
                showArrows={true}
                wrapMode="wrap"
                scrollDistance="slide"
            >
                {list}
            </Carousel>

            <section className="names">
                <h2>List of games:</h2>
                <ul>{listCollection}</ul>
            </section>

            <CallButton onClick={claudeCall} />

            <Claude recipe={claudeResponse} ref={scroll} />
        </>
    );
}

export default App;

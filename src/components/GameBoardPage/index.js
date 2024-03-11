import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import './style.css'
import ResultView from '../ResultView';

const tiles = [
    {label: '🎯', value: '🎯'},
    {label: '🪀', value: '🪀'},
    {label: '🪁', value: '🪁'},
    {label: '🔫', value: '🔫'},
    {label: '🎱', value: '🎱'},
    {label: '🔮', value: '🔮'},
    {label: '🪄', value: '🪄'},
    {label: '🎮', value: '🎮'},
    {label: '🕹️', value: '🕹️'},
    {label: '🎰', value: '🎰'},
    {label: '🎲', value: '🎲'},
    {label: '🧩', value: '🧩'},
    {label: '🧸', value: '🧸'},
    {label: '🪅', value: '🪅'},
    {label: '♥️', value: '♥️'},
    {label: '🪆', value: '🪆'},
    {label: '🎯', value: '🎯'},
    {label: '🪀', value: '🪀'},
    {label: '🪁', value: '🪁'},
    {label: '🔫', value: '🔫'},
    {label: '🎱', value: '🎱'},
    {label: '🔮', value: '🔮'},
    {label: '🪄', value: '🪄'},
    {label: '🎮', value: '🎮'},
    {label: '🕹️', value: '🕹️'},
    {label: '🎰', value: '🎰'},
    {label: '🎲', value: '🎲'},
    {label: '🧩', value: '🧩'},
    {label: '🧸', value: '🧸'},
    {label: '🪅', value: '🪅'},
    {label: '♥️', value: '♥️'},
    {label: '🪆', value: '🪆'},
];


const GameBoardPage = () => {

    const [score, setScore] = useState(0);
    const [shuffledTiles, setShuffledTiles] = useState(tiles);
    const [visibleTiles, setVisibleTiles] = useState([]);
    const [previousTile, setPreviousTile] = useState(null);

    const [timeTaken, setTimeTaken] = useState({
        seconds: 0,
        minutes: 0
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if(shuffledTiles.length === visibleTiles.length) {
                clearInterval(interval);
                return;
            }
            setTimeTaken(timeTaken => {
                return {
                    ...timeTaken,
                    seconds: timeTaken.seconds >= 59 ? 0 :timeTaken.seconds + 1,
                    minutes: timeTaken.seconds >= 59 ? timeTaken.minutes + 1 : timeTaken.minutes
                }
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [visibleTiles, shuffledTiles]);

    useEffect(() => {
        const tiles = shuffle(shuffledTiles);
        setShuffledTiles(tiles);
    }, []);

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
    
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
    
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
    
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        return array;
    }

    const handleTileClick = (tile) => {
        // If the tile is already visible or matched, return early
        if (visibleTiles.includes(tile)) {
            return;
        }
    
        setVisibleTiles((prevVisibleTiles) => [...prevVisibleTiles, tile]);
    
        if (previousTile === null) {
            setPreviousTile(tile);
        } else {
            if (previousTile.value === tile.value) {
                setScore(score + 1);
                setPreviousTile(null);
            } else {
                setScore(score - 1);
                setTimeout(() => {
                    setVisibleTiles((prevVisibleTiles) => prevVisibleTiles.filter((t) => t !== tile));
                }, 1000);
            }
        }
    };

    const renderTiles = () => {
        return (
            <div className="tiles-con">
                {shuffledTiles.map((tile, index) => (
                    <div key={index} className={`tile ${previousTile === tile ? 'active-tile' : ''}`} onClick={() => handleTileClick(tile)}>
                        {visibleTiles.includes(tile) ? tile.value : ''}
                    </div>
                ))}
            </div>
        );
    };

    const username = localStorage.getItem('userName');
    const {seconds, minutes} = timeTaken;
    const timeTakenStr = `${`${minutes < 10 ? '0'+minutes : minutes} : ${seconds < 10 ? '0'+seconds : seconds}`}`;

    if(!username) {
        return <Redirect to="/" />
    }

    return (
        <div className="user-name-page-con">
            <h1 className='heading'>Mahajong Game</h1>
            <div className="score-time-con">
                <p className="score-label">Score: {score}</p>
                <p className="score-label">Time: {timeTakenStr}</p>
            </div>
            <div className="game-board-con">
                <h2 className='user-name'>Welcome {username} 👋👋</h2>
                {
                    visibleTiles.length === tiles.length ? <ResultView timeTaken={timeTaken} score={score} />
                    :
                    renderTiles()
                }
            </div>
        </div>
    );
}

export default GameBoardPage;
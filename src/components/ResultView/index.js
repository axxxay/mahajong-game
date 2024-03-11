import './style.css'

const ResultView = ({score, timeTaken}) => {
    const {seconds, minutes} = timeTaken;
    const timeTakenStr = `${`${minutes < 10 ? '0'+minutes : minutes} : ${seconds < 10 ? '0'+seconds : seconds}`}`;
    return (
        <div className="result-view-con">
            <h1 className='result-heading'>Game Finished!</h1>
            <p className="result-label">Score: {score}</p>
            <p className="result-label">Time Taken: {timeTakenStr}</p>
        </div>
    );
}

export default ResultView;
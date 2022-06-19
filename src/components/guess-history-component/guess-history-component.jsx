import { selectGuessHistory } from "../../features/guess-history/guessHistorySlice";
import { useSelector } from "react-redux";

import './guess-history-styles.css';

export const GuessHistory = () => {
    const stateObject = useSelector(selectGuessHistory);
    const guessHistory = stateObject['guessHistory']['history'];
    return (
        <div className="generic-container">
            <h2 className="alphabet-group-title"> Previous Guesses </h2>
            <div className="row-3">
                { guessHistory.map((word) => {
                    return(
                        <p key={word} className="word-option">{word}</p>
                    )
                })}
            </div>
        </div>
    )
}

export default GuessHistory;

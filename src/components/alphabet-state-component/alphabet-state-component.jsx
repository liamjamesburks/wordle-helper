import { selectAlphabetState } from "../../features/alphabet-state/alphabetStateSlice";
import { useSelector } from "react-redux";

import './alphabet-state-styles.css';

const letterGrid = [0, 1, 2, 3, 4];

export const AlphabetState = () => {
    const alphabetState = useSelector(selectAlphabetState).alphabetState;

    return (
        <div>
            <div className="generic-container">
                <h2 className="alphabet-group-title">
                    Alphabet State Grid
                </h2>

                <div className="alphabet-group-container">
                    {
                        Object.keys(alphabetState).map((key) => {
                            let bg = '';
                            if (alphabetState[key].state === "invalid") {
                                bg = 'invalid';
                            } else if (alphabetState[key].state === "valid") {
                                bg = 'valid';
                            }
                            return (
                                <div key={key} className={`letter-state-container ${bg}`}>
                                    <div>
                                        <p className="letter bold"> {key} </p>
                                    </div>

                                    <div>
                                        <p className="letter"> {alphabetState[key]['state']} </p>
                                    </div>

                                    { letterGrid.map((index) => {
                                        if (index in alphabetState[key]['possibleIndices'] && alphabetState[key]['state'] === "valid") {
                                            return (
                                                <p key={`${key}-index-${index}`} className={alphabetState[key]['possibleIndices'][index] ? 'index-display exact' : 'index-display unknown'}></p>
                                            )
                                        } else if (alphabetState[key]['state'] === "unknown") {
                                            return (
                                                <p key={`${key}-index-${index}`} className={`index-display`}> </p>
                                            )
                                        }
                                        else {
                                            return (
                                                <p key={`${key}-index-${index}`} className={`index-display invalid`}> </p>
                                            )
                                        }
                                    })}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default AlphabetState;

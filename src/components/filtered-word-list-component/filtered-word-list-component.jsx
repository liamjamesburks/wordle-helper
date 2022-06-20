import './filtered-word-list-styles.css';
import {useSelector} from "react-redux";
import {selectAlphabetState} from "../../features/alphabet-state/alphabetStateSlice";

import { ChartBarIcon } from "@heroicons/react/outline";

const FilteredWordList = (props) => {
    const { filteredList, title, wordLimit, suggestions } = props;

    const store = useSelector(selectAlphabetState);
    const guessHistory = store.guessHistory.history;

    return (
        <div className="generic-container">
            <div className="total-count-text">
                <p>{ filteredList.length }</p>
                <ChartBarIcon className="total-count-icon"/>
            </div>
            <h2 className="alphabet-group-title">
                { title }
            </h2>
            <h4 className="subtitle">
                { (guessHistory.length === 0) ? 'Enter a word to begin filtering the options' :
                    (
                        (filteredList.length > wordLimit) ? "We'll need more guesses to filter the options down to a useful size" : ''
                    )
                }
            </h4>
            { filteredList.length <= wordLimit ?
                (
                    <div className="word-list-container">
                        {
                            filteredList.map((word) => {
                                return (
                                    <p className="word-option word-col" key={word}>{word}</p>
                                )
                            })
                        }
                    </div>
                ) :
                (
                    <div className='further-instructions'>
                        {
                            ((guessHistory.length === 0) && (suggestions)) ? (
                                "We'll need more guesses to narrow down the options. Why don't you start with one of the following"
                            ) : ''
                        }
                        {
                            ((guessHistory.length === 0) && (suggestions)) ? (
                                suggestions.map((suggestion) => {
                                    return (
                                        <p key={suggestion} className="word-option">
                                            {suggestion}
                                        </p>
                                    )
                                })
                            ) : ''
                        }
                    </div>
                )
            }
        </div>
    )
}

export default FilteredWordList;
import React from 'react';
import { wordListJson } from "./resources/word-list-json";

import { useDispatch, useSelector } from "react-redux";
import { selectAlphabetState, resetAlphabetState } from "./features/alphabet-state/alphabetStateSlice";
import { resetHistoryState } from "./features/guess-history/guessHistorySlice";
import { resetState } from "./features/word-input-state/wordInputStateSlice";
import { changeLetter } from "./features/word-input-state/wordInputStateSlice";
import { useState, useEffect } from "react";

import WordInput from "./components/word-input/word-input-component";
import AlphabetState from "./components/alphabet-state-component/alphabet-state-component";
import FilteredWordList from "./components/filtered-word-list-component/filtered-word-list-component";
import GuessHistory from "./components/guess-history-component/guess-history-component";
import InformationModal from "./components/information-modal/information-modal-component";
import Footer from "./components/footer-component/footer-component";

import { RefreshIcon } from '@heroicons/react/outline';
import { LightBulbIcon } from "@heroicons/react/outline";

import './App.css';

const suggestions = [
    'SLATE',
    'CRANE',
    'DEPOT',
    'TRIED'
]

function App() {
    const dispatch = useDispatch();

    const [ wordList, setWordList ] = useState(wordListJson['words']);
    const [ wordListUnused, setWordListUnused ] = useState(wordListJson['words']);
    const [ informationModal, setInformationModal ] = useState(false);

    const store = useSelector(selectAlphabetState);
    const alphabetState = store.alphabetState.alphabetState;

    const handleSuggestionClick = (event) => {
        const suggestion = event.target.textContent;

        dispatch(changeLetter({'position': '0', 'letter': suggestion[0].toLowerCase()}))
        dispatch(changeLetter({'position': '1', 'letter': suggestion[1].toLowerCase()}))
        dispatch(changeLetter({'position': '2', 'letter': suggestion[2].toLowerCase()}))
        dispatch(changeLetter({'position': '3', 'letter': suggestion[3].toLowerCase()}))
        dispatch(changeLetter({'position': '4', 'letter': suggestion[4].toLowerCase()}))

        document.getElementById('0').value = suggestion[0];
        document.getElementById('1').value = suggestion[1];
        document.getElementById('2').value = suggestion[2];
        document.getElementById('3').value = suggestion[3];
        document.getElementById('4').value = suggestion[4];
    }

    const filterWordListUnused = () => {
        let filteredWordListUnused = [];

        for (let i=0; i<wordListUnused.length; i++) {
            let unusedLettersWord = true;
            let currentWord = wordListUnused[i];
            for (let j=0; j<currentWord.length; j++) {
                let currentLetterState = alphabetState[currentWord[j]];

                if  (currentLetterState['state'] !== "unknown") {
                    unusedLettersWord = false;
                }
            }

            if(unusedLettersWord) {
                filteredWordListUnused.push(currentWord);
            }
        }
        setWordListUnused(filteredWordListUnused);
    }

    const filterWordList = () => {
        let filteredWordList = [];

        for (let i=0; i<wordList.length; i++) {
            let validWord = true;
            let currentWord = wordList[i];

            for (let j=0; j<currentWord.length; j++) {
                let currentLetterState = alphabetState[currentWord[j]];

                if (currentLetterState['state'] === "invalid") {
                    validWord = false;
                }
                else if ((currentLetterState['state'] === "valid") || (currentLetterState['state'] === "unknown")) {
                    let validLetter = false;
                    let currentLetterStatePossibleIndices = Object.keys(currentLetterState['possibleIndices']);
                    for (let k = 0; k < currentLetterStatePossibleIndices.length; k++) {
                        if (Number(currentLetterStatePossibleIndices[k]) === j) {
                            validLetter = true;
                        }
                    }

                    if (!validLetter) {
                        validWord = false;
                    }
                }
            }

            Object.keys(alphabetState).forEach((character) => {
                let idealState = alphabetState[character];

                if ((idealState['state'] === "valid") && !(currentWord.includes(character))) {
                    validWord = false;
                }
            })

            if (validWord) {
                filteredWordList.push(currentWord);
            }
        }

        setWordList(filteredWordList);
    }

    const clearState = () => {
        dispatch(resetState());
        dispatch(resetHistoryState());
        dispatch(resetAlphabetState());

        document.getElementById('0').value = '';
        document.getElementById('1').value = '';
        document.getElementById('2').value = '';
        document.getElementById('3').value = '';
        document.getElementById('4').value = '';

        setWordList(wordListJson['words']);
        setWordListUnused(wordListJson['words']);
    };

    useEffect(() => {
        filterWordList();
        filterWordListUnused();
    }, [alphabetState]);

    return (
        <div className="full-app-container">
            {
                informationModal ? <InformationModal onClick={() => setInformationModal(!informationModal)}/> : ''
            }
            <div className="app">
                <div className="generic-container">
                    <button className="information-button tooltip"
                            onClick={() => setInformationModal(!informationModal)}
                            onKeyDown={() => {
                                if (informationModal) setInformationModal(!informationModal);
                            }}
                    >
                        <LightBulbIcon className="information-button-icon" />
                        <span className="tooltiptext">
                            How to Guide
                        </span>
                    </button>
                    <h1 className="app-title">
                        Wordle Helper
                    </h1>
                    <button className="refresh-button tooltip" onClick={clearState}>
                        <RefreshIcon className="refresh-button-icon" />
                        <span className="tooltiptext">
                        Refresh
                    </span>
                    </button>
                </div>

                <div className="app-content">
                    <div className='app-column'>
                        <div className="centred">
                            <WordInput />
                        </div>
                        <div className="centred">
                            <FilteredWordList
                                filteredList={wordList}
                                title="Possible Options"
                                suggestions={suggestions}
                                handleSuggestionClick={handleSuggestionClick}
                                wordLimit={200}
                            />
                        </div>
                    </div>

                    <div className='app-column'>
                        <GuessHistory/>
                        <div className="centred">
                            <FilteredWordList
                                filteredList={wordListUnused}
                                title="Information Gain"
                                handleSuggestionClick={handleSuggestionClick}
                                wordLimit={500}
                            />
                        </div>
                        <AlphabetState />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default App;

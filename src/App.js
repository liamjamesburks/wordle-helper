import React from 'react';
import { wordListJson } from "./resources/word-list-json";

import { useSelector } from "react-redux";
import { selectAlphabetState } from "./features/alphabet-state/alphabetStateSlice";
import { useState, useEffect } from "react";

import WordInput from "./components/word-input/word-input-component";
import AlphabetState from "./components/alphabet-state-component/alphabet-state-component";
import FilteredWordList from "./components/filtered-word-list-component/filtered-word-list-component";
import GuessHistory from "./components/guess-history-component/guess-history-component";

import { RefreshIcon } from '@heroicons/react/outline';

import './App.css';

const suggestions = [
    'SLATE',
    'CRANE',
    'DEPOT',
    'TRIED'
]

function App() {
    const [ wordList, setWordList ] = useState(wordListJson['words']);
    const [ wordListUnused, setWordListUnused ] = useState(wordListJson['words']);

    const store = useSelector(selectAlphabetState);
    const alphabetState = store.alphabetState;
    // const guessHistory = store.history;

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
        document.location.reload();
    };

    useEffect(() => {
        filterWordList();
        filterWordListUnused();
    }, [alphabetState]);

    return (
        <div className="app">
            <div className="generic-container m-4">
                <h1 className="app-title">
                    Wordle Helper
                </h1>
                <button className="refresh-button" onClick={clearState}>
                    <RefreshIcon className="refresh-button-icon" />
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
                            wordLimit={500}
                        />
                    </div>
                    <AlphabetState />
                </div>
            </div>
        </div>
    );
}

export default App;

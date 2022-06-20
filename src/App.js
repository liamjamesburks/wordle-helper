import React from 'react';
import { wordListJson } from "./resources/word-list-json";

import { useSelector } from "react-redux";
import { selectAlphabetState } from "./features/alphabet-state/alphabetStateSlice";
import { useState, useEffect } from "react";

import WordInput from "./components/word-input/word-input-component";
import AlphabetState from "./components/alphabet-state-component/alphabet-state-component";
import FilteredWordList from "./components/filtered-word-list-component/filtered-word-list-component";
import GuessHistory from "./components/guess-history-component/guess-history-component";

import './App.css';

function App() {
    const [ wordList, setWordList ] = useState(wordListJson['words']);
    const [ wordListUnused, setWordListUnused ] = useState(wordListJson['words']);
    const alphabetState = useSelector(selectAlphabetState).alphabetState;

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
            </div>

            <div className="app-content">
                <div className='app-column'>
                    <div className="centred">
                        <WordInput />
                    </div>
                    <div className="centred">
                        <FilteredWordList filteredList={wordList} title="Possible Options" subtitle="These words obey all the rules you've provided so far." instructions="Make more guesses to filter the list further down." wordLimit={200}/>
                    </div>
                </div>

                <div className='app-column'>
                    <GuessHistory/>
                    <div className="centred">
                        <FilteredWordList filteredList={wordListUnused} title="Information Gain" subtitle="These words don't contain any of the letters you've already used." instructions="These may not be correct, but they will provide more information than re-using letters." wordLimit={500}/>
                    </div>
                    <AlphabetState />
                </div>
            </div>
        </div>
    );
}

export default App;

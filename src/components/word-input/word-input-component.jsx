import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
    changeLetterState
} from "../../features/alphabet-state/alphabetStateSlice";
import {
    addGuess
} from "../../features/guess-history/guessHistorySlice";

import LetterInput from "../letter-input/letter-input-component";
import './word-input-styles.css';

const WordInput = () => {
    const dispatch = useDispatch();

    const [letters, setLetters] = useState({
        '0': { 'letter': '', 'colour': null },
        '1': { 'letter': '', 'colour': null },
        '2': { 'letter': '', 'colour': null },
        '3': { 'letter': '', 'colour': null },
        '4': { 'letter': '', 'colour': null },
    });
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        let checkValid = true;
        Object.keys(letters).forEach((key) => {
            if (!letters[key]['letter'] || !letters[key]['colour']) {
                checkValid = false;
            }
        })

        setEnabled(checkValid);
    }, [letters])

    const handleGoClick = () => {
        let newGuess='';
        Object.keys(letters).forEach((key) => {
            newGuess += String(letters[key]['letter']);
        })
        dispatch(addGuess(newGuess));

        Object.keys(letters).forEach((key) => {
            const index = key;
            const character = letters[key].letter;
            const colour = letters[key].colour;

            let validLetter;
            let validPosition;

            switch (colour) {
                case 'red':
                    validPosition = false;
                    validLetter = false;
                    break;
                case 'orange':
                    validPosition = false;
                    validLetter = true;
                    break;
                case 'green':
                    validPosition = true;
                    validLetter = true;
                    break;
                default:
                    validPosition = false;
                    validLetter = false;
            }

            dispatch(changeLetterState({ character, index, validLetter, validPosition }));
        })

    }

    const handleClearClick = () => {
        let initialState = {
            '0': { 'letter': '', 'colour': null },
            '1': { 'letter': '', 'colour': null },
            '2': { 'letter': '', 'colour': null },
            '3': { 'letter': '', 'colour': null },
            '4': { 'letter': '', 'colour': null },
        }
        setLetters(initialState);

        document.getElementById('0').value = '';
        document.getElementById('1').value = '';
        document.getElementById('2').value = '';
        document.getElementById('3').value = '';
        document.getElementById('4').value = '';

        document.getElementById('0').focus();
    }

    const handleLetterChange = (event) => {
        const newLetters = {};
        Object.assign(newLetters, letters);
        newLetters[event.target.id]['letter'] = event.target.value;
        setLetters(newLetters);
    }

    const handleColourChange = (colourDictionary) => {
        const newLetters = {};
        Object.assign(newLetters, letters);

        newLetters[colourDictionary.position]['colour'] = colourDictionary.colour;
        setLetters(newLetters);

        if ((colourDictionary.position) !== 4) {
            const nextInput = Number(colourDictionary.position)+1;
            document.getElementById(String(nextInput)).focus();
        }
    }

    return (
        <div className="generic-container">
            <div className='word-input-container'>
                <LetterInput key={0} position={0} handleLetterChange={handleLetterChange} handleColourChange={handleColourChange} colour={letters['0']['colour']} value={letters['0']['letter']}/>
                <LetterInput key={1} position={1} handleLetterChange={handleLetterChange} handleColourChange={handleColourChange} colour={letters['1']['colour']} value={letters['1']['letter']}/>
                <LetterInput key={2} position={2} handleLetterChange={handleLetterChange} handleColourChange={handleColourChange} colour={letters['2']['colour']} value={letters['2']['letter']}/>
                <LetterInput key={3} position={3} handleLetterChange={handleLetterChange} handleColourChange={handleColourChange} colour={letters['3']['colour']} value={letters['3']['letter']}/>
                <LetterInput key={4} position={4} handleLetterChange={handleLetterChange} handleColourChange={handleColourChange} colour={letters['4']['colour']} value={letters['4']['letter']}/>
            </div>
            <div className='btn-container'>
                <button className="action-button" disabled={!enabled} onClick={handleGoClick}>Go</button>
                <button className="action-button" disabled={!enabled} onClick={handleClearClick}>Clear</button>
            </div>
        </div>
    )
}

export default WordInput;
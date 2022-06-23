import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    changeLetterState, selectAlphabetState
} from "../../features/alphabet-state/alphabetStateSlice";
import {
    addGuess
} from "../../features/guess-history/guessHistorySlice";
import {
    changeLetter,
    changeColour,
    resetState,
    selectWordInput
} from "../../features/word-input-state/wordInputStateSlice";

import LetterInput from "../letter-input/letter-input-component";
import { SearchIcon, TrashIcon } from '@heroicons/react/outline';

import './word-input-styles.css';

const WordInput = () => {
    const dispatch = useDispatch();
    const wordInputState = useSelector(selectWordInput).wordInput.input;

    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        let checkValid = true;
        Object.keys(wordInputState).forEach((key) => {
            if (!wordInputState[key]['letter'] || !wordInputState[key]['colour']) {
                checkValid = false;
            }
        })

        setEnabled(checkValid);
    }, [wordInputState])

    const handleGoClick = () => {
        let newGuess='';
        Object.keys(wordInputState).forEach((key) => {
            newGuess += String(wordInputState[key]['letter']);
        })
        dispatch(addGuess(newGuess));

        Object.keys(wordInputState).forEach((key) => {
            const index = key;
            const character = wordInputState[key].letter;
            const colour = wordInputState[key].colour;

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
        dispatch(resetState());

        document.getElementById('0').value = '';
        document.getElementById('1').value = '';
        document.getElementById('2').value = '';
        document.getElementById('3').value = '';
        document.getElementById('4').value = '';
    }

    const handleLetterChange = (event) => {
        dispatch(
            changeLetter(
            {
                    'position': event.currentTarget.id,
                    'letter': event.currentTarget.value.toLowerCase()
                }
            )
        )

        /*
        If user deleted a letter, and no letters after the current letter are populated
         */
        if (
            ((event.currentTarget.value) === "") &&
            ((event.currentTarget.id) !== "0")
        ) {
            console.log(event.currentTarget.id);
            let isLetterAfterEmpty = true;
            for (let x=Number(event.currentTarget.id)+1; x<5; x++) {
                if (wordInputState[x].letter !== "") {
                    isLetterAfterEmpty = false;
                }
            }
            if (isLetterAfterEmpty || event.currentTarget.id === "4") {
                const nextInput = Number(event.currentTarget.id)-1;
                document.getElementById(String(nextInput)).focus();
            }
        }
        else if ((event.currentTarget.id) !== "4" && ((event.currentTarget.value) !== "")) {
            const nextInput = Number(event.currentTarget.id)+1;
            document.getElementById(String(nextInput)).focus();
        }
    }

    const handleColourChange = (colourDictionary) => {
        dispatch(
            changeColour(
                {
                    'position': colourDictionary.position,
                    'colour': colourDictionary.colour
                }
            )
        )
    }

    return (
        <div className="generic-container">
            <div className='word-input-container'>
                <LetterInput key={0} position={0} handleLetterChange={handleLetterChange} handleColourChange={handleColourChange} colour={wordInputState['0']['colour']} />
                <LetterInput key={1} position={1} handleLetterChange={handleLetterChange} handleColourChange={handleColourChange} colour={wordInputState['1']['colour']} />
                <LetterInput key={2} position={2} handleLetterChange={handleLetterChange} handleColourChange={handleColourChange} colour={wordInputState['2']['colour']} />
                <LetterInput key={3} position={3} handleLetterChange={handleLetterChange} handleColourChange={handleColourChange} colour={wordInputState['3']['colour']} />
                <LetterInput key={4} position={4} handleLetterChange={handleLetterChange} handleColourChange={handleColourChange} colour={wordInputState['4']['colour']} />
            </div>
            <div className='btn-container'>
                <button className="action-button" disabled={!enabled} onClick={handleGoClick}>
                    <p className="hidden-small">Go</p>
                    <SearchIcon className="button-icon" />
                </button>
                <button className="action-button" onClick={handleClearClick}>
                    <p className="hidden-small">Clear</p>
                    <TrashIcon className="button-icon" />
                </button>
            </div>
        </div>
    )
}

export default WordInput;
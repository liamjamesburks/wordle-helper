import './letter-input-styles.css';
import '../../App.css';
import {useDispatch, useSelector} from "react-redux";
import {selectWordInput} from "../../features/word-input-state/wordInputStateSlice";
import { useEffect } from "react";


const LetterInput = (props) => {
    const handleColourChange = (event) => {
        let colourChangeDictionary = {
            'position': props.position,
            'colour': event.target.id
        }
        props.handleColourChange(colourChangeDictionary);
    }

    return (
        <div className="letter-input-group-container">
            <input id={props.position} className={`letter-input-container bg-${props.colour}`} type="text" maxLength={1} onChange={props.handleLetterChange} required autoComplete="off"/>
            <button type="button" id="green" className="validity-button bg-green hover-bg-green" onClick={handleColourChange}>
            </button>

            <button type="button" id="orange" className="validity-button bg-orange hover-bg-orange" onClick={handleColourChange} >
            </button>

            <button type="button" id="red" className="validity-button bg-red hover-bg-red" onClick={handleColourChange}>
            </button>

        </div>
    )
}

export default LetterInput;
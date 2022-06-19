import './letter-input-styles.css';
import '../../App.css';

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
            <input id={props.position} className={`letter-input-container bg-${props.colour}`} value={props.letter} type="text" maxLength={1} onChange={props.handleLetterChange} required/>
            <button type="button" id="green" className="validity-button green" onClick={handleColourChange} />
            <button type="button" id="orange" className="validity-button orange" onClick={handleColourChange} />
            <button type="button" id="red" className="validity-button red" onClick={handleColourChange} />
        </div>
    )
}

export default LetterInput;
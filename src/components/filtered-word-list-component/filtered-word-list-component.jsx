import './filtered-word-list-styles.css';

const FilteredWordList = (props) => {
    const { filteredList, title, subtitle, instructions, wordLimit} = props;

    return (
        <div className="generic-container">
            <h2 className="alphabet-group-title">
                { title }
            </h2>
            <h4 className="subtitle">
                { subtitle } [{ filteredList.length} options]
            </h4>
            { filteredList.length <= wordLimit ?
                (
                    <div className="word-list-container">
                        {
                            filteredList.map((word) => {
                                return (
                                    <p className="word-option" key={word}>{word}</p>
                                )
                            })
                        }
                    </div>
                ) :
                (
                    <p className='further-instructions'> { instructions } </p>
                )
            }
        </div>
    )
}

export default FilteredWordList;
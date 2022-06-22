import './information-modal-component-styles.css';

const InformationModal = (props) => {
    return (
        <div>
            <div className="grayed-out" onClick={props.onClick}>
                <div className="information-modal">
                    <div className="information-modal-title">
                        How to Use the Wordle Helper
                    </div>
                    <span className="line"/>

                    <div className="step-divider">
                        <h2 className="information-modal-list-decorator"> Step 1 </h2>
                        <p className="information-modal-step"> Enter a guess for an actual Wordle game. </p>
                    </div>
                    <span className="line"/>

                    <div className="step-divider">
                        <h2 className="information-modal-list-decorator"> Step 2 </h2>
                        <p className="information-modal-step">
                            Enter the result of your guess into the text fields on this helper. You can click on the buttons under the text fields to input their colour.
                            <div className="flex">
                                <div className="gr"></div>
                                <p> means your letter was in the word and in the correct place.</p>
                            </div>
                            <div className="flex">
                                <div className="ye"></div>
                                <p> means your letter was in the word but not in the correct place.</p>
                            </div>
                            <div className="flex">
                                <div className="re"></div>
                                <p> means your letter was not in the word.</p>
                            </div>
                        </p>
                    </div>
                    <span className="line"/>

                    <div className="step-divider">
                        <h2 className="information-modal-list-decorator"> Step 3 </h2>
                        <p className="information-modal-step"> Press go to enter the guess, or clear to reset the input fields. </p>
                    </div>
                    <span className="line"/>

                    <div className="step-divider">
                        <h2 className="information-modal-list-decorator"> Step 4 </h2>
                        <p className="information-modal-step"> You should see your guess added to the list of 'Previous Guesses'. You will also see a list of 'Possible Options', which you can slick on to automatically fill in the word. </p>
                    </div>
                    <span className="line"/>

                    <div className="step-divider">
                        <h2 className="information-modal-list-decorator"> Step 5 </h2>
                        <p className="information-modal-step"> If you would like to reset all your guesses, click the refresh button on the top right corner of the app. </p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default InformationModal;
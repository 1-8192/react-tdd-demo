import React from 'react';
import PropTypes from 'prop-types';

import languageContext from './contexts/languageContext';
import stringsModule from './helpers/strings';
import successContext from './contexts/successContext';

function Input ( { secretWord }) {
    const language = React.useContext(languageContext);
    const [success, setSuccess] = successContext.useSuccess();
    const [ currentGuess, setCurrentGuess ] = React.useState("");

    if (success) { return null }
    
    return (
        <div data-test="input-component">
            <form className="form-inline">
                <input 
                    data-test="input-box"
                    className="mb-2 mx-sm-3"
                    type="text"
                    placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
                    value={currentGuess}
                    onChange={(event) => setCurrentGuess(event.target.value)}
                />
                <button 
                    data-test="submit-button"
                    className="btn btn-primary mb-2"
                    onClick={(event) => {
                        event.preventDefault();
                        setCurrentGuess("")}}>
                    {stringsModule.getStringByLanguage(language, 'submit')}
                </button>
            </form>
        </div>
    )
};

Input.propTypes = {
    secretWord: PropTypes.string.isRequired
};

export default Input
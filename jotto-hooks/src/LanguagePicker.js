import React from 'react';
import propTypes from 'prop-types';

function LanguagePicker({ setLanguage } ) {
    return (
        <div data-test="language-picker">
            empty
        </div>
    )
};

LanguagePicker.propTypes = {
    setLanguage: propTypes.func.isRequired
};

export default LanguagePicker;
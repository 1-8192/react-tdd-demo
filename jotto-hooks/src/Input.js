import React from 'react';
import PropTypes from 'prop-types';

function Input ( { secretWord }) {
    return (
        <div data-test="input-component" />
    )
};

Input.propTypes = {
    secretWord: PropTypes.string.isRequired
};

export default Input
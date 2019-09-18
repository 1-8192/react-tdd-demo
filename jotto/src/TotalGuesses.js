import React from 'react';

const TotalGuesses = (props) => {
    return (
        <div data-test="total-guesses">
            <h3>Total guesses: {props.guessCount}</h3>
        </div>
    );
};

export default TotalGuesses;
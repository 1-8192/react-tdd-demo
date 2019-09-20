import React from 'react';
import './App.css';
import hookActions from './actions/hookActions';

import Input from './Input';

//reducer to update state needed for hooks
function reducer(state, action) {
  switch(action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload}
    default:
      throw new Error(`invalid action type: ${action.type}`);
  }
};

function App() {
  //hook that uses reducer above
  const [state, dispatch] = React.useReducer(reducer, { secretWord: "" });

  //function that dispatches in correct format
  const setSecretWord = (secretWord) => 
    dispatch({ type: "SetSecretWord", payload: secretWord})

  //empty array makes this run once on mount, basically like ComponentDidMount
  React.useEffect(
    () => { hookActions.getSecretWord() },
    []
  )

  return (
    <div data-test="app-component">
      <Input secretWord={state.secretWord} />
    </div>
  );
}

export default App;

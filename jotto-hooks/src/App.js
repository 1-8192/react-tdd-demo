import React from 'react';
import './App.css';
import hookActions from './actions/hookActions';
import languageContext from './contexts/languageContext'

import LanguagePicker from './LanguagePicker';
import Input from './Input';

//reducer to update state needed for hooks
function reducer(state, action) {
  switch(action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload}
    case "setLanguage":
      return { ...state, language: action.payload}
    default:
      throw new Error(`invalid action type: ${action.type}`);
  }
};

function App() {
  //hook that uses reducer above
  const [state, dispatch] = React.useReducer(reducer, 
    { secretWord: null, language: 'en' }
    );

  //function that dispatches in correct format
  const setSecretWord = (secretWord) => 
    dispatch({ type: "SetSecretWord", payload: secretWord});

  const setLanguage = (language) => 
    dispatch({ type: "setLanguage", payload: language});

  //empty array makes this run once on mount, basically like ComponentDidMount
  React.useEffect(
    () => { hookActions.getSecretWord() },
    []
  )
  
  //spinner while word is loading
  if (!state.secretWord) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word</p>
      </div>
    )
  }

  return (
    <div className="container" data-test="app-component">
      <h1>Jotto</h1>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <Input secretWord={state.secretWord} />
      </languageContext.Provider>
    </div>
  );
}

export default App;

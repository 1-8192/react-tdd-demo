import React from 'react'

const guessedWordsContext = React.createContext()

export function useGuessedWords() {
    const context = React.useContext(guessedWordsContext)

    if (!context) {
        throw new Error('useGuessedWords must be used within provider')
    }

    return context 
}

export function GuessedWordsProvider(props) {
    //create state with default empty array
    const [guessedWords, setGuessedWords] = React.useState([])

    //useMemo stores function return in cache so it only updates when needed
    const value = React.memo(() => [guessedWords, setGuessedWords], [guessedWords])

    return <guessedWordsContext.Provider value={value} {...props} />
}

export default { GuessedWordsProvider, useGuessedWords }
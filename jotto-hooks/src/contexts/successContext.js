import React from 'react';

const successContext = React.createContext();

function useSuccess() {

    const context = React.useContext(successContext);

    if (!context) {
        throw new Error('useSuccess must be used in provider')
    }

    return context;
}

function SuccessProvider(props) {
    //sets up state with false as default value
    const [success, setSuccess] = React.useState(false);

    const value = React.useMemo(() => [success, setSuccess], [success]);

    return <successContext.Provider value={value} {...props}/>
}

export default { SuccessProvider, useSuccess }
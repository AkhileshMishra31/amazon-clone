import React, { createContext, useContext, useReducer } from 'react';
// prepare the DataLayer
export const StateContext = createContext();
// wrap our App provide the data layer
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);
// pulll the information form the data
export const useStateValue = () => useContext(StateContext)
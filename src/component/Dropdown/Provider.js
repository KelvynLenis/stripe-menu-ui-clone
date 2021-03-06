import React, { useCallback, useEffect, useState } from 'react';

export const Context = React.createContext();

React.useContext(Context);

export function DropdownProvider({ children }) {
    const [options, setOptions] = useState([]);
    const [targetId, setTargetId] = useState(null);
    const [cachedId, setCachedId] = useState(null);

    const registerOption = useCallback(({ 
        id,
        optionDimension, 
        optionCenterX, 
        WrappedContent, 
        backgroundHeight, 
    }) => {
        setOptions(items => [
            ...items,
            {
                id,
                optionDimension, 
                optionCenterX, 
                WrappedContent, 
                backgroundHeight,  
            }
        ]);
    }, [setOptions]);

    const updateOptionProps =useCallback((optionId, props) => {
        setOptions(
            items => items.map(item => {
            if(item.id === optionId){
                item = { ...item, ...props};
            }
        }))
    }, [setOptions]);

    const getOptionById = useCallback((id) => options.find((item) => item.id === id), [options]);
    
    const deleteOptionById = useCallback((id) => {
        setOptions(items => items.filter(item => item.id !== id))
    }, [setOptions]);

    useEffect(() => {
        if(targetId !== null) {
            setCachedId(targetId);
        }
    }, [targetId]);

    return (
        <Context.Provider
            value={{
                registerOption,
                updateOptionProps,
                getOptionById,
                deleteOptionById,
                options,
                targetId,
                setTargetId,
                cachedId,
                setCachedId
            }}
        >
            {children}
        </Context.Provider>
    )
}

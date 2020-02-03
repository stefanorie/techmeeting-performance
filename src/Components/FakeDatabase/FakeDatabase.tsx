import React, { useState, useEffect } from 'react';

interface IState {
    products: any;
    sales: any;
    shops: any;
}

export const FakeDatabaseContext = React.createContext<[IState, React.Dispatch<React.SetStateAction<Partial<IState>>>]>([undefined, undefined]);

export default function FakeDatabaseContextProvider(props: React.PropsWithChildren<{}>) {
    const [state, setState] = useState<IState>({
        products: [],
        sales: [],
        shops: [],
    });

    useEffect(() => {
        initialize();
    }, []);

    function initialize() {
        // TODO: implement
        // initialize all dummy data
    }

    function updateState(newState: React.SetStateAction<Partial<IState>>) {
        setState((prevState: IState): IState => ({
            ...prevState,
            ...(typeof newState === 'function'
                ? newState(prevState)
                : newState
            ),
        }));
    }

    function addProduct() {
        // TODO: implement
    }

    function editProduct() {
        // TODO: implement
    }

    function removeProduct() {
        // TODO: implement
    }

    return (
        <FakeDatabaseContext.Provider value={[state, updateState]}>
            {props.children}
        </FakeDatabaseContext.Provider>
    );
}

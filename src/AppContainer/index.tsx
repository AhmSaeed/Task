/*
The most parent container for the application.
It wrappes the whole application units including navigation container. 
 */
import React from 'react';
import RootSwitchNav from '../navigations/RootSwitchNav';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

const AppContainer = (props) => {

    //Wrap root navigation with provider and persistGate
    return (
        <Provider store={props.store}>
            <PersistGate loading={null} persistor={props.persistor}>
                <RootSwitchNav/>
            </PersistGate>{/*It provides application with pesisted state*/}
        </Provider>//It provides application with store state
    );
}

export default AppContainer;
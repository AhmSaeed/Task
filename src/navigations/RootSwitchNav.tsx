/**
 * Here is the Main stack screen which holds all navigation types.
 * It contains a switch between Home Stack (authenticated user) and Login & Registration screen (non authenticated user)
 */
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNav from './DrawerNav';
import RegistrationStackNav from './RegistrationStackNav';
import { LIGHT, DARK} from '../themes/colors';
import { useDispatch, useSelector } from 'react-redux';

interface RootSwitchProps {
}

const App: React.FC<RootSwitchProps> = () => {
    /**
     * useSelector hooks is used to access current state
     * Here we access theme from Settings reducer
     */
    const theme = useSelector(state =>
        state.Settings.theme
    )
    //Here we access accessToken from createToken reducer
    const accessToken = useSelector(state =>
        state.createToken.access
    )

    return (
        <NavigationContainer theme={theme == 'Light' ? LIGHT : DARK}>
                {
                    /**
                     * Here it will authenticate user by check accessToken if authenticated navigate to Home stack else to Login screen
                     * DrawerNav is availale to authenticated user it contains home stack
                     * RegistrationStackNav is shown for non authenticated user it contains Register and Login screens
                     */
                    accessToken? <DrawerNav/> : <RegistrationStackNav/>
                        
                }
        </NavigationContainer>//Here is navigation container that replace "createAppContainer" in  react navigation v4
    );
}

export default App;
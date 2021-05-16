/*
Here is the Home stack screen which is accessed by authenticated user.
It's nested under drawer navigation as a screen.
It contains main To DO screen, add To Do and update To Do.
*/
import React from 'react';
import {
    StyleSheet
} from 'react-native';
import HeaderContent from './CustomContents/HeaderContent';
import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthStackParamList } from './navigationTypes';

interface AuthStackProps {
}

const Stack = createStackNavigator<AuthStackParamList>();

const RegistrationStack: React.FC<AuthStackProps> = () => {
    const { colors } = useTheme();

    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen 
                name="Login" 
                component={LoginScreen}
                options={{
                    title: '',//Here we hide header name
                    headerStyle: {
                        ...styles.haeder,
                        backgroundColor: colors.background
                    }//Here we hide header container shadow
                }}
            />{/*Here is the login screen that contains login form*/}
            <Stack.Screen 
                name="Register" 
                component={RegisterScreen}
                options={({route, navigation}) => ({
                    title: '',//Here we hide header name
                    headerStyle: {
                        ...styles.haeder,
                        backgroundColor: colors.background,
                    },//Here we hide header container shadow
                    headerLeft: () => <HeaderContent navigation={navigation} title='Register'/>,//Here we add custom header
                })}
            />{/*Here is the register screen that contains register form*/}
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    haeder: {
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
    }
})

export default RegistrationStack;
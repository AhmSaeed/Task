import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AuthNavProps } from '../navigations/navigationTypes';
import InputField from '../components/InputField';
import Button from '../components/Button';
import HelperText from '../components/HelperText';
import { useDispatch, useSelector } from 'react-redux';
import {
    createTokenSetUserName,
    createTokenSetPassword,
    login
} from '../modules/actions/userActions';

interface LoginScreenProps {
}

const LoginScreen:React.FC<LoginScreenProps> = ({
    navigation
}: AuthNavProps<'Login'>) => {
    //useTheme hooks is used to access current theme colors if Light get all light colors object else get all dark colors object
    const { colors } = useTheme();

    /**
     * useSelector hooks is used to access current state
     * Here we access createToken state
     */
    const createToken = useSelector(state =>
        state.createToken
    )

    //Here we useDispatch hook and assign it to dispatch constant to dispatch any action from our component
    const dispatch = useDispatch();

    return <SafeAreaView>
        <ScrollView style={styles.scrollView} bounces={false} showsVerticalScrollIndicator={false}>
            <Image style={styles.logo} source={require('../assets/todoIcon.png')}/>
            <Text style={[styles.logoTitle, {color: colors.primary}]}>To Do</Text>
            <Text style={[styles.tagline, {color: colors.text}]}>Nice to see you again</Text>
            <InputField
                label='User Name'
                labelStyle={[styles.inputLabel, {color: colors.text}]}
                isLabelRequired={true}
                style={{backgroundColor: colors.card}}
                placeholder='Add Your User Name'
                inputStyle={[styles.inputStyle, {color: colors.text}]}
                placeholderTextColor={colors.text}
                value={createToken.userName}
                maxLength={150}
                onChangeText={(val) => dispatch(createTokenSetUserName(val))}
            />
            <HelperText style={styles.helperText} isVisible={createToken.userNameErrorMessage.length !== 0}>{createToken.userNameErrorMessage}</HelperText>
            <InputField
                label='Password'
                labelStyle={[styles.inputLabel, {color: colors.text}]}
                isLabelRequired={true}
                style={{backgroundColor: colors.card}}
                placeholder='Add Your Passowrd'
                inputStyle={[styles.inputStyle, {color: colors.text}]}
                placeholderTextColor={colors.text}
                value={createToken.password}
                maxLength={128}
                onChangeText={(val) => dispatch(createTokenSetPassword(val))}
            />
            <HelperText style={styles.helperText} isVisible={createToken.userPasswordErrorMessage.length !== 0}>{createToken.userPasswordErrorMessage}</HelperText>
            <Button
                style={styles.button}
                label='Login'
                labelStyle={[styles.buttonLabel, {color: colors.text}]}
                onPress={() => dispatch(login())}
                color={colors.primary}
                isLoading={createToken.isRequest}
                loaderColor={colors.text}
            />
            <Text style={[styles.registerText, {color: colors.text}]}>Don't have an account <Text style={[styles.clicableRegisterText, {color: colors.primary}]} onPress={() => navigation.navigate('Register')}>Register</Text></Text>
        </ScrollView>
    </SafeAreaView>
}

LoginScreen.defaultProps = {
}

const styles = StyleSheet.create({
    scrollView: {
        paddingHorizontal: 20
    },
    logo: {
        height: 80, 
        width: 80, 
        alignSelf: 'center'
    },
    logoTitle: {
        fontFamily: 'Raleway-Bold', 
        textAlign: 'center', fontSize: 25
    },
    tagline: {
        fontFamily: 'Raleway-bold', 
        fontSize: 16, 
        alignSelf: 'center', 
        marginVertical: 50, 
        fontWeight: 'bold'
    },
    inputLabel: {
        fontFamily: 'Raleway-Medium'
    },
    inputStyle: {
        fontFamily: 'Raleway-Regular'
    },
    helperText: {
        fontFamily: 'Raleway-Regular'
    },
    button: {
        marginTop: 40
    },
    buttonLabel: {
        fontFamily: 'Raleway-bold',
        fontWeight: 'bold'
    },
    registerText: {
        textAlign: 'center', 
        marginVertical: 20, 
        fontFamily: 'Raleway-Regular'
    },
    clicableRegisterText: {
        fontFamily: 'Raleway-Regular'
    }
});

export default LoginScreen;
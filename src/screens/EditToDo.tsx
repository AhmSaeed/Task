import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Platform
} from 'react-native';
import { HomeNavProps } from '../navigations/navigationTypes';
import InputField from '../components/InputField';
import Button from '../components/Button';
import HelperText from '../components/HelperText';
import InputDate from '../components/InputDate';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme, StackActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
    patchTodoSetTitle,
    patchTodoSetContent,
    patchTodoSetDueDate,
    patchTodoSetData,
    partialyUpdateTodo
} from '../modules/actions/todoActions';

interface ToDoFormProps {
}

const EditToDoScreen:React.FC<ToDoFormProps> = ({
    navigation,
    route
}: HomeNavProps<'EditToDoScreen'>) => {
    //useTheme hooks is used to access current theme colors if Light get all light colors object else get all dark colors object
    const { colors } = useTheme();

    /**
     * useSelector hooks is used to access current state
     * Here we access patchTodo reducer state
     */
    const patchTodo = useSelector(state =>
        state.patchTodo
    )
    //Here we access theme to check if it's Light or Dark
    const theme = useSelector(state =>
        state.Settings.theme
    )

    //Here we useDispatch hook and assign it to dispatch constant to dispatch any action from our component
    const dispatch = useDispatch();

    /**
     * It fires in screen first render sending data that will be updated to store so that it renders the screen with new values
     */
    useEffect(() => {
        dispatch(patchTodoSetData(route.params));
    }, [])

    //This will be called as a call back function if To Do is successfully added
    const navigateToHome = () => {
        navigation.dispatch(StackActions.pop(1));
    }
    
    return <View style={styles.container}>
        <ScrollView bounces={false}>
            <InputField
                label='Title'
                labelStyle={[styles.inputLabel, {color: colors.text}]}
                isLabelRequired={true}
                style={{backgroundColor: colors.card}}
                placeholder='Add To Do Title'
                inputStyle={[styles.input, {color: colors.text}]}
                placeholderTextColor={colors.text}
                value={patchTodo.title}
                onChangeText={(val) => dispatch(patchTodoSetTitle(val))}
            />
            <HelperText style={styles.helperText} isVisible={patchTodo.titleErrorMessage.length !== 0}>{patchTodo.titleErrorMessage}</HelperText>
            <InputField
                label='Content'
                labelStyle={[styles.inputLabel, {color: colors.text}]}
                style={{backgroundColor: colors.card}}
                placeholder='Add To Do Content'
                inputStyle={[styles.inputArea, {color: colors.text}]}
                placeholderTextColor={colors.text}
                value={patchTodo.content}
                textAlignVertical='top'
                multiline
                numberOfLines={5}
                onChangeText={(val) => dispatch(patchTodoSetContent(val))}
            />
            <HelperText style={styles.helperText} isVisible={patchTodo.contentErrorMessage.length !== 0}>{patchTodo.contentErrorMessage}</HelperText>
            <InputDate
                label='Due Date'
                labelStyle={[styles.inputLabel, {color: colors.text}]}
                style={{backgroundColor: colors.card}}
                placeholder='Add To Do Due Date'
                inputStyle={[styles.input, {color: colors.text}]}
                placeholderTextColor={colors.text}
                value={patchTodo.dueDate}
                renderIcon={<MaterialIcons 
                    name='date-range' 
                    color={colors.primary} 
                    size={25}
                />}
                minimumDate={new Date()}
                isDarkModeEnabled={theme == 'Light'? false : true}
                onConfirm={(val) => dispatch(patchTodoSetDueDate(val))}
                onCancel={(val) => {}}
            />
            <HelperText style={styles.helperText} isVisible={patchTodo.dueDateErrorMessage.length !== 0}>{patchTodo.dueDateErrorMessage}</HelperText>
        </ScrollView>
        <Button
            label='Done'
            labelStyle={[styles.button, {color: colors.text}]}
            onPress={() => dispatch(partialyUpdateTodo(navigateToHome))}
            color={colors.primary}
            isLoading={patchTodo.isPatchTodoRequest}
            loaderColor={colors.text}
        />
    </View>
}

EditToDoScreen.defaultProps = {
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginVertical: 40
    },
    inputLabel: {
        fontFamily: 'Raleway-Medium'
    },
    input: {
        fontFamily: 'Raleway-Regular'
    },
    inputArea:{
        fontFamily: 'Raleway-Regular',
        height: 150, 
        marginVertical: Platform.OS == 'android'? 10 : 5, top: 0
    },
    helperText: {
        fontFamily: 'Raleway-Regular'
    },
    button: {
        fontFamily: 'Raleway-bold'
    }
});

export default EditToDoScreen;
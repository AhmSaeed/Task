import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Platform
} from 'react-native';
import { HomeNavProps } from '../navigations/navigationTypes';
import InputField from '../components/InputField';
import InputDate from '../components/InputDate';
import Button from '../components/Button';
import HelperText from '../components/HelperText';
import { useTheme } from '@react-navigation/native';
import MaterialIcons from  'react-native-vector-icons/MaterialIcons'; 
import { useDispatch, useSelector } from 'react-redux';
import {
    postTodoSetTitle,
    postTodoSetContent,
    postTodoSetDueDate,
    createTodo
} from '../modules/actions/todoActions';

interface ToDoFormProps {
}

const AddToDo:React.FC<ToDoFormProps> = ({
    navigation
}: HomeNavProps<'AddToDoScreen'>) => {
    //useTheme hooks is used to access current theme colors if Light get all light colors object else get all dark colors object
    const { colors } = useTheme();

    /**
     * useSelector hooks is used to access current state
     * Here we access postTodo reducer state
     */
    const postTodo = useSelector(state =>
        state.postTodo
    )
    //Here we access theme to check if it's Light or Dark
    const theme = useSelector(state =>
        state.Settings.theme
    )

    //Here we useDispatch hook and assign it to dispatch constant to dispatch any action from our component
    const dispatch = useDispatch();
    
    return <View style={styles.container}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <InputField
                label='Title'
                labelStyle={[styles.inputLabel, {color: colors.text}]}
                isLabelRequired={true}
                style={{backgroundColor: colors.card}}
                placeholder='Add To Do Title'
                inputStyle={[styles.input, {color: colors.text}]}
                placeholderTextColor={colors.text}
                value={postTodo.title}
                onChangeText={(val) => dispatch(postTodoSetTitle(val))}
            />
            <HelperText style={styles.helperText} isVisible={postTodo.titleErrorMessage.length !== 0}>{postTodo.titleErrorMessage}</HelperText>
            <InputField
                label='Content'
                labelStyle={[styles.inputLabel, {color: colors.text}]}
                style={{backgroundColor: colors.card}}
                placeholder='Add To Do Content'
                inputStyle={[styles.inputArea, {color: colors.text}]}
                placeholderTextColor={colors.text}
                value={postTodo.content}
                textAlignVertical='top'
                multiline
                numberOfLines={5}
                onChangeText={(val) => dispatch(postTodoSetContent(val))}
            />
            <HelperText style={styles.helperText} isVisible={postTodo.contentErrorMessage.length !== 0}>{postTodo.contentErrorMessage}</HelperText>
            <InputDate
                label='Due Date'
                labelStyle={[styles.inputLabel, {color: colors.text}]}
                style={{backgroundColor: colors.card}}
                placeholder='Add To Do Due Date'
                inputStyle={[styles.input, {color: colors.text}]}
                placeholderTextColor={colors.text}
                value={postTodo.dueDate}
                renderIcon={<MaterialIcons 
                    name='date-range' 
                    color={colors.primary} 
                    size={25}
                />}
                minimumDate={new Date()}
                isDarkModeEnabled={theme == 'Light'? false : true}
                onConfirm={(val) => dispatch(postTodoSetDueDate(val))}
                onCancel={(val) => {}}
            />
            <HelperText style={styles.helperText} isVisible={postTodo.dueDateErrorMessage.length !== 0}>{postTodo.dueDateErrorMessage}</HelperText>
        </ScrollView>
        <Button
            label='Done'
            labelStyle={[styles.button, {color: colors.text}]}
            onPress={() => dispatch(createTodo())}
            color={colors.primary}
            isLoading={postTodo.isPostTodoRequest}
        />
    </View>
}

AddToDo.defaultProps = {
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

export default AddToDo;
import React from 'react';
import { View, Text, TouchableOpacity, Image, Platform, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { DrawerNavProps } from '../navigationTypes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import LabeledSeparator from '../../components/LabeledSeparator';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../modules/actions/userActions';
import { toggleApplicationTheme } from '../../modules/actions/settingsActions';

interface DrawerProps {
}

const DrawerContent: React.FC<DrawerProps> = (props: DrawerNavProps<'Home'>) => {
    //useTheme hooks is used to access current theme colors if Light get all light colors object else get all dark colors object
    const { colors } = useTheme();

    /**
     * useSelector hooks is used to access current state
     * Here we access theme from Settings reducer
     */
    const theme = useSelector(state =>
        state.Settings.theme
    )
    //Access userName from createToken reducer state
    const createToken = useSelector(state =>
        state.createToken
    )
    //Filter all todos to get finished todos
    const finishedTasks = useSelector(state => {
        const todosList = state.getTodos.todosList;
        return todosList? todosList.filter(item => item.completed == true) : 0;
    })
    //Filter all todos to get running todos
    const runningTasks = useSelector(state => {
        const todosList = state.getTodos.todosList;
        return todosList? todosList.filter(item => item.completed == false) : 0;
    })

    //Here we define dispatch action and assign it to dispatch constant
    const dispatch = useDispatch();
    
    return <>
        <View style={[styles.avatarContainer, {backgroundColor: colors.background}]}>
            <View style={styles.avatarSubContainer}>
                <Image style={styles.avatar} source={require('../../assets/avatar.png')}/>
                <Text style={[styles.userName, {color: colors.text}]}>{createToken.userName}</Text>
                <View style={styles.tasksInfoContainer}>
                    <Text style={[styles.doneLabel, {color: colors.text}]}><Ionicons name='md-checkmark-done-circle' size={15}/> {finishedTasks.length} todos</Text>
                    <Text style={[styles.unDoneLabel, {color: colors.text}]}><Entypo name='circle-with-cross' size={14}/> {runningTasks.length} todos</Text>
                </View>
            </View>
        </View>
        <DrawerContentScrollView bounces={false} {...props}>
            <DrawerItemList {...props}/>
            <LabeledSeparator labelStyle={styles.labeledSeparator} color={colors.text}>Preferences</LabeledSeparator>
            <View style={styles.itemContainer}>
                <DrawerItem
                    label="Theme"
                    labelStyle={{color: colors.text, fontFamily: 'Raleway-Regular'}}
                    icon={() => <Ionicons name='color-palette' size={20} color={colors.text}/>}
                    onPress={() => {}}
                />
                <TouchableOpacity onPress={() => dispatch(toggleApplicationTheme())}>
                    {theme == 'Light'? <Ionicons name='md-moon' size={25} color={colors.notification}/> 
                    :
                    <MaterialCommunityIcons name='weather-sunny' size={28} color={colors.notification}/>}
                </TouchableOpacity>
            </View>
            <DrawerItem
                label="Logout"
                labelStyle={{color: colors.text, fontFamily: 'Raleway-Regular'}}
                icon={() => <MaterialCommunityIcons name='logout' size={20} color={colors.text}/>}
                onPress={() => dispatch(logout())}
            />
        </DrawerContentScrollView>
    </>;
}

const styles = StyleSheet.create({
    avatarContainer: {
        height: 200, 
        width: '100%', 
        borderBottomRightRadius: 100, 
        marginBottom: Platform.OS == 'android'? 40 : 0
    },
    avatarSubContainer: {
        position: 'absolute', 
        bottom: 10, 
        left: 10
    },
    avatar: {
        width: 80, 
        height: 80
    },
    userName: {
        fontSize: 25,
        marginBottom: 10,
        fontFamily: 'Raleway-medium'

    },
    tasksInfoContainer: {
        flexDirection: 'row'
    },
    doneLabel: { 
        fontSize: 14
    },
    unDoneLabel:{
        marginHorizontal: 10, 
        fontSize: 14
    },
    labeledSeparator: {
        fontFamily: 'Raleway-Medium'
    },
    itemContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginRight: 20
    }
})

export default DrawerContent;
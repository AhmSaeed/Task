/*
Here is the Home stack screen which is accessed by authenticated user.
It's nested under drawer navigation as a screen.
It contains main To DO screen, add To Do and update To Do.
*/
import React, { useState } from 'react';
import { 
    Platform, 
    StyleSheet,
    Text
} from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HeaderContent from './CustomContents/HeaderContent';
import HomeScreen from '../screens/HomeScreen';
import AddToDo from '../screens/AddToDo';
import EditToDo from '../screens/EditToDo';
import { HomeStackParamList } from './navigationTypes';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Sheet from '../components/Sheet';
import ListItem from '../components/FilterItem'
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
    filterTodosBy
} from '../modules/actions/todoActions';

interface HomeStackProps {
}

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack: React.FC<HomeStackProps> = () => {
    const [isFilterModelVisible, setIsFilterModelVisible] = useState(false);

    //useTheme hooks is used to access current theme colors if Light get all light colors object else get all dark colors object
    const { colors } = useTheme();

    //useNavigation hooks is used to provide navigation props like navigate, dispatch ...etc
     const navigation = useNavigation();

    /**
     * useSelector hooks is used to access current state
     * Here we access filterTodos reducer state
     */
    const filterTodos = useSelector(state =>
        state.filterTodos
    )

     //Here we useDispatch hook and assign it to dispatch constant to dispatch any action from our component
    const dispatch = useDispatch();

    const selectFilter = (by: string) => {
        dispatch(filterTodosBy(by));
        setIsFilterModelVisible(false);
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: '',//Here we hide header name
                    headerLeft: () => <Entypo name='list' size={25} color={colors.text} style={{marginHorizontal: 10}} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}/>,
                    headerRight: () => <>
                        <Sheet isVisible={isFilterModelVisible} backgroundColor={colors.card} renderIcon={<AntDesign name='filter' size={25} color={colors.text} style={{marginHorizontal: 10}} onPress={() => setIsFilterModelVisible(!isFilterModelVisible)}/>}>
                            <Text style={[styles.listTitle, {color: colors.text}]}>Filter By</Text>
                            <ListItem label='All' onPress={() => selectFilter('All')} isActive={filterTodos.filterTodosby == 'All'? true : false}/>
                            <ListItem label='Finished' onPress={() => selectFilter('Finished')} isActive={filterTodos.filterTodosby == 'Finished'? true : false}/>
                            <ListItem label='Running' onPress={() => selectFilter('Running')} isActive={filterTodos.filterTodosby == 'Running'? true : false}/>
                        </Sheet>
                    </>,
                    headerStyle: {
                        ...styles.haeder,//Here we hide header name
                        backgroundColor: colors.background
                    },
                }}
            />{/*Here is the home screen that contains To Do cards, filter, add To Do button*/}
            <Stack.Screen
                name="AddToDoScreen"
                component={AddToDo}
                options={({ route, navigation }) => ({
                    title: '',
                    headerStyle: {
                        ...styles.haeder,//Here we hide header name
                        backgroundColor: colors.background,
                    },//Here we hide header container shadow
                    headerLeft: () => <HeaderContent navigation={navigation} title='Add To Do'/>,//Here we add custom header
                })}
            />{/*Here is the Add To Do contains To Do form*/}
            <Stack.Screen
                name="EditToDoScreen"
                component={EditToDo}
                options={({ route, navigation }) => ({
                    title: '',
                    headerStyle: {
                        ...styles.haeder,//Here we hide header name
                        backgroundColor: colors.background,
                    },//Here we hide header container shadow
                    headerLeft: () => <HeaderContent navigation={navigation} title='Edit To Do'/>//Here we add custom header
                })}
            />{/*Here is the Edit To Do contains To Do form*/}
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    haeder: {
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
        height: Platform.OS == 'android'? 80 : 120
    },
    listTitle: {
        fontFamily: 'Raleway-Medium',
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'center', 
        marginVertical: 10
    }
})

export default HomeStack;
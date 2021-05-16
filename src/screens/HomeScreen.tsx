import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    Image
} from 'react-native';
import { HomeNavProps } from '../navigations/navigationTypes';
import { useTheme } from '@react-navigation/native';
import LinearGradient from  'react-native-linear-gradient';
import ToDoCard from '../components/ToDoCard';
import Button from '../components/Button';
import CircleButton from '../components/CircleButton';
import AntDesign from  'react-native-vector-icons/AntDesign';
import { shadow } from '../themes/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchTodos,
    changeTodoStatus,
    deleteTodo
} from '../modules/actions/todoActions';
import moment from "moment";
import { getGreetingTime } from '../util/date';
import { statusType } from '../components/ToDoCard';

interface HomeScreenProps {
}

const HomeScreen:React.FC<HomeScreenProps> = ({
    navigation
}: HomeNavProps<'Home'>) => {
    //useTheme hooks is used to access current theme colors if Light get all light colors object else get all dark colors object
    const { colors } = useTheme();

    /**
     * useSelector hooks is used to access current state
     * Here we access createToken reducer state
     */
    const createToken = useSelector(state =>
        state.createToken
    )
    //Here we access getTodos reducer state
    const getTodos = useSelector(state =>
        state.getTodos
    )
    //Here we access filterTodos reducer state
    const filterTodos = useSelector(state =>
        state.filterTodos
    )

    //Here we useDispatch hook and assign it to dispatch constant to dispatch any action from our component
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [])

    const applyFilter = (todos) => {
        switch (filterTodos.filterTodosby) {
            case 'All':
                return todos;
            case 'Finished':
                return todos.filter(item => item.completed);
            case 'Running':
                return todos.filter(item => !item.completed);
        }
    }

    const keyExtractor = (item, i) => `${item.title}-${i}`;

    const renderToDosCard = ({item, index}) => {
        let status: statusType = 'running';
        if(item.completed) status = 'finished';
        else if((new Date(item.due_date).getTime() - new Date().getTime()) < 0) status = 'expired';
        return <ToDoCard
            style={{backgroundColor: colors.card}}
            title={item.title}
            details={item.content}
            date={moment(item.due_date).format("Do MMMM YYYY")}
            isCompleted={item.completed}
            titleStyle={[styles.cardTitle, {color: colors.text}]}
            detailsStyle={[styles.cardDetails, {color: colors.text}]}
            dateStyle={[styles.cardDate, {color: colors.text}]}
            inactiveIconColor={colors.background}
            activeIconColor={colors.primary}
            strikeColor={colors.text}
            status={status}
            onIconPress={(completed) => dispatch(changeTodoStatus(index, item.id, completed))}
            onUpdatePress={() => navigation.navigate('EditToDoScreen', { ...item, index })}
            onDeletePress={() => dispatch(deleteTodo(item.id))}
        />;
    }

    const renderBody = () => {
        if(!getTodos.todosList){
            return <View style={styles.loadingContainer}>
                <ActivityIndicator color={colors.primary}/>
            </View>;
        }
        else if(getTodos.todosList.length == 0){
            return <View style={styles.emptyContainer}>
                <Image style={styles.ouchImage} resizeMode='contain' source={require('../assets/ouch.png')}/>
                <View style={styles.tryButtonContainer}>
                    <Button
                        label='Try Again'
                        labelStyle={[styles.tryButton, {color: colors.text}]}
                        onPress={() => dispatch(fetchTodos())}
                        color={colors.card}
                        isLoading={getTodos.isGetTodosRequest}
                        loaderColor={colors.text}
                    /> 
                </View>
            </View>;
        }
        else{
            return <FlatList
                contentContainerStyle={styles.flatlistContentContainer}
                data={applyFilter(getTodos.todosList)}
                keyExtractor={keyExtractor}
                renderItem={renderToDosCard}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={getTodos.isGetTodosRequest}
                        onRefresh={() => dispatch(fetchTodos())}
                        title=''
                        tintColor={colors.primary}
                        titleColor={colors.text}
                    />
                }
            />
        }
    }

    return <>
        <Text style={[styles.welcomeText, {color: colors.text}]}>Good {getGreetingTime()},</Text>
        <Text style={[styles.userName, {color: colors.primary}]}>{createToken.userName}</Text>
        {renderBody()}
        <LinearGradient colors={[colors.background+'00', colors.background]} style={styles.linearGradient}>
            <CircleButton radius={30} color={colors.primary} style={shadow} onPress={() => navigation.navigate('AddToDoScreen')}>
                <AntDesign name='plus' size={30} color={colors.text}/>
            </CircleButton>
        </LinearGradient>
    </>
}

HomeScreen.defaultProps = {
}

const styles = StyleSheet.create({
    welcomeText: {
        fontSize: 30,
        marginHorizontal: 20,
        fontFamily: 'Raleway-Medium',
        zIndex: 2
    },
    userName: {
        fontSize: 30, 
        marginHorizontal: 20, 
        fontFamily: 'Raleway-Medium',
        zIndex: 2
    },
    flatlistContentContainer: {
        paddingTop: 20,
        paddingBottom: 110
    },
    cardTitle: {
        fontFamily: 'Raleway-Regular'
    },
    cardDetails: {
        fontFamily: 'Raleway-Regular'
    },
    cardDate: {
        fontFamily: 'Raleway-Regular'
    },
    linearGradient: {
        position: 'absolute', 
        bottom: 0, 
        height: 100, 
        width: '100%', 
        alignItems: 'center'
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 60, 
        zIndex: 1
    },
    ouchImage: {
        width: 350, 
        height: 250
    },
    tryButtonContainer:{
        position: 'absolute', 
        width: 100
    },
    tryButton: {
        fontSize: 16,
        fontFamily: 'Raleway-Medium'
    }
});

export default HomeScreen;
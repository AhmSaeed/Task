import React from 'react';
import {
    View, 
    Text,
    StyleSheet 
} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StackNavigationProp } from '@react-navigation/stack';

interface HeaderContentProps {
    title: string,
    navigation: StackNavigationProp<any, any>
}

const DrawerContent: React.FC<HeaderContentProps> = ({
    title,
    navigation
}) => {
    //useTheme hooks is used to access current theme colors if Light get all light colors object else get all dark colors object
    const { colors } = useTheme();

    
    return <View style={styles.container}>
        <FontAwesome name='long-arrow-left' size={25} color={colors.text} style={styles.backButton} onPress={() => navigation.dispatch(StackActions.pop(1))}/>
        <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    backButton: {
        marginHorizontal: 10
    },
    title: {
        fontSize: 16, 
        fontFamily: 'Raleway-Bold'
    }
})

export default DrawerContent;
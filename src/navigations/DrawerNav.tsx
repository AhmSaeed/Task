/*
Here is the drawer which holds all screens that is available for authenticated user.
It contains main To DO screen, add To Do and update To Do
*/
import React from 'react';
import {
    StyleSheet
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStackNav from './HomeStackNav';
import AboutScreen from '../screens/AboutScreen';
import { DrawerParamList } from './navigationTypes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DrawerContent from './CustomContents/DrawerContent';

interface SideDrawerProps {
}

const Drawer = createDrawerNavigator<DrawerParamList>();

const SideDrawer: React.FC<SideDrawerProps> = () => {
    //useTheme hooks is used to access current theme colors if Light get all light colors object else get all dark colors object
    const { colors } = useTheme();
    
    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props}/>} 
            drawerContentOptions={{
                itemStyle: styles.itemLabel,//Item appears as a container of selected (active) screen in drawer
                labelStyle: {
                    color: colors.text,
                    ...styles.label
                },//Screen labels in drawer
                activeBackgroundColor: colors.primary//Item color when screen is active 
            }}
        >
            <Drawer.Screen 
                name="Home" 
                component={HomeStackNav}
                options={{
                    drawerIcon: () => <AntDesign name='home' size={19} color={colors.text}/>
                }}
            />{/*Here is the Home stack contains main screens like: Home, add To Do, update To Do ...etc*/}
            <Drawer.Screen 
                name="About" 
                component={AboutScreen} 
                options={{
                    drawerIcon: () => <MaterialIcons name='info-outline' size={20} color={colors.text}/>
                }}
            />{/*Here is the About screen*/}
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    itemLabel: {
        borderRadius: 12
    },
    label: {
        fontFamily: 'Raleway-Regular'
    }
})

export default SideDrawer;
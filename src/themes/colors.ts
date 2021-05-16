import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';

/*
this is the color scheme for light mode
spread default theme colors which is provided by react navigation and add custom colors to it
*/
export const LIGHT= {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        card: '#ffffff',
        text: '#1c1c1c',
        border: '',
        notification: '#b9b9b9',
        background: '#EDF0F7',
        primary: '#2398FF',
    }
}

/*
this is the color scheme for dark mode
spread dark theme colors which is provided by react navigation and add custom colors to it
*/
export const DARK = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        card: '#1a1a1a',
        text: '#fdfdfd',
        border: '',
        notification: '#ffa500',
        background: '#121212',
        primary: '#2398FF'
    }
}
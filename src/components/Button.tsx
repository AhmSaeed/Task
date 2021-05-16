import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    GestureResponderEvent
} from 'react-native';
import { shadow } from '../themes/styles';

//This interface introduces mandatory (with no question mark ?) and optional (with question mark ?) props
interface ButtonProps {
    label: React.ReactNode,
    labelStyle?: object,
    color?: string,
    style?: object,
    isLoading?: boolean,
    loaderColor?: string,
    onPress: (event: GestureResponderEvent) => void
}

const Button: React.FC<ButtonProps> = (props) => {
    return <TouchableOpacity style={[styles.actionButton, {
        backgroundColor: props.color,
        ...props.style
    }]}
    onPress={props.onPress}>
        {props.isLoading? <ActivityIndicator color={props.loaderColor}/> : <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>}
    </TouchableOpacity>
}

//Here we initialize default props for the component to use if no props sent by user
Button.defaultProps = {
    color: 'blue'
}

//Here we initialize default props for the component to use if no props sent by user
const styles = StyleSheet.create({
    actionButton: {
        flexDirection: 'row',
        height: 44,
        width: '100%',
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadow
    },
    label: {
        fontSize: 16,
        color: '#ffffff'
    }
})

export default Button;
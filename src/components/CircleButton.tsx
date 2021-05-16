import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    GestureResponderEvent
} from 'react-native';

//This interface introduces mandatory (with no question mark ?) and optional (with question mark ?) props
interface CircleButtonProps {
    children: React.ReactNode,
    radius: number,
    color?: string,
    style?: object,
    onPress?: (event: GestureResponderEvent) => void
}

const CircleButton: React.FC<CircleButtonProps> = (props) => {
    return <TouchableOpacity style={[styles.actionButton, {
        ...props.style,
        backgroundColor: props.color,
        width: props.radius * 2,//Multiply width by 2 to get width
        height: props.radius * 2,//Multiply height by 2 to get height
        borderRadius: props.radius//borderReadius to show component as a circle as border radius should be 1/2 width and height 
    }]}
    onPress={props.onPress}>
        {props.children}
    </TouchableOpacity>
}

//Here we initialize default props for the component to use if no props sent by user
CircleButton.defaultProps = {
    color: 'blue'
}

//Here we initialize default props for the component to use if no props sent by user
const styles = StyleSheet.create({
    actionButton: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default CircleButton;
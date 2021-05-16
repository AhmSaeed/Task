import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//This interface introduces mandatory and optional props
interface LabeledSeparatorProps {
    children: string,
    color?: string,
    labelStyle?: object,
    separatorStyle?: object,
    separatorHeight?: number
}


const LabeledSeparator: React.FC<LabeledSeparatorProps> = (props) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.label, {color: props.color, ...props.labelStyle}]}>{props.children}</Text>
            <View style={[styles.separator, {backgroundColor: props.color, height: props.separatorHeight, ...props.separatorStyle}]}/>
        </View>
    );
}

//Here we initialize default props for the component to use if no props sent by user
LabeledSeparator.defaultProps = {
    color: 'white',
    separatorHeight: 0.5
}

export default LabeledSeparator;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    label: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginHorizontal: 10
    },
    separator: {
        height: 0.5, 
        width: '100%',
    }
})
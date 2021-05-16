import React from 'react';
import { View, Text, TextInput, Dimensions, ScrollView, StyleSheet, I18nManager, TextInputProps } from 'react-native';

//This interface introduces mandatory and optional props
export interface InputFieldProps {
    label?: string,
    labelStyle?: object,
    isLabelRequired?: boolean,
    renderIcon?: React.ReactNode,
    style?: object,
    inputStyle?: object
}

const InputField: React.FC<InputFieldProps & TextInputProps> = (props) => {
    return (
        <>
            <Text style={[styles.label, props.labelStyle]}>{props.label}{props.isLabelRequired? <Text style={{color: 'red', fontSize: 18}}>*</Text> : null}</Text>
            <View style={[styles.container, props.style]}>
                <TextInput
                    {...props}
                    autoCapitalize = 'none'
                    style={[styles.textInput, props.inputStyle]}
                />
                <View style={styles.icon}>
                    {props.renderIcon}
                </View>
            </View>
        </>
    );
}

InputField.defaultProps = {
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        marginVertical: 3,
        marginHorizontal: 15
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        borderColor: '#DADAED',
        borderRadius: 22,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff'
    },
    textInput: {
        flex: 1,
        textAlign: I18nManager.isRTL? 'right': 'left',
        height: 40,
        fontSize: 16
    },
    icon: {
        alignItems: 'center', 
        justifyContent: 'center'
    }
})

export default InputField;
import React from 'react';
import {
    StyleSheet,
    View,
    Modal
} from 'react-native';

//This interface introduces mandatory (with no question mark ?) and optional (with question mark ?) props
interface SheetProps {
    children?: React.ReactNode,
    renderIcon?: React.ReactNode,
    isVisible?: boolean,
    top?: number,
    bottom?: number,
    right?: number,
    left?: number,
    backgroundColor?: string,
    style?: object
}

/**
 * Modal component appears over all application component
 * It handles cases like making alerts, modals, ...etc
 */
const Sheet: React.FC<SheetProps> = (props) => {

    return <View style={styles.centeredView}>
    <Modal
      animationType='fade'
      transparent={true}//Bacground behind modal is transparent
      visible={props.isVisible}
    >
        <View style={styles.centeredView}>
            <View style={[styles.modalView, {backgroundColor: props.backgroundColor}]}>
            {props.children}
            </View>
        </View>
        </Modal>
        {props.renderIcon}
    </View>
    
}

//Here we initialize default props for the component to use if no props sent by user
Sheet.defaultProps = {
}

//Here we initialize default props for the component to use if no props sent by user
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        position: 'absolute',
        top: 80,
        right: 5,
        width: 150,
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        opacity: 0.8
    },
})

export default Sheet;
import React from 'react';
import { 
    StyleSheet, 
    View, 
    Modal, 
    GestureResponderEvent, 
    TouchableOpacity,
    Text
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from "@react-navigation/native";

interface listItemProps {
    label?: string,
    onPress?: (event: GestureResponderEvent) => void,
    isActive?: boolean
}

const FilterItem: React.FC<listItemProps> = (props) => {
    //useTheme hooks is used to access current theme colors if Light get all light colors object else get all dark colors object
    const { colors } = useTheme();

    return <TouchableOpacity style={styles.itemContainer} onPress={props.onPress}>
        <Text style={[styles.itemLabel, {color: colors.text}]}>{props.label}</Text>
        <MaterialIcons name={`radio-button-${props.isActive? 'checked' : 'unchecked'}`} color={props.isActive? colors.primary : colors.text} size={25}/>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    listTitle: {
        fontFamily: 'Raleway-Medium',
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'center', 
        marginVertical: 10
    },
    itemContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginHorizontal: 10, 
        marginVertical: 12
    },
    itemLabel: {
        fontFamily: 'Raleway-Medium', 
        fontSize: 17
    }
})

export default FilterItem;


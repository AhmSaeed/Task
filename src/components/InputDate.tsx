import React, { useState } from 'react';
import { 
    TouchableOpacity,
    TextInputProps
} from 'react-native';
import InputField, { InputFieldProps } from './InputField';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment"; 

//This interface introduces mandatory and optional props
interface InputDateProps {
    onConfirm?: (date: string) => void,
    onCancel?: (date: string) => void,
    onChange?: (date: string) => void,
    minimumDate?: Date,
    isDarkModeEnabled?: boolean
}

//Moment used to change format to YYYY-MM-DD
const getDate = (val) => {
    return moment(val).format("YYYY-MM-DD")
};

const InputDate: React.FC<
    InputDateProps & 
    InputFieldProps & 
    TextInputProps
> = (props) => {
    const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState<boolean>(false);
    const [date, setDate] = useState<Date>();

    //Fires after clicking Confirm on date picker modal
    const onConfirm = (date) => {
        setIsDateTimePickerVisible(false);
        props.onConfirm(getDate(date));
    }

    //Fires after clicking Cancel on date picker modal
    const onCancel = (date) => {
        setIsDateTimePickerVisible(false);
        props.onCancel(getDate(date));
    }

    //Fires when changing date as date picker is active
    const onChange = (date) => {
        setDate(date);
        props.onCancel(getDate(date));
    }

    return <>
        <InputField
            {...props}
            renderIcon={
                <TouchableOpacity onPress={() => setIsDateTimePickerVisible(true)}>
                    {props.renderIcon}
                </TouchableOpacity>
            }
            value={getDate(props.value)}
            editable={false}
        />
        <DateTimePickerModal
            {...props}
            isVisible={isDateTimePickerVisible}
            mode='date'
            display='spinner'
            date={date}
            isDarkModeEnabled={props.isDarkModeEnabled}
            onConfirm={onConfirm}
            onCancel={onCancel}
            onChange={onChange}
        />
    </>
}

InputDate.defaultProps = {
}

export default InputDate;
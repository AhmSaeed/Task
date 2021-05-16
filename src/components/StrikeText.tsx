import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Platform
} from 'react-native';
import StrikeLine from './StrikeLine';

//This interface introduces mandatory (with no question mark ?) and optional (with question mark ?) props
interface StrikeTextProps {
    children: React.ReactNode,
    enableStrike: boolean,
    style?: object
}

//Type that evaluates each line object in lines array
type lineParamList = {
    width: number,
    height: number
}

//This interface is for onTextLayout to handle layout event
interface TextLayoutEvent {
    nativeEvent?: {
        lines?: lineParamList[]
    }
}

const StrikeText: React.FC<StrikeTextProps> = (props) => {
    const [ textLines, setTextLines ] = useState<lineParamList[]>([]);

    //This function tracks text layout as each text line is resolved as object with it's properties like width, height ...etc 
    const onTextLayout = (event: TextLayoutEvent) => {
        setTextLines(event.nativeEvent.lines);
    }

    return <View style={styles.container}>
        <View style={styles.strikeLineContainer}>
            {
                /*
                If enableStrike is true line will go over each line on screen
                Here we loop through lines to access properties like width and height and use it to calculate how line would go over text
                */
                props.enableStrike && textLines.map((item, i) => <StrikeLine key={i.toString()} width={item.width} height={item.height} {...props}/>)
            }
        </View>
        <Text style={props.style} onTextLayout={onTextLayout}>{/*Here we access text layout event to get text size on different screens*/}
            {props.children}
        </Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden'
    },
    strikeLineContainer: {
        position: 'absolute',
        height: '100%'
    }
});

export default StrikeText;
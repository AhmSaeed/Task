import React, { useMemo, useState } from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';
import Animated, { 
    Value,
    Easing,
    block,
    cond,
    clockRunning,
    startClock,
    timing,
    debug,
    stopClock,
    useCode,
    set,
    useValue,
    Clock
 } from 'react-native-reanimated';

//This interface introduces mandatory (with no question mark ?) and optional (with question mark ?) props
interface HelperTextProps {
    children: string,
    style?: object,
    isVisible?: boolean
}

const runTiming = (clock, from, to) => {
    const state = {
        finished: new Value(0),//The finished will either be a 0 or 1,change to 1 if animation ended
        position: new Value(from),//Track position from where animated object start moving till stop
        time: new Value(0),//time node that just indicates the last clock time the animation node has been evaluated
        frameTime: new Value(0)//The frameTime node will also get updated and represents the progress of animation in milliseconds (how long the animation has lasted so far)
    };

    const config = {
        duration: 500,//Add animation duration from start to end
        toValue: new Value(to),//Here we set end value "to"
        easing: Easing.inOut(Easing.ease)
    };

    /*
    Block takes an array of nodes and evaluates all of them in the order they are put in the array. It then returns the value of the last node.
    */
    return block([
        /*
        cond If conditionNode evaluates to "truthy" value the node evaluates ifNode node and returns its value, otherwise it evaluates elseNode
        If clock is not runing start running else evaluates to the empty array
        */
        cond(
            clockRunning(clock),
            [],
            startClock(clock)
        ),
        //We run the step here that is going to update position
        timing(clock, state, config),
        //If the animation is over we stop the clock
        cond(state.finished, debug('stop clock', stopClock(clock))),
        //We made the block return the updated position
        state.position
    ]);
}

const HelperText: React.FC<HelperTextProps> = (props) => {
    const scale = useValue<number>(0);
    const {clock} = useMemo(() => ({
        clock: new Clock()
    }), []);

    //useCode hook fires animation when children change or isVisible is set to true
    useCode(
        () => block([
            props.children.length !==0 && props.isVisible && set(scale, runTiming(clock, 0, 1))
        ]), [props.children, props.isVisible]
    );

    return <Animated.Text style={[styles.text, props.style, {transform: [{translateX: scale}], opacity: scale}]}>
        {props.children}
    </Animated.Text>
}

//Here we initialize default props for the component to use if no props sent by user
const styles = StyleSheet.create({
    text: {
        color: 'red',
        flexWrap: 'wrap',
        textAlign: 'center'
    }
})

export default HelperText;
import React, { useMemo } from 'react';
import {
    StyleSheet
} from 'react-native';
import Animated, {
    Extrapolate,
    Easing,
    Clock,
    Value,
    block,
    cond,
    clockRunning,
    startClock,
    timing,
    debug,
    stopClock,
    useValue,
    interpolate,
    useCode,
    set
} from 'react-native-reanimated';

//This interface introduces mandatory (with no question mark ?) and optional (with question mark ?) props
interface StrikeLineProps {
    key: string,
    enableStrike: boolean,
    height: number,
    width: number,
    strikeColor?: string
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

const StrikeLine: React.FC<StrikeLineProps> = (props) => {
    const scale = useValue<number>(0);
    const {clock} = useMemo(() => ({
        clock: new Clock()
    }), [])

    //useCode hook fires animation when enableStrike is set to true
    useCode(
        () => block([
            set(scale, runTiming(clock, 0, 1))
        ]), [props.enableStrike]
    );

    //Here we add interpolate to allow input ranges to map to different output ranges input from 0 to 1, output from 0 to width fo text sent by props
    const scaling = interpolate(scale, {
        inputRange: [0, 1],
        outputRange: [0, props.width],
        extrapolate: Extrapolate.CLAMP
    });

    /*
    Here we evaluates text height get it's half, to show line through the center of the text
    *Note: We can increase accuracy in future realeases by calculating median, cap height, baseline of each text line
    */
    return <Animated.View style={[styles.strikeLine, {borderColor: props.strikeColor, top: props.height / 2, marginBottom: props.height - 2, transform: [{ scaleX: scaling }]}]}/>
}

const styles = StyleSheet.create({
    strikeLine: {
        borderColor: 'black',
        borderWidth: 1,
        left: 0
    }
});

export default StrikeLine;
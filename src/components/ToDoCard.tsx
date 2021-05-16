import React, { useState, useMemo } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    GestureResponderEvent
} from 'react-native';
import {
    PanGestureHandler,
    State,
} from 'react-native-gesture-handler';
import Animated, { 
    block,
    event,
    Value,
    cond,
    clockRunning,
    startClock,
    spring,
    debug,
    stopClock,
    useValue,
    Clock,
    set,
    add,
    eq,
    lessThan,
    interpolate,
    Extrapolate
} from 'react-native-reanimated';
import StrikeText from './StrikeText';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { shadow } from '../themes/styles';

//Get width of mobile screen.
const width = Dimensions.get("window").width;
const SWIPE_GESTURE_THRESHOLD = 150;
const START_SCALE_THRESHOLD = 50;
const STATUS_COLORS = {
    running: 'orange',
    finished: 'green',
    expired: 'red'
}

export type statusType = 'running' | 'finished' | 'expired';

//This interface introduces mandatory (with no question mark ?) and optional (with question mark ?) props.
interface ToDoCardProps {
    enableGesture?: boolean,
    title: string,
    details: string,
    date: string,
    isCompleted?: boolean,
    style?: object,
    titleStyle?: object,
    detailsStyle?: object,
    dateStyle?: object,
    inactiveIconColor?: string,
    activeIconColor?: string,
    status?: statusType,
    strikeColor?: string,
    onUpdatePress?: (event: GestureResponderEvent) => void,
    onDeletePress?: (event: GestureResponderEvent) => void,
    onIconPress?: (status: boolean) => void
}

const runSpring = (clock, from, to, velocity) => {
    const state = {
        finished: new Value(0),//The finished will either be a 0 or 1,change to 1 if animation ended.
        position: new Value(0),//Track position from where animated object start moving till stop.
        time: new Value(0),//Time node that just indicates the last clock time the animation node has been evaluated.
        velocity: new Value(0)//Velocity state to create fluid motions.
    };

    const config = {
        damping: 7,//Defines how the spring’s motion should be damped due to the forces of friction. Default 10 (damping is an influence within or upon an oscillatory system that has the effect of reducing, restricting or preventing its oscillations).
        mass: 1,//The mass of the object attached to the end of the spring. Default 1.
        stiffness: 121.6,//The spring stiffness coefficient. Default 100 ( is the extent to which an object resists deformation in response to an applied force).
        overshootClamping: false,//Boolean indicating whether the spring should be clamped and not bounce. Default false.
        restSpeedThreshold: 0.001,//The speed at which the spring should be considered at rest in pixels per second. Default 0.001.
        restDisplacementThreshold: 0.001,//The threshold of displacement from rest below (move from rest position) which the spring should be considered at rest. Default 0.001.
        toValue: new Value(0)//Here we set end value "to"
    }

    return block([
        /*
        cond If conditionNode evaluates to "truthy" value the node evaluates ifNode node and returns its value, otherwise it evaluates elseNode
        If clock is not runing start running else evaluates to the empty array
        */
        cond(
            clockRunning(clock),
            [],
            [
                set(state.finished, 0),
                set(state.velocity, velocity),
                set(state.position, from),
                set(config.toValue, to),
                startClock(clock)
            ]
        ),
        // we run the step here that is going to update position
        spring(clock, state, config),
        //If the animation is over we stop the clock
        cond(state.finished, debug('stop clock', stopClock(clock))),
        //We made the block return the updated position
        state.position
    ]);
};

const ToDoCard: React.FC<ToDoCardProps> = (props) => {
    const  [isCompleted, setIsCompleted] = useState<boolean>(props.isCompleted);
    const transX = useValue<number>(0);
    const offsetX = useValue<number>(0);
    const velocity = useValue<number>(0);
    const {clock} = useMemo(() => ({
        clock: new Clock()
    }), []);

    //Here we use interpolate to track transX change from START_SCALE_THRESHOLD to 1/3 width of screen to scale update button
    const scaleUpdateButton = interpolate(transX, {
        inputRange: [START_SCALE_THRESHOLD, width/3],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP
    });

    //Here we use interpolate to track transX change from START_SCALE_THRESHOLD to 1/3 width of screen to scale delete button
    const scaleDeleteButton = interpolate(transX, {
        inputRange: [-width/3, -START_SCALE_THRESHOLD],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP
    });

    //Here we use interpolate to track transX change from initial 0 to 1/3 width of screen to increase opacity of update button
    const opacityUpdateButton = interpolate(transX, {
        inputRange: [0, width/3],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP
    });

    //Here we use interpolate to track transX change from initial 1/3 width of screen to 0 to increase opacity of delete button
    const opacityDeleteButton = interpolate(transX, {
        inputRange: [-width/3, 0],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP
    });

    const onGestureEvent = event([
        {
            //Here we subscribe to translation through X axis only
            nativeEvent: ({ translationX: x, state }) =>
            block([
                //Here we add initial x with offsetX (new value generated during translation) then set new value to transX
                set(transX, add(x, offsetX)),
                //Here we check if animation finished
                cond(eq(state, State.END), [
                    //If transX is less than 0 means that transX starts from 0 to left else from 0 to right
                    cond(lessThan(transX, 0), [
                        //If transX is less than minus SWIPE_GESTURE_THRESHOLD continue spring animation till view delete button else return with spring animation to initial state
                        cond(lessThan(transX, -SWIPE_GESTURE_THRESHOLD), [
                            //Continue spring animation by sending transX as initial and minus SWIPE_GESTURE_THRESHOLD as end
                            set(transX, runSpring(clock, transX, -SWIPE_GESTURE_THRESHOLD, velocity))
                        ],
                        [
                            //return with spring animation to initial state
                            set(transX, runSpring(clock, transX, 0, velocity))
                        ])
                    ],
                    [
                        //If transX is less than SWIPE_GESTURE_THRESHOLD continue spring animation till view update button else return with spring animation to initial state
                        cond(lessThan(transX, SWIPE_GESTURE_THRESHOLD), [
                            //return with spring animation to initial state
                            set(transX, runSpring(clock, transX, 0, velocity))
                        ],
                        [
                            //Continue spring animation by sending transX as initial and SWIPE_GESTURE_THRESHOLD as end
                            set(transX, runSpring(clock, transX, SWIPE_GESTURE_THRESHOLD, velocity))
                        ])
                    ]),
                    set(offsetX, transX)
                ])
            ])
        }
    ]);

    const onIconPress = () => {
        setIsCompleted(!isCompleted);
        props.onIconPress(!isCompleted);
    }

    return <View style={styles.container}>
        <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onGestureEvent} minDist={40} enabled={props.enableGesture}>
            <Animated.View style={[styles.frontContainer, {transform: [{ translateX: transX }]}]}>
                <View style={[styles.cardContainer, props.style]}>
                    <View style={styles.statusContainer}>
                        <View style={[styles.status, {backgroundColor: STATUS_COLORS[props.status]}]}/>
                    </View>
                    <View style={styles.bodyContainer}>
                        <StrikeText {...props} style={[styles.title, props.titleStyle]} enableStrike={isCompleted}>{props.title}</StrikeText>
                        <StrikeText {...props} style={props.detailsStyle} enableStrike={isCompleted}>{props.details}</StrikeText>
                        <Text style={[styles.dueDate, props.dateStyle]}><SimpleLineIcons name='clock' size={10}/>{' '+props.date}</Text>
                    </View>
                    <View style={styles.checkIconContainer}>
                        <TouchableOpacity style={[styles.checkIconCircle, {backgroundColor: props.inactiveIconColor}]} onPress={onIconPress}>
                            {isCompleted && <AntDesign name='checkcircle' color={props.activeIconColor} size={35}/>}
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </PanGestureHandler>{/*Here is To Do card appears above other component*/}
        <View style={styles.behindContainer}>
            <TouchableOpacity onPress={props.onUpdatePress}>
                <Animated.View style={[styles.actionButton, {backgroundColor: 'green', transform: [{scaleX: scaleUpdateButton, scaleY: scaleUpdateButton}], opacity: opacityUpdateButton}]}>
                    <Feather name='edit-3' size={25} color='white'/>
                </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onDeletePress}>
                <Animated.View style={[styles.actionButton, {backgroundColor: 'red', transform: [{scaleX: scaleDeleteButton, scaleY: scaleDeleteButton}], opacity: opacityDeleteButton}]}>
                    <AntDesign name='delete' size={25} color='white'/>
                </Animated.View>
            </TouchableOpacity>
        </View>{/*Here is update & delete buttons appear behind To DO card component*/}
    </View>
}

ToDoCard.defaultProps = {
    enableGesture: true,
    activeIconColor: '#2398ff',
    inactiveIconColor: '#dee9fd',
    status: 'finished',
    onIconPress: () => {} 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20
    },
    frontContainer: {
        width: '100%',
        marginVertical: 3,
        zIndex: 1,
        ...shadow
    },
    cardContainer: {
        flexDirection: 'row',
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#dee9fd',
        ...shadow
    },
    statusContainer: {
        flex: 1
    },
    status: {
        flex: 1,
        backgroundColor: 'red',
        borderRadius: 20,
        marginVertical: 5,
        marginHorizontal: 5
    },
    bodyContainer: {
        flex: 8,
        paddingHorizontal: 5,
        paddingVertical: 10,
        overflow: 'hidden'
    },
    title: {
        fontSize: 16,
        fontWeight: '700'
    },
    dueDate: {
        fontSize: 12,
        marginTop: 5
    },
    checkIconContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkIconNeumorphism: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkIconCircle: {
        height: 35,
        width: 35,
        borderRadius: 17.5,
        backgroundColor: '#dee9fd'
    },
    behindContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection:'row',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
    },
    actionButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadow
    }
});

export default ToDoCard;
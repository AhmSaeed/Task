import constants from '../actionConstants';

const {
    TOGGLE_APPLICATION_THEME
} = constants;

//toggle theme between Light and dark
export const toggleApplicationTheme = () => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_APPLICATION_THEME
        })
    }
}
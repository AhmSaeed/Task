const initialState = {
    theme: 'Light'
}

//access state to check if theme is light and toggle it to dark or vise versa
const settingsReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case 'TOGGLE_APPLICATION_THEME':
            state = {
                ...state,
                theme: state.theme == 'Light'? 'Dark' : 'Light'
            }
            break;
    }
    return state;
};

export default settingsReducer;
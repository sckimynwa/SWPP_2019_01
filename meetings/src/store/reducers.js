import {combineReducers} from 'redux';
import * as variables from './variables';

//initialState
const initialMeetingsState = {
    data: [],
    inputSinceWhen: '',
    inputTilWhen: '',
    updating: false,
    updatingId: -10,
};
const initialAuthState = {
    login: false,
    username: '',
    token: '',
    inputUser: '',
    inputPassword: '',
};

function meetings(state = initialMeetingsState, action) {
    switch (action.type) {
        case variables.REFRESH:
            return {
                ...state, data: action.meetings,
            };
        case variables.SINCEWHEN_CHANGE:
            return {
                ...state,
                inputSinceWhen: action.value,
            };
        case variables.TILWHEN_CHANGE:
            return {
                ...state,
                inputTilWhen: action.value,
            };
        default:
            return state;
    }
}
function auth(state = initialAuthState, action) {
    switch (action.type) {
        case variables.LOGIN_SUCCESS:
            return {
                ...state,
                login: true,
                username: action.username,
                token: action.token,
            };
        case variables.LOGIN_FAIL:
            return state;
        case variables.LOGOUT:
            return {
                ...state,
                login: false,
                username: '',
                token: '',
            };
        case variables.INPUT_USER_CHANGE:
            return {
                ...state,
                inputUser: action.value,
            };
        case variables.INPUT_PASSWORD_CHANGE:
            return {
                ...state,
                inputPassword: action.value,
            };
        default:
            return state;
    }
}

export default combineReducers({
    meetings,
    auth,
})

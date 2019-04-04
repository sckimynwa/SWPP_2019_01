import * as variables from './variables';
//meeting function
function getAllMeetings() {
    return {
      type: variables.GET_ALL_MEETING,
    }
}

function addMeeting(meeting) {
    return {
        type: variables.ADD_MEETING,
        meeting,
    }
}

function deleteMeeting(id) {
    return {
        type: variables.DELETE_MEETING,
        id,
    }
}
//login function
function login(user) {
    return {
        type: variables.LOGIN,
        user,
    }
}

function logout() {
    return {
        type: variables.LOGOUT,
    }
}
/*Reducer*/
function refreshMeetings(meetings) {
    return {
        type: variables.REFRESH,
        meetings,
    }
}

function loginSuccess(userInfo) {
    return {
        type: variables.LOGIN_SUCCESS,
        username: userInfo.username,
        token: userInfo.token,
    }
}

function loginFail() {
    return {
        type: variables.LOGIN_FAIL,
    }
}

function changeInputSinceWhen(value) {
    return {
        type: variables.SINCEWHEN_CHANGE,
        value,
    }
}

function changeInputTilWhen(value) {
    return {
        type: variables.TILWHEN_CHANGE,
        value,
    }
}

function changeInputUser(value) {
    return {
        type: variables.INPUT_USER_CHANGE,
        value,
    }
}

function changeInputPassword(value) {
    return {
        type: variables.INPUT_PASSWORD_CHANGE,
        value,
    }
}

export default {
    getAllMeetings,
    addMeeting,
    deleteMeeting,
    login,
    logout,
    refreshMeetings,
    loginSuccess,
    loginFail,
    changeInputSinceWhen,
    changeInputTilWhen,
    changeInputUser,
    changeInputPassword,
};

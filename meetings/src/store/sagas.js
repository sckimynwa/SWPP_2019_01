import {all,call,put,select,takeEvery,takeLatest,} from 'redux-saga/effects';
import actions from './actions';
import * as variables from './variables';

function* getAllMeetings() {
    let meetingsData;
    const option = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        mode: 'cors',
    };
    try {
        const response = yield call(fetch, 'http://127.0.0.1:8000/meetings/', option);
        if (!response.ok) {
            return;
        }
        meetingsData = yield response.json();
    } catch (error) {
        alert('fetch failed: ' + error);
        return;
    }
    yield put(actions.refreshMeetings(meetingsData));
}

function* addMeeting(action) {
    const state = yield select();
    const option = {
        method: 'POST',
        withCredentials: true,
        //define headers
        headers: new Headers({
            'Authorization': `Token ${state.auth.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        mode: 'cors',
    };
    option.body = JSON.stringify(action.meeting);
    try {
        const response = yield call(fetch, 'http://127.0.0.1:8000/meetings/', option);
        if (!response.ok) {
            return;
        }
    } catch (error) {
        alert('post failed ' + error);
        return;
    }
    yield call(getAllMeetings);
}

function* deleteMeeting(action) {
    const state = yield select();
    const option = {
        method: 'DELETE',
        withCredentials: true,
        headers: new Headers({
            'Authorization': `Token ${state.auth.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        mode: 'cors',
    };
    try {
        const response = yield call(fetch, `http://127.0.0.1:8000/meetings/${action.id}/`, option);
        if (!response.ok) {
            alert('Not Your Reservation!');
            return;
        }
    } catch (error) {
        alert('delete failed and response not arrived!' + error);
        return;
    }
    yield call(getAllMeetings);
}

//login function
function* login(action) {
    let userInfo;
    const option = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        mode: 'cors',
    };
    option.body = JSON.stringify(action.user);
    try {
        const response = yield call(fetch, 'http://127.0.0.1:8000/api-token-auth/', option);
        if (!response.ok) {
            alert('login failed!');
            return;
        }else{
          alert('login success!');
          userInfo = yield response.json();
        }
    } catch (error) {
        alert('login failed and response not arrived!' + error);
        return;
    }
    userInfo.username = action.user.username;
    yield put(actions.loginSuccess(userInfo));
    yield call(getAllMeetings);
}

export default function* rootSaga(api) {
    yield all([
        takeLatest(variables.GET_ALL_MEETING, getAllMeetings),
        takeLatest(variables.LOGIN, login),
        takeEvery(variables.ADD_MEETING, addMeeting),
        takeEvery(variables.DELETE_MEETING, deleteMeeting),
    ]);
}

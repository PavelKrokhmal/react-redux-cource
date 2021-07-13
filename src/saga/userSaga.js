import {put, takeEvery, call} from "redux-saga/effects"

import {FETCH_USERS, setUsersAction} from '../store/userReducer'

const fetchUsersFromApi = () => fetch('https://jsonplaceholder.typicode.com/users?_limit=10')

function* fetchUserWorker () {
    const data = yield call(fetchUsersFromApi)
    const json = yield call(() => data.json())
    yield put(setUsersAction(json))
}

export function* userWatcher() {
    yield takeEvery(FETCH_USERS, fetchUserWorker)
}
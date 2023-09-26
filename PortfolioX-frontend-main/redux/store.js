import { configureStore } from '@reduxjs/toolkit';
import {
    otherReducer,
    profileReducer,
    userReducer,
} from './reducers/userReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        other: otherReducer
    },
});

export default store;

export const server = 'http://192.168.1.5:4000/api/v1';

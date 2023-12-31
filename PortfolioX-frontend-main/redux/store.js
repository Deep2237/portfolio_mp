import { configureStore } from '@reduxjs/toolkit';
import subscriptionReducer, {
    otherReducer,
    profileReducer,
    userReducer,
} from './reducers/userReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        other: otherReducer,
        subscription: subscriptionReducer,

    },
});

export default store;

export const server = 'http://192.168.1.4:4000/api/v1';

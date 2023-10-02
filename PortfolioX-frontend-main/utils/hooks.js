import { useEffect, useState } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useSelector } from "react-redux";
import { loadUser } from "../redux/action/user";
import { CommonActions } from '@react-navigation/native';


export const useMessageAndErrorUser = (
    navigation,
    dispatch,
    navigateTo = "login"
) => {
    const LoginNavigator = "Profile"
    const LogoutNavigator = "Home"
    const VerifyNavigator = "Verify"
    const { loading, message, error, user } = useSelector((state) => state.user);
    // console.log("in hook1")
    // console.log(user)
    let load = false;
    // console.log(loading, message, error);
    useEffect(() => {
        if (error) {
            Toast.show({
                type: "error",
                text1: error,
            });
            dispatch({
                type: "clearError",
            });
        }

        if (message) {
            // console.log("In Hook1")
            // console.log(navigation, dispatch, navigateTo)
            if (message.includes("Welcome back") || message.includes("Registered Successfully")) {
                load = true;
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0, // Index of the screen to navigate to (0 for the first screen)
                        routes: [{ name: LoginNavigator }], // Array of route objects, specify the screen to navigate to
                    })
                );
            }

            if (message.includes("Logged Out Successfully")) {

                navigation.dispatch(
                    CommonActions.reset({
                        index: 0, // Index of the screen to navigate to (0 for the first screen)
                        routes: [{ name: LogoutNavigator }], // Array of route objects, specify the screen to navigate to
                    })
                );
            }
            // if (message.includes("Email Sent To")) {
            //     load = true;
            //     navigation.dispatch(
            //         CommonActions.reset({
            //             index: 0, // Index of the screen to navigate to (0 for the first screen)
            //             routes: [{ name: VerifyNavigator }], // Array of route objects, specify the screen to navigate to
            //         })
            //     );
            // }


            Toast.show({
                type: "success",
                text1: message,
            });
            dispatch({
                type: "clearMessage",
            });
            if (load)
                dispatch(loadUser());
        }
    }, [error, message, dispatch]);

    return loading;
};


export const useMessageAndErrorProfile = (
    navigation,
    dispatch,
    navigateTo
) => {
    const LoginNavigator = "Profile"
    const LogoutNavigator = "Home"
    const VerifyNavigator = "Verify"
    const { loading, message, error } = useSelector((state) => state.profile);
    // console.log("in hook2")
    // console.log(loading, message, error);
    useEffect(() => {
        if (error) {
            Toast.show({
                type: "error",
                text1: error,
            });
            dispatch({
                type: "clearError",
            });
        }

        if (message) {
            // console.log("In Hook2")
            // console.log(navigation, dispatch, navigateTo)
            if (navigateTo !== null) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0, // Index of the screen to navigate to (0 for the first screen)
                        routes: [{ name: navigateTo }], // Array of route objects, specify the screen to navigate to
                    })
                );
            }


            Toast.show({
                type: "success",
                text1: message,
            });
            dispatch({
                type: "clearMessage",
            });
            // dispatch(loadUser());
        }
    }, [error, message, dispatch]);

    return loading;
};


export const useMessageAndErrorOther = (
    navigation,
    dispatch,
    navigateTo
) => {
    const LoginNavigator = "Profile"
    const LogoutNavigator = "Home"
    const VerifyNavigator = "Verify"
    const { loading, message, error } = useSelector((state) => state.other);
    // console.log("in hook other3")
    // console.log(loading, message, error);
    useEffect(() => {
        if (error) {
            Toast.show({
                type: "error",
                text1: error,
            });
            dispatch({
                type: "clearError",
            });
        }

        if (message) {
            // console.log("In Hook3")
            // console.log(navigation, dispatch, navigateTo)
            if (navigateTo !== null) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0, // Index of the screen to navigate to (0 for the first screen)
                        routes: [{ name: navigateTo }], // Array of route objects, specify the screen to navigate to
                    })
                );
            }


            Toast.show({
                type: "success",
                text1: message,
            });
            dispatch({
                type: "clearMessage",
            });
            // dispatch(loadUser());
        }
    }, [error, message, dispatch]);

    return loading;
};


export const useMessageAndErrorSubscription = (
    navigation,
    dispatch,
    navigateTo
) => {

    const { loading, message, error, subscriptionId } = useSelector((state) => state.subscription);
    // console.log("in hook other3")
    // console.log(loading, message, error);
    useEffect(() => {
        if (error) {
            Toast.show({
                type: "error",
                text1: error,
            });
            dispatch({
                type: "clearError",
            });
        }

        if (message) {
            // console.log("In Hook3")
            // console.log(navigation, dispatch, navigateTo)
            if (navigateTo !== null) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0, // Index of the screen to navigate to (0 for the first screen)
                        routes: [{ name: navigateTo }], // Array of route objects, specify the screen to navigate to
                    })
                );
            }


            Toast.show({
                type: "success",
                text1: message,
            });
            dispatch({
                type: "clearMessage",
            });
            // dispatch(loadUser());
        }
    }, [error, message, dispatch]);

    return { loading, subscriptionId };
};


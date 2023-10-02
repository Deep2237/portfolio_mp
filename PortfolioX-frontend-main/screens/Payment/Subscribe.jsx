import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import RazorpayCheckout from "react-native-razorpay";
import { useDispatch } from "react-redux";
import { server } from "../../redux/store";
import { buySubscription, loadUser } from "../../redux/action/user";
import { useMessageAndErrorSubscription } from "../../utils/hooks";
import { useStripe } from "@stripe/stripe-react-native";
import Loader from "../Loader";

const Subscribe = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();

  const [key, setKey] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [loaderLoading, setLoaderLoading] = useState(false);
  //   const [loading, setLoading] = useState(false);
  // const { loading, error, subscriptionId } = useSelector(
  //   (state) => state.subscription
  // );
  const { loading, subscriptionId } = useMessageAndErrorSubscription(
    navigation,
    dispatch,
    null
  );
  console.log(subscriptionId);
  const subscribeHandler = async () => {
    const {
      data: { key },
    } = await axios.get(`${server}/razorpaykey`);

    setKey(key);
    const { name, symbol, avgbuyingprice } = route.params;
    await dispatch(buySubscription(name, symbol, quantity, avgbuyingprice));
    // console.log(key, subscriptionId, name, symbol, quantity, avgbuyingprice);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (subscriptionId) {
        console.log(subscriptionId);
        const init = await stripe.initPaymentSheet({
          paymentIntentClientSecret: subscriptionId,
          merchantDisplayName: "6PackEcom",
        });

        if (init.error) {
          Toast.show({ type: "error", text1: init.error.message });
          dispatch({
            type: "clearSubscriptionId",
          });
          console.log(init.error.message);

          return;
        }

        const presentSheet = await stripe.presentPaymentSheet();
        setLoaderLoading(true);

        if (presentSheet.error) {
          setLoaderLoading(false);
          Toast.show({ type: "error", text1: presentSheet.error.message });
          console.log(presentSheet.error.message);
          dispatch({
            type: "clearSubscriptionId",
          });
          return;
        }

        const { paymentIntent } = await stripe.retrievePaymentIntent(
          subscriptionId
        );

        if (paymentIntent.status === "Succeeded") {
          console.log(paymentIntent.id, paymentIntent.status, subscriptionId);
          try {
            const response = await axios.post(`${server}/paymentverification`, {
              paymentIntentId: paymentIntent.id,
              subscriptionId: subscriptionId,
            });

            // Handle the response from the server if needed
            console.log("Payment Verification Response:", response.data);
            navigation.navigate("PaymentSuccess", {
              paymentid: paymentIntent.id,
            });
            await dispatch(loadUser());
          } catch (error) {
            console.log("Error making payment verification request:", error);
          }
        }
        setLoaderLoading(false);
      }
    };

    fetchData(); // Call the async function
  }, [dispatch, key, subscriptionId]);

  return loaderLoading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.buyButton,
          { backgroundColor: loading ? "gray" : "green" },
        ]}
        onPress={subscribeHandler}
        disabled={loading}
      >
        <Text style={styles.buyButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
  },

  buyButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Subscribe;

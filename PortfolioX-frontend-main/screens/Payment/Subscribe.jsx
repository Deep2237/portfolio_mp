// import React, { useState, useEffect } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import axios from "axios";
// import Toast from "react-native-toast-message";
// import RazorpayCheckout from "react-native-razorpay";
// import { useDispatch } from "react-redux";
// import { server } from "../../redux/store";
// import { buySubscription, loadUser } from "../../redux/action/user";
// import { useMessageAndErrorSubscription } from "../../utils/hooks";
// import { useStripe } from "@stripe/stripe-react-native";
// import Loader from "../Loader";

// const Subscribe = ({ route, navigation }) => {
//   const dispatch = useDispatch();
//   const stripe = useStripe();

//   const [key, setKey] = useState("");
//   const [quantity, setQuantity] = useState(10);
//   const [loaderLoading, setLoaderLoading] = useState(false);
//   //   const [loading, setLoading] = useState(false);
//   // const { loading, error, subscriptionId } = useSelector(
//   //   (state) => state.subscription
//   // );
//   const { loading, subscriptionId } = useMessageAndErrorSubscription(
//     navigation,
//     dispatch,
//     null
//   );
//   console.log(subscriptionId);
//   const subscribeHandler = async () => {
//     const {
//       data: { key },
//     } = await axios.get(`${server}/razorpaykey`);

//     setKey(key);
//     const { name, symbol, avgbuyingprice } = route.params;
//     await dispatch(buySubscription(name, symbol, quantity, avgbuyingprice));
//     // console.log(key, subscriptionId, name, symbol, quantity, avgbuyingprice);
//   };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (subscriptionId) {
  //       console.log(subscriptionId);
  //       const init = await stripe.initPaymentSheet({
  //         paymentIntentClientSecret: subscriptionId,
  //         merchantDisplayName: "6PackEcom",
  //       });

  //       if (init.error) {
  //         Toast.show({ type: "error", text1: init.error.message });
  //         dispatch({
  //           type: "clearSubscriptionId",
  //         });
  //         console.log(init.error.message);

  //         return;
  //       }

  //       const presentSheet = await stripe.presentPaymentSheet();
  //       setLoaderLoading(true);

  //       if (presentSheet.error) {
  //         setLoaderLoading(false);
  //         Toast.show({ type: "error", text1: presentSheet.error.message });
  //         console.log(presentSheet.error.message);
  //         dispatch({
  //           type: "clearSubscriptionId",
  //         });
  //         return;
  //       }

  //       const { paymentIntent } = await stripe.retrievePaymentIntent(
  //         subscriptionId
  //       );

  //       if (paymentIntent.status === "Succeeded") {
  //         console.log(paymentIntent.id, paymentIntent.status, subscriptionId);
  //         try {
  //           const response = await axios.post(`${server}/paymentverification`, {
  //             paymentIntentId: paymentIntent.id,
  //             subscriptionId: subscriptionId,
  //           });

  //           // Handle the response from the server if needed
  //           console.log("Payment Verification Response:", response.data);
  //           navigation.navigate("PaymentSuccess", {
  //             paymentid: paymentIntent.id,
  //           });
  //           await dispatch(loadUser());
  //         } catch (error) {
  //           console.log("Error making payment verification request:", error);
  //         }
  //       }
  //       setLoaderLoading(false);
  //     }
  //   };

  //   fetchData(); // Call the async function
  // }, [dispatch, key, subscriptionId]);

//   return loaderLoading ? (
//     <Loader />
//   ) : (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={[
//           styles.buyButton,
//           { backgroundColor: loading ? "gray" : "green" },
//         ]}
//         onPress={subscribeHandler}
//         disabled={loading}
//       >
//         <Text style={styles.buyButtonText}>Pay Now</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     marginTop: 50,
//   },

//   buyButton: {
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   buyButtonText: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default Subscribe;


import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import RazorpayCheckout from "react-native-razorpay";
import { useDispatch } from "react-redux";
import { server } from "../../redux/store";
import { useSelector } from "react-redux";
import { buySubscription, loadUser } from "../../redux/action/user";
import { useMessageAndErrorSubscription } from "../../utils/hooks";
import { useStripe } from "@stripe/stripe-react-native";
import Loader from "../Loader";



const BuyStock = ({ route, navigation }) => {
  
  const dispatch = useDispatch();
  const stripe = useStripe();
  const [key, setKey] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [totalPrice, setTotalPrice] = useState(1000); // Initial value for total price (stock price * quantity)
  const [loaderLoading, setLoaderLoading] = useState(false);

  // const [loading, setLoading] = useState(false);
  // const { loading, error, subscriptionId } = useSelector(
  //   (state) => state.subscription
  // );
  const { loading, subscriptionId } = useMessageAndErrorSubscription(
    navigation,
    dispatch,
    null
  );

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

  const handleQuantityChange = (value) => {
    const newQuantity = parseInt(value, 10) || 0;
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * 100);
  };


return loaderLoading ? (
  <Loader />
) : (
  <View style={styles.container}>
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.stockName}>{'tcs'}</Text>
        <Text style={styles.stockPrice}>₹{100}</Text>
      </View>
        <Text style={styles.enterQuantity}>Enter Quantity</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholderTextColor="gray" 
          placeholder="Quantity"
          value={quantity}
          onChangeText={handleQuantityChange}
        />
    </View>
    <View style={styles.totalPriceContainer}>
      <Text style={styles.totalPriceHeading}>Total Price:</Text>
      <Text style={styles.totalPriceValue}>₹{totalPrice}</Text>
    </View>
    <TouchableOpacity
      style={[
        styles.buyButton,
        { backgroundColor: loading ? "gray" : "green" },
      ]}
      onPress={subscribeHandler}
      disabled={loading}
    >
      <Text style={styles.buyButtonText}>Buy Now</Text>
    </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 16,
  marginTop: 50,
  alignItems: "center",
  backgroundColor: "#121212",

  
},
card: {
  borderColor: "#444",
  borderWidth: 1,
  borderRadius: 10,
  padding: 20,
  marginBottom: 20,
  width: "100%",
  backgroundColor: "#1A1A1A",

},
row: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 10,
},
stockName: {
  fontSize: 18,
  fontWeight: "bold",
  color:"#DDD"
},
stockPrice: {
  fontSize: 18,
  color:"#DDD"
},
enterQuantity: {
  marginTop:30,
  marginBottom:15,
  fontSize: 16,
  textAlign: "center",
  color:"#DDD"
},
input: {
  borderWidth: 1,
  borderColor: "#ccc",
  padding: 10,
  fontSize: 16,
  width: "80%",
  alignSelf: "center",
  color:"#DDD",
  borderRadius:10,
},

totalPriceContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 20,
  color:"#DDD"
},
totalPriceHeading: {
  fontSize: 18,
  fontWeight: "bold",
  marginRight: 10,
  color:"#DDD"
},
totalPriceValue: {
  fontSize: 18,
  backgroundColor: "#ccc",
  padding: 10,
  borderRadius: 5,
},
buyButton: {
  position:"absolute",
  bottom:25,
  padding: 12,
  borderRadius: 8,
  alignItems: "center",
  backgroundColor: "green",
  width: "80%",
},
buyButtonText: {
  fontSize: 18,
  fontWeight: "bold",
  color: "white",
},
});

export default BuyStock;

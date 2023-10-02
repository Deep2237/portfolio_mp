// import { View, Text } from "react-native";
// import React from "react";
// import { defaultStyle } from "../../styles/style";

// const PaymentSuccess = ({ route, navigation }) => {
//   return (
//     <View style={{ margin: 50 }}>
//       <Text>Payemnt SuccessFully </Text>
//       <Text>${route.params.paymentid}</Text>
//     </View>
//   );
// };

// export default PaymentSuccess;

// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// const PaymentSuccess = ({ route, navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.successText}>Payment Successfully Processed</Text>
//       <Text style={styles.paymentIdText}>Payment ID: {route.params.paymentid}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f0f0f0", // Background color
//   },
//   successText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "green", // Success text color
//   },
//   paymentIdText: {
//     fontSize: 18,
//     color: "#333", // Payment ID text color
//   },
// });

// export default PaymentSuccess;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const PaymentSuccess = ({ route, navigation }) => {
  const handleHomeNavigation = () => {
    // Navigate to Home screen
    navigation.navigate("Home"); // Replace "Home" with the actual route name for your home screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.successText}>Payment Successfully Processed</Text>
      <Text style={styles.paymentIdText}>Payment ID: {route.params.paymentid}</Text>

      {/* Home Button */}
      <TouchableOpacity onPress={handleHomeNavigation} style={styles.homeButton}>
        <Text style={styles.homeButtonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Background color
  },
  successText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "green", // Success text color
  },
  paymentIdText: {
    fontSize: 18,
    color: "#333", // Payment ID text color
  },
  homeButton: {
    marginTop: 20,
    position:"absolute",
    bottom:50,
    padding: 10,
    backgroundColor: "green", // Button background color
    borderRadius: 5,
  },
  homeButtonText: {
    color: "white", // Button text color
    fontSize: 18,
  },
});

export default PaymentSuccess;

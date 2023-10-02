import { View, Text } from "react-native";
import React from "react";
import { defaultStyle } from "../../styles/style";

const PaymentSuccess = ({ route, navigation }) => {
  return (
    <View style={{ margin: 50 }}>
      <Text>Payemnt SuccessFully </Text>
      <Text>${route.params.paymentid}</Text>
    </View>
  );
};

export default PaymentSuccess;

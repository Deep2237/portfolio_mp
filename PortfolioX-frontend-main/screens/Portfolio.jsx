import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { defaultStyle } from "../styles/style";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../redux/store";
import { Dimensions } from "react-native";

// Get the screen width
const screenWidth = Dimensions.get("window").width;

const Portfolio = ({ navigation }) => {
  const { message, error, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const [stocksData, setStocksData] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/getportfoliodata`)
      .then((response) => {
        setStocksData(response.data.logoData);
      })
      .catch((error) => {
        console.log("Error", "Failed to fetch stock data");
      });
  }, [user]);

  const totalInvested = stocksData.reduce(
    (sum, stock) => sum + stock.avgbuyingprice * stock.quantity,
    0
  );

  const currentPortfolioValue = stocksData.reduce(
    (sum, stock) => sum + stock.currentprice * stock.quantity,
    0
  );

  const profitLoss = currentPortfolioValue - totalInvested;
  const profitLossPercentage = ((profitLoss / totalInvested) * 100).toFixed(2);
  const handleStockCardClick = (symbol) => {
    navigation.navigate("StockDetail", { symbol: symbol });
  };

  const renderStockCards = () => {
    return stocksData.map((stock, index) => (
      <TouchableOpacity
        key={index}
        activeOpacity={0.7}
        onPress={() => handleStockCardClick(stock.symbol)}
      >
        <View style={[styles.card]}>
          <View style={styles.row}>
            <Text
              style={[styles.title, styles.leftAligned, styles.name]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {stock.name}
            </Text>

            <Text style={[styles.value, styles.rightAligned]}>
              Quantity: {stock.quantity}
            </Text>
          </View>
          <View style={styles.rowWithBorder}>
            <View style={styles.column}>
              <Text style={[styles.title, styles.leftAligned]}>
                Current Price
              </Text>
              <Text style={[styles.value, styles.left1]}>
                ₹{stock.currentprice}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={[styles.title, styles.rightAligned]}>
                Avg. Buying Price
              </Text>
              <Text style={[styles.value, styles.rightAligned]}>
                ₹{stock.avgbuyingprice}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={[styles.title, styles.leftAligned]}>Profit</Text>
              <Text
                style={[
                  styles.value,
                  styles.left1,
                  stock.currentprice >= stock.avgbuyingprice
                    ? styles.greenText
                    : styles.redText,
                ]}
              >
                ₹
                {(
                  (stock.currentprice - stock.avgbuyingprice) *
                  stock.quantity
                ).toFixed(2)}
              </Text>
              <Text
                style={[
                  styles.value1,
                  styles.left1,
                  stock.currentprice >= stock.avgbuyingprice
                    ? styles.greenText
                    : styles.redText,
                ]}
              >
                {(
                  ((stock.currentprice - stock.avgbuyingprice) /
                    stock.avgbuyingprice) *
                  100
                ).toFixed(2)}
                %
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={[styles.title, styles.rightAligned]}>
                Total Value
              </Text>
              <Text style={[styles.value, styles.rightAligned]}>
                ₹{(stock.currentprice * stock.quantity).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={defaultStyle}>
        {stocksData.length === 0 ? (
          <Text style={styles.noStocksText}>No stocks available</Text>
        ) : (
          <View style={styles.totalInfoCard}>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={[styles.title, styles.leftAligned]}>Invested</Text>
                <Text style={[styles.value, styles.left1]}>
                  ₹{totalInvested.toFixed(2)}
                </Text>
              </View>
              <View style={styles.column}>
                <Text style={[styles.title, styles.rightAligned]}>
                  Current Value
                </Text>
                <Text style={[styles.value, styles.right1]}>
                  ₹{currentPortfolioValue.toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={styles.rowWithBorder}>
              <Text style={[styles.title, styles.leftAligned]}>
                Profit/Loss:
              </Text>
              <View style={styles.column}>
                <Text
                  style={[
                    styles.value,
                    styles.rightAligned,
                    profitLoss >= 0 ? styles.greenText : styles.redText,
                  ]}
                >
                  {profitLoss >= 0 ? "+" : ""}₹{profitLoss.toFixed(2)}
                </Text>
                <Text
                  style={[
                    styles.value1,
                    styles.rightAligned,
                    profitLoss >= 0 ? styles.greenText : styles.redText,
                  ]}
                >
                  {profitLossPercentage >= 0 ? "+" : ""}
                  {profitLossPercentage}%
                </Text>
              </View>
            </View>
          </View>
        )}

        {renderStockCards()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    width: screenWidth,
  },
  totalInfoCard: {
    backgroundColor: "#292929",
    borderRadius: 8,
    margin: 8,
    padding: 15,
    height: "auto", // Allow flexible height
    marginBottom: 20,
  },
  noStocksText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#292929",
    borderRadius: 8,
    margin: 8,
    padding: 20,
    height: "auto", // Allow flexible height
    width: screenWidth - 40, // Allow flexible width
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
    // width: screenWidth - 0, // Allow flexible width
  },
  rowWithBorder: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: "#777",
    borderTopWidth: 1,
    borderBottomColor: "#777",
    paddingTop: 10,
    marginBottom: 10,
  },
  leftAligned: {
    textAlign: "left",
    color: "#DDD",
  },
  name: {
    textAlign: "left",
    color: "#DDD",
    // paddingRight: 0,
    // borderRightWidth: 1,
    // borderRightColor: "#777",
    // marginRight: 50,
  },
  rightAligned: {
    textAlign: "right",
    color: "#DDD",
  },
  column: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#DDD",
  },
  value: {
    fontSize: 13,
    color: "#DDD",
  },
  value1: {
    fontSize: 11,
    color: "#DDD",
  },
  left1: {
    alignSelf: "flex-start",
  },
  right1: {
    alignSelf: "flex-end",
  },
  redText: {
    color: "red",
  },
  greenText: {
    color: "green",
  },
});

export default Portfolio;

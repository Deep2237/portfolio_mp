import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { defaultStyle } from "../styles/style";
import PopularStocks from "./PopularStocks";
import TopGainers from "./TopGainers";
import TopLosers from "./TopLosers";
import axios from "axios";
import { Text } from "react-native-paper";
import Loader from "./Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
  // Sample data for each section with name, price, and change percentage
  const [topGainersData, setTopGainersData] = useState([]);
  const [topLosersData, setTopLosersData] = useState([]);
  const [popularstocks, setPopularStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleStockItemClick = (name) => {
    console.log("Clicked on stock symbol:", name);
    navigation.navigate("StockDetail", { symbol: name });
  };

  useEffect(() => {
    const loaddata = async () => {
      try {
        setLoading(true);
        // const token = "check";
        // AsyncStorage.setItem("token1", token);
        // // await AsyncStorage.removeItem("token");
        // const keys = await AsyncStorage.getAllKeys();
        // const items = await AsyncStorage.multiGet(keys);
        // // // items is an array of key-value pairs

        // // // You can loop through items and process them as needed
        // console.log("All Tokens");
        // items.forEach(([key, value]) => {
        //   console.log(`Key: ${key}, Value: ${value}`);
        // });
        // console.log(token1);
        // setTopGainersData([]);
        // setTopLosersData([]);
        const { data } = await axios.get(
          `https://portfolio-x-backend.vercel.app/api/v1/topgainer`,
          {
            withCredentials: true,
          }
        );
        const data1 = await axios.get(
          `https://portfolio-x-backend.vercel.app/api/v1/toplosers`,

          {
            withCredentials: true,
          }
        );
        const data2 = await axios.get(
          `https://portfolio-x-backend.vercel.app/api/v1/getpopular`,

          {
            withCredentials: true,
          }
        );

        setPopularStocks(data2.data.topstocks);
        setTopLosersData(data1.data.topstocks);
        // await setTopGainersData(data.top5Stocks);
        setTopGainersData(data.topstocks);

        // data.top5Stocks[0].name = "OP";
        // console.log(topGainersData);

        // console.log(topGainersData, topLosersData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    loaddata();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView style={styles.container}>
          <View style={defaultStyle}>
            <PopularStocks
              data={popularstocks}
              onPress={handleStockItemClick}
            />
            <TopGainers data={topGainersData} onPress={handleStockItemClick} />
            <TopLosers data={topLosersData} onPress={handleStockItemClick} />
          </View>
        </ScrollView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
});

export default Home;

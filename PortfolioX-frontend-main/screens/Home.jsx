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
  const [topGainersData, setTopGainersData] = useState([]);
  const [topLosersData, setTopLosersData] = useState([]);
  const [popularstocks, setPopularStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleStockItemClick = (name) => {
    navigation.navigate("StockDetail", { symbol: name });
  };

  useEffect(() => {
    const loaddata = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `https://portfoliox-backend.onrender.com/api/v1/topgainer`,
          {
            withCredentials: true,
          }
        );
        const data1 = await axios.get(
          `https://portfoliox-backend.onrender.com/api/v1/toplosers`,

          {
            withCredentials: true,
          }
        );
        const data2 = await axios.get(
          `https://portfoliox-backend.onrender.com/api/v1/getpopular`,

          {
            withCredentials: true,
          }
        );

        setPopularStocks(data2.data.topstocks);
        setTopLosersData(data1.data.topstocks);

        setTopGainersData(data.topstocks);

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

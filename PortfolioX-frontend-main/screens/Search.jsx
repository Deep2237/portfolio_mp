import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { FlatList } from "react-native-gesture-handler";

const Search = ({ navigation }) => {
  const [inputValue, setInputValue] = useState(""); // State to store the input value
  const inputRef = useRef(null); // Reference to the TextInput
  const [searchdata, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);

  const screenHeight = Dimensions.get("window").height;

  const handleInputChange = (text) => {
    // Handle input changes and log the input
    setInputValue(text);
    // console.log("Input Value:", text);
  };
  const renderItem = ({ item }) => {
    // Remove the postfix ".NS" or ".BO" from the symbol
    const symbolWithoutPostfix = item.symbol
      .replace(".NS", "")
      .replace(".BO", "");

    // Determine the exchange (NSE or BSE) based on the postfix
    const exchange = item.symbol.endsWith(".NS") ? "NSE" : "BSE";

    const handleStockItemClick = () => {
      // console.log("Clicked Stock Symbol:", item.symbol);
      navigation.navigate("StockDetail", { symbol: item.symbol });
    };

    return (
      <TouchableOpacity onPress={handleStockItemClick}>
        <View style={styles.stockItem}>
          <View>
            <Text style={styles.stockName}>{item.name}</Text>
            <Text style={styles.stockSymbol}>{symbolWithoutPostfix}</Text>
          </View>
          <View>
            <Text style={styles.exchange}>{exchange}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setSearchData([]);
    const loaddata = async () => {
      try {
        setLoading(true);
        const url = `https://api.twelvedata.com/symbol_search?symbol=${inputValue}&outputsize=120&source=docs`;
        const { data } = await axios.get(url);
        let alldata = [];
        const symbolsWithoutPeriod = data.data.filter(
          (symbol) => !symbol.symbol.includes(".")
        );
        symbolsWithoutPeriod.forEach((item) => {
          if (item.exchange === "NSE") {
            alldata.push({ symbol: item.symbol + ".NS", name: "" });
          } else if (item.exchange === "BSE") {
            alldata.push({ symbol: item.symbol + ".BO", name: "" });
          }
        });

        const updatedAlldata = await Promise.all(
          alldata.map(async (item) => {
            try {
              const s = item.symbol;
              const url = `https://query1.finance.yahoo.com/v7/finance/options/${s}?modules=financialData`;
              const response1 = await axios.get(url);
              const name = response1.data.optionChain.result[0].quote.longName;

              item.name = name;
              return item;
            } catch (error) {
              return null;
            }
          })
        );

        const filteredAlldata = updatedAlldata.filter((item) => item !== null);
        setSearchData(filteredAlldata);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    loaddata();
  }, [inputValue]);

  return (
    <View style={[styles.container, { minHeight: screenHeight + 40 }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="ios-arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <TextInput
          ref={inputRef}
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#888"
          value={inputValue}
          onChangeText={handleInputChange}
        />
      </View>
      <FlatList
        data={searchdata}
        renderItem={renderItem}
        keyExtractor={(item) => item.symbol}
        style={styles.container1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 5 : 0,
    paddingBottom: 0,
    backgroundColor: "#000",
  },
  container1: {
    flex: 1,
    backgroundColor: "#000",
    marginTop: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  backButton: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#333",
    borderRadius: 8,
    color: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
  },
  stockItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  stockName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  stockSymbol: {
    fontSize: 12,
    color: "#888",
  },
  exchange: {
    fontSize: 12,
    color: "#888",
  },
  equityName: {
    fontSize: 12,
    color: "#888",
  },
});

export default Search;

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { defaultStyle } from "../styles/style";

const Portfolio = () => {
  const stocksData = [
    {
      name: "Stock 1",
      quantity: "100",
      currentPrice: "110",
      buyingPrice: "95",
      profit: "1500",
      totalValue: "15000",
    },
    {
      name: "Stock 2",
      quantity: "50",
      currentPrice: "80",
      buyingPrice: "70",
      profit: "500",
      totalValue: "4000",
    },
    // Add more stocks as needed
  ];

  // Calculate total amount invested and current portfolio value
  const totalInvested = stocksData.reduce(
    (sum, stock) => sum + parseFloat(stock.buyingPrice) * parseFloat(stock.quantity),
    0
  );

  const currentPortfolioValue = stocksData.reduce(
    (sum, stock) => sum + parseFloat(stock.currentPrice) * parseFloat(stock.quantity),
    0
  );

  const profitLoss = currentPortfolioValue - totalInvested;
  const profitLossPercentage = ((profitLoss / totalInvested) * 100).toFixed(2);

  const renderStockCards = () => {
    return stocksData.map((stock, index) => (
      <View key={index} style={[styles.card]}>
       <View style={styles.row}>
          <Text style={[styles.title, styles.leftAligned]}>
            {stock.name}
          </Text>
          <Text style={[styles.value, styles.rightAligned]}>
            Quantity: {stock.quantity}
          </Text>
        </View>
        <View style={styles.rowWithBorder}>
          <View style={styles.column}>
            <Text style={[styles.title, styles.leftAligned]}>
              Current Market Price
            </Text>
            <Text style={[styles.value, styles.left1]}>
              ₹{stock.currentPrice}
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={[styles.title, styles.rightAligned]}>
              Buying Price
            </Text>
            <Text style={[styles.value, styles.rightAligned]}>
              ₹{stock.buyingPrice}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={[styles.title, styles.leftAligned]}>
              Profit
            </Text>
            <Text style={[styles.value, styles.left1, stock.profit >= 0 ? styles.greenText : styles.redText]}>
              ₹{stock.profit}
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={[styles.title, styles.rightAligned]}>
              Total Value
            </Text>
            <Text style={[styles.value, styles.rightAligned]}>
              ₹{stock.totalValue}
            </Text>
          </View>
        </View> 
      </View>
    ));
  };

  return (
    <View style={defaultStyle}>
      <View style={styles.totalInfoCard}>
        <View style={styles.row}>
        <View style={styles.column}>
          <Text style={[styles.title, styles.leftAligned]}>Invested:</Text>
          <Text style={[styles.value, styles.left1]}>₹{totalInvested}</Text>
          </View>
          <View style={styles.column}>
          <Text style={[styles.title, styles.rightAligned]}>Current Value:</Text>
          <Text style={[styles.value, styles.right1]}>₹{currentPortfolioValue}</Text>
          </View>
        </View>
        <View style={styles.rowWithBorder}>
          <Text style={[styles.title, styles.leftAligned]}>Profit/Loss:</Text>
          <View style={styles.column}>
          <Text style={[styles.value, styles.rightAligned, profitLoss >= 0 ? styles.greenText : styles.redText]}>
          {profitLoss >= 0 ? '+' : ''}{profitLoss}
          </Text>
          <Text style={[styles.value1, styles.rightAligned, profitLoss >= 0 ? styles.greenText : styles.redText]}>
          {profitLoss >= 0 ? '+' : ''}{profitLossPercentage}%
          </Text>
          </View>
        </View>
      </View>
      {renderStockCards()}
    </View>
  );
};

const styles = StyleSheet.create({
  totalInfoCard: {
    backgroundColor: "#292929",
    borderRadius: 8,
    margin: 8,
    padding: 15,
    height: 160,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#292929",
    borderRadius: 8,
    margin: 8,
    padding: 15,
    height: 250,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop:10,
    marginBottom: 10,
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
  rightAligned: {
    textAlign: "right",
    color: "#DDD",
  },
  column: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#DDD",
  },
  value: {
    fontSize: 15,
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



// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { defaultStyle } from "../styles/style";

// const Portfolio = () => {
//   const portfolioData = {
//     invested: {
//       title: "Invested",
//       value: "10,000",
//     },
//     currentValue: {
//       title: "Current Value",
//       value: "11,000",
//     },
//     profitLoss: {
//       title: "P/L",
//       value: "1,000",
//       percentageChange: "10%",
//     },
//   };

//   // Check if profit/loss is positive or negative
//   const isProfitPositive = parseFloat(portfolioData.profitLoss.value) >= 0;
//   const isPercentageChangePositive =
//     parseFloat(portfolioData.profitLoss.percentageChange) >= 0;

//   return (
//     <View style={defaultStyle}>
//       <View style={[styles.card]}>
//         <View style={styles.row}>
//           <View style={[styles.rowPart, styles.left]}>
//             <Text style={[styles.title, styles.left1]}>
//               {portfolioData.invested.title}
//             </Text>
//             <Text style={[styles.value, styles.left1]}>
//               ₹{portfolioData.invested.value}
//             </Text>
//           </View>
//           <View style={[styles.rowPart, styles.right]}>
//             <Text style={[styles.title, styles.right1]}>
//               {portfolioData.currentValue.title}
//             </Text>
//             <Text style={[styles.value, styles.right1]}>
//               ₹{portfolioData.currentValue.value}
//             </Text>
//           </View>
//         </View>
//         <View style={styles.rowWithBorder}>
//           <Text style={[styles.title, styles.leftAligned]}>
//             {portfolioData.profitLoss.title}
//           </Text>
//           <View style={styles.rightAligned}>
//             <Text
//               style={[
//                 styles.value,
//                 styles.right1,
//                 isProfitPositive ? styles.greenText : styles.redText,
//               ]}
//             >
//               {isProfitPositive ? "+" : "-"}₹
//               {portfolioData.profitLoss.value.replace("+", "").replace("-", "")}
//             </Text>
//             {portfolioData.profitLoss.percentageChange && (
//               <Text
//                 style={[
//                   styles.percentageChange,
//                   styles.right1,
//                   isPercentageChangePositive
//                     ? styles.greenText
//                     : styles.redText,
//                 ]}
//               >
//                 {isPercentageChangePositive ? "+" : "-"}
//                 {portfolioData.profitLoss.percentageChange
//                   .replace("+", "")
//                   .replace("-", "")}
//               </Text>
//             )}
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#1A1A1A", // Dark background color
//     borderRadius: 8,
//     margin: 8,
//     padding: 15,
//     height: 150,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   rowWithBorder: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     borderTopColor: "#777", // Top border color
//     borderTopWidth: 1, // Top border width
//     borderBottomColor: "#777", // Bottom border color
//     paddingTop: 10,
//     marginBottom: 10,
//   },
//   left: {
//     justifyContent: "flex-start",
//   },
//   right: {
//     justifyContent: "flex-end",
//   },
//   right1: {
//     alignSelf: "flex-end",
//   },
//   left1: {
//     alignSelf: "flex-start",
//   },
//   rowPart: {
//     flex: 1,
//     flexDirection: "column",
//     justifyContent: "space-between",
//   },
//   title: {
//     color: "#777", // Grey color
//     fontSize: 16,
//     marginBottom: 10,
//     fontWeight: "bold",
//   },
//   value: {
//     fontSize: 16,
//     color: "white",
//   },
//   percentageChange: {
//     fontSize: 12,
//     color: "white",
//   },
//   redText: {
//     color: "red",
//   },
//   greenText: {
//     color: "green",
//   },
//   leftAligned: {
//     textAlign: "left",
//   },
//   rightAligned: {
//     textAlign: "right",
//   },
// });

// export default Portfolio;
// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { defaultStyle } from "../styles/style";

// const Portfolio = () => {
//   const stocksData = [
//     {
//       name: "Stock 1",
//       quantity: "100",
//       currentPrice: "110",
//       buyingPrice: "95",
//       profit: "1500",
//       totalValue: "15000",
//     },
//     {
//       name: "Stock 2",
//       quantity: "50",
//       currentPrice: "80",
//       buyingPrice: "70",
//       profit: "500",
//       totalValue: "4000",
//     },
//     // Add more stocks as needed
//   ];

//   const renderStockCards = () => {
//     return stocksData.map((stock, index) => (
//       <View key={index} style={[styles.card]}>
        // <View style={styles.row}>
        //   <Text style={[styles.title, styles.leftAligned]}>
        //     {stock.name}
        //   </Text>
        //   <Text style={[styles.value, styles.rightAligned]}>
        //     Quantity: {stock.quantity}
        //   </Text>
        // </View>
        // <View style={styles.rowWithBorder}>
        //   <View style={styles.column}>
        //     <Text style={[styles.title, styles.leftAligned]}>
        //       Current Market Price
        //     </Text>
        //     <Text style={[styles.value, styles.left1]}>
        //       ₹{stock.currentPrice}
        //     </Text>
        //   </View>
        //   <View style={styles.column}>
        //     <Text style={[styles.title, styles.rightAligned]}>
        //       Buying Price
        //     </Text>
        //     <Text style={[styles.value, styles.rightAligned]}>
        //       ₹{stock.buyingPrice}
        //     </Text>
        //   </View>
        // </View>
        // <View style={styles.rowWithBorder}>
        //   <View style={styles.column}>
        //     <Text style={[styles.title, styles.leftAligned]}>
        //       Profit
        //     </Text>
        //     <Text style={[styles.value, styles.left1, stock.profit >= 0 ? styles.greenText : styles.redText]}>
        //       ₹{stock.profit}
        //     </Text>
        //   </View>
        //   <View style={styles.column}>
        //     <Text style={[styles.title, styles.rightAligned]}>
        //       Total Value
        //     </Text>
        //     <Text style={[styles.value, styles.rightAligned]}>
        //       ₹{stock.totalValue}
        //     </Text>
        //   </View>
        // </View>
//       </View>
//     ));
//   };

//   return (
//     <View style={defaultStyle}>
//       {renderStockCards()}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
  // card: {
  //   backgroundColor: "#1A1A1A",
  //   borderRadius: 8,
  //   margin: 8,
  //   padding: 15,
  //   height: 250,
  // },
  // row: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   marginBottom: 20,
  // },
  // rowWithBorder: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   borderTopColor: "#777",
  //   borderTopWidth: 1,
  //   borderBottomColor: "#777",
  //   paddingTop: 10,
  //   marginBottom: 10,
  // },
  // leftAligned: {
  //   textAlign: "left",
  //   color: "#FFF",
  // },
  // rightAligned: {
  //   textAlign: "right",
  //   color: "#FFF",
  // },
  // column: {
  //   flex: 1,
  //   flexDirection: "column",
  // },
  // title: {
  //   fontSize: 16,
  //   marginBottom: 10,
  //   fontWeight: "bold",
  //   color: "#777",
  // },
  // value: {
  //   fontSize: 16,
  //   color: "white",
  // },
  // left1: {
  //   alignSelf: "flex-start",
  // },
  // redText: {
  //   color: "red",
  // },
  // greenText: {
  //   color: "green",
  // },
// });

// export default Portfolio;
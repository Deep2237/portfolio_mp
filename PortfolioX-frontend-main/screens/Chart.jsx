import React, { useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, View, Text, TouchableOpacity } from "react-native";
import { defaultStyle } from "../styles/style";

const Chart = ({ arr = [], time = [], chartConfig }) => {
  const screenWidth = Dimensions.get("window").width;
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Create an empty array of labels (no time labels)
  const labels = Array(arr.length).fill("");

  // Customize chart configuration for dark theme and green color

  const handleDataPointClick = ({ value, dataIndex }) => {
    // Handle click on the chart point
    // setSelectedPoint({ value, time: time[dataIndex] });
  };

  return (
    <View style={defaultStyle}>
      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: arr,
              pointRadius: 0, // Set pointRadius to 0 to hide data points
            },
          ],
        }}
        width={screenWidth}
        // withShadow={false}
        height={300} // Increased height
        chartConfig={chartConfig}
        withDots={false}
        withVerticalLines={false}
        withHorizontalLines={false}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        onDataPointClick={handleDataPointClick}
      />

      {/* {selectedPoint && (
        <View style={styles.tooltip}>
          <Text
            style={styles.tooltipText}
          >{`Price: ${selectedPoint.value}`}</Text>
          <Text style={styles.tooltipText}>{`Time: ${new Date(
            selectedPoint.time * 1000
          ).toLocaleTimeString()}`}</Text>
        </View>
      )} */}
    </View>
  );
};

const styles = {
  tooltip: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 0,
    borderRadius: 1,
    bottom: 20,
    right: 20,
    fontSize: 2,
  },
  tooltipText: {
    color: "white",
    fontSize: 2,
    marginBottom: 5,
  },
};

export default Chart;

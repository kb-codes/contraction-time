import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import { DataApi } from "../axios";

export default function MainScreen({ navigation }) {
  // states
  const [timeData, setTimeData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // when list get updated, pull down flatlist :
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    DataApi.getData()
      .then((res) => {
        setTimeData(res.data.data.data);
        setRefreshing(false);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [refreshing]);

  // get list data
  useEffect(() => {
    DataApi.getData()
      .then((res) => {
        setTimeData(res.data.data.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  // render items of list data
  const renderItem = ({ index, item }) => (
    <View
      style={{
        ...styles.itemWrapper,
        marginBottom: timeData.length == index + 1 ? 50 : 0,
      }}
    >
      <Text style={{ color: "black", fontSize: 14, alignSelf: "flex-start" }}>
        {item.time_format}
      </Text>
      <Text style={{ color: "#ff26cc", fontSize: 18 }}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <StatusBar backgroundColor="#fcfcfc" barStyle="dark-content" />
      <View style={styles.headerWrapper}>
        <TouchableOpacity style={styles.icon}>
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contraction Timer</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Modal");
          }}
          style={styles.icon}
        >
          <AntDesign name="plus" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* set loader when data is getting */}
      {timeData.length == 0 ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#ff26cc" />
        </View>
      ) : (
        <FlatList
          data={timeData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
  },
  headerWrapper: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  headerTitle: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  labelText: {
    fontSize: 15,
    color: "black",
    marginVertical: 5,
  },
  icon: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  itemWrapper: {
    marginHorizontal: 30,
    backgroundColor: "white",
    padding: 15,
    alignItems: "center",
    marginVertical: 10,
    elevation: 2,
    borderRadius: 10,
  },
});

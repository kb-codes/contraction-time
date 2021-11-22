import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
  ToastAndroid,
} from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import Slider from "@react-native-community/slider";

// for api and date convertions
import Moment from "moment";
import { DataApi } from "../axios";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ModalView({ navigation }) {
  // states
  const [visible, setVisible] = useState(true);
  const [value, setValue] = useState(1);
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [timeString, setTimeString] = useState("");
  const [duration, setDuration] = useState("");
  const [note, setNote] = useState("");

  // when user submit data
  const onSubmit = () => {
    if (duration != "") {
      Moment.locale("en");
      let dateString = Moment(date).format("YYYY-MM-DD");
      setTimeString(time.toLocaleTimeString());

      console.log(dateString);
      DataApi.addData(timeString, dateString, duration, note)
        .then(function (response) {
          if (response.data.status) {
            navigation.navigate("Main", {
              update: true,
            });
          }
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
          ToastAndroid.show("Try again", ToastAndroid.SHORT);
        });
    } else {
      alert("Duration required!");
    }
  };

  return (
    <Modal
      transparent={true}
      onRequestClose={() => {
        navigation.navigate("Main");
      }}
      animationType={"fade"}
      visible={visible}
    >
      <View style={styles.containerModel}>
        <View style={styles.modal}>
          <View style={{ alignItems: "center" }}>
            <AntDesign name="pluscircle" size={40} color="#ffd6f8" />
            <Text style={{ ...styles.headerTitle, marginTop: 5 }}>
              New Contraction
            </Text>

            <View style={styles.dateTimeWrapper}>
              <View style={{ marginHorizontal: 5 }}>
                <Text style={styles.labelText}>Time</Text>

                <TouchableOpacity
                  onPress={() => {
                    setShowTime(true);
                  }}
                  style={{
                    ...styles.formItemWrapper,
                    width: width / 2.5,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      marginRight: 10,
                      fontSize: 12,
                    }}
                  >
                    {time === null ? "Select Time" : time.toLocaleTimeString()}
                  </Text>
                  <AntDesign name="clockcircle" size={20} color="black" />
                </TouchableOpacity>
                {showTime && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(date)}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedTime) => {
                      const currentTime = selectedTime || time;
                      setShowTime(false);
                      setTime(currentTime);
                    }}
                  />
                )}
              </View>

              <View>
                <Text style={styles.labelText}>Date</Text>

                <TouchableOpacity
                  onPress={() => {
                    setShowDate(true);
                  }}
                  style={{
                    ...styles.formItemWrapper,
                    width: width / 2.5,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      marginRight: 10,
                      fontSize: 12,
                    }}
                  >
                    {date === null ? "Select Date" : date.toDateString()}
                  </Text>
                  <Ionicons name="calendar" size={20} color="black" />
                </TouchableOpacity>
                {showDate && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(date)}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedDate) => {
                      const currentDate = selectedDate || date;
                      setShowDate(false);
                      setDate(currentDate);
                    }}
                  />
                )}
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={styles.labelText}>Duration (Seconds)</Text>

            <View style={styles.formItemWrapper}>
              <TextInput
                placeholder="Enter Duration"
                keyboardType="numeric"
                value={duration}
                onChangeText={(value) => {
                  setDuration(value);
                }}
                placeholderTextColor="#9e9e9e"
                style={{
                  color: "black",
                  marginRight: 10,
                  fontSize: 12,
                  width: width / 1.5,
                }}
              />
            </View>
          </View>

          <View style={{ marginVertical: 5 }}>
            <Text style={styles.labelText}>Contraction Intensity</Text>
            <Text
              style={{
                ...styles.labelText,
                color: "#ff26cc",
                alignSelf: "center",
              }}
            >
              {Math.round(value)}
            </Text>

            <Slider
              style={{ width: width - 80, height: 20 }}
              minimumValue={0}
              maximumValue={10}
              minimumTrackTintColor="#ff26cc"
              maximumTrackTintColor="#000000"
              thumbTintColor="#ff26cc"
              onValueChange={(value) => setValue(value)}
            />
          </View>

          <View style={{ marginHorizontal: 5 }}>
            <Text style={styles.labelText}>Note (Optional)</Text>

            <View style={styles.formItemWrapper}>
              <TextInput
                placeholder="Write here"
                value={note}
                onChangeText={(value) => {
                  setNote(value);
                }}
                placeholderTextColor="#9e9e9e"
                multiline
                style={{
                  color: "black",
                  marginRight: 10,
                  fontSize: 12,
                  width: width / 2,
                  height: 100,
                  textAlignVertical: "top",
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              bottom: 30,
              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Main");
              }}
              style={styles.btnWrapper}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#ff26cc",
                  fontWeight: "bold",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onSubmit();
              }}
              style={{ ...styles.btnWrapper, backgroundColor: "#ff26cc" }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  modal: {
    width: width - 30,
    padding: 25,
    backgroundColor: "white",
    height: height - 50,
    borderRadius: 10,
  },
  containerModel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dateTimeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  formItemWrapper: {
    backgroundColor: "#f5f2f2",
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
  },
  btnWrapper: {
    borderRadius: 20,
    borderColor: "#ff26cc",
    borderWidth: 1,
    backgroundColor: "white",
    paddingVertical: 10,
    width: width / 3,
    alignItems: "center",
    marginHorizontal: 5,
  },
});

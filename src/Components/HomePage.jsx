import {
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";

const HomePage = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View className="w-screen h-screen flex" >
        <Image
          source={require("../../assets/Images/Home-page-background.png")}
        />
        <View className="mx-4">
          <Text className="text-5xl font-bold">Fashion is At Your Feet</Text>
          <Text className="mt-4 text-2xl text-gray-400">
            Unleash your heel here...
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Main")}
            className="mt-14 bg-blue-300 p-5 pl-28 rounded-3xl"
          >
            <Text className="text-white text-xl ">Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

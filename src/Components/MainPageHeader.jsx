import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Icons2 from "react-native-vector-icons/Entypo";
import Icons from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import useApiStore from "../Zustand/store";

const MainPageHeader = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");

 

  return (
    <View>
      <View className="mt-6 flex flex-row ">
        <View className=" flex flex-row bg-white p-4 rounded-3xl align-middle justify-center">
          <Icons2 name="magnifying-glass" size={24} color={808080} />
          <TextInput
            className="pl-5"
            placeholder="Search for your shoes..."
            width={150}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            onSubmitEditing={() =>
              navigation.navigate("Search", { searchTerm })
            }
          />
        </View>
        <View className="mt-1 ml-2 flex flex-row align-middle justify-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("Like")}
          >
            <View className="bg-white rounded-3xl p-4">
              <Icons name="heart-o" size={24} color={808080} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate("Cart")}>
            <View className="ml-2 bg-white rounded-3xl p-4">
              <Icons name="shopping-cart" size={24} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MainPageHeader;

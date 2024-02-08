import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import Icons2 from "react-native-vector-icons/Entypo";
import Icons from "react-native-vector-icons/FontAwesome";

const MainPageHeader = () => {
  return (
    <View>
      <View className="mt-4 flex flex-row ">
        <View className=" flex flex-row bg-white p-4 rounded-3xl align-middle justify-center">
          <Icons2 name="magnifying-glass" size={24} color={808080} />
          <TextInput
            className="pl-5"
            placeholder="Looking for shoes..."
            width={150}
          />
        </View>
        <View className="mt-1 ml-2 flex flex-row align-middle justify-center">
          <TouchableOpacity>
            <View className="bg-white rounded-3xl p-4">
              <Icons name="heart-o" size={24} color={808080} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
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

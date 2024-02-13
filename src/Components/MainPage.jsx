import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import MainPageHeader from "./MainPageHeader";
import MainPageContent from "./MainPageContent";
import NewArrivals from "./NewArrivals";

const MainPage = () => {
  return (
    <SafeAreaView className='bg-slate-100 h-full w-full'>
      <ScrollView>
        <View className='mx-5'>
            <MainPageHeader />
            <MainPageContent />
            <NewArrivals />
        </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default MainPage;

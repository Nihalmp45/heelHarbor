import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import MainPageHeader from "./MainPageHeader";
import MainPageContent from "./MainPageContent";

const MainPage = () => {
  return (
    <SafeAreaView className='bg-slate-200 h-full w-full'>
      <ScrollView>
        <View className='mx-5'>
            <MainPageHeader />
            <MainPageContent />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainPage;

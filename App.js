import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./src/Components/HomePage";
import MainPage from "./src/Components/MainPage";
import ProductDetailPage from "./src/Components/ProductDetailPage";
import SeeAllPage from "./src/Components/SeeAllPage";
import SearchPage from "./src/Components/SearchPage";
import LikedPage from "./src/Components/LikedPage";

const Stack = createNativeStackNavigator();

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Details" component={ProductDetailPage} />
        <Stack.Screen name="Main" component={MainPage} />
        <Stack.Screen name="See" component={SeeAllPage} />
        <Stack.Screen name="Search" component={SearchPage} />
        <Stack.Screen name='Like' component={LikedPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

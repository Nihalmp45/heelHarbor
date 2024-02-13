import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./src/Components/HomePage";
import MainPage from "./src/Components/MainPage";
import ProductDetailPage from "./src/Components/ProductDetailPage";

const Stack = createNativeStackNavigator();

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Details" component={ProductDetailPage} />
        <Stack.Screen name="Main" component={MainPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

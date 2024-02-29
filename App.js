import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./src/Components/HomePage";
import MainPage from "./src/Components/MainPage";
import ProductDetailPage from "./src/Components/ProductDetailPage";
import SeeAllPage from "./src/Components/SeeAllPage";
import SearchPage from "./src/Components/SearchPage";
import LikedPage from "./src/Components/LikedPage";
import CartPage from "./src/Components/CartPage";
import DeliverProducts from "./src/Components/DeliverProducts";
import AdidasPage from "./src/Components/AdidasPage";
import CrocsPage from "./src/Components/CrocsPage";
import NikePage from "./src/Components/NikePage";
import NewbalancePage from "./src/Components/NewbalancePage";

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
        <Stack.Screen name='Cart' component={CartPage} />
        <Stack.Screen name='Deliver' component={DeliverProducts} />
        <Stack.Screen name='Adidas' component={AdidasPage} />
        <Stack.Screen name='Crocs' component={CrocsPage} />
        <Stack.Screen name='Nike' component={NikePage} />
        <Stack.Screen name='NewBalance' component={NewbalancePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

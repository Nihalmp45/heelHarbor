import { Text, View, FlatList, TouchableOpacity, Image,StyleSheet } from "react-native";
import React, { useState } from "react";
import useApiStore from "../Zustand/store";
import Icons from "react-native-vector-icons/AntDesign";
import Icons2 from "react-native-vector-icons/AntDesign";
import Icons3 from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const CartPage = () => {
  const { cartProducts, setCartProducts } = useApiStore();
  const [updatedCartProducts, setUpdatedCartProducts] = useState(cartProducts);
  const navigation = useNavigation();

  console.log("cartProducts:", cartProducts);

  const extractBrandAndModel = (title) => {
    const parts = title.split(/\s|-/);
    if (parts.length > 1) {
      return `${parts[0]} ${parts[1]}`; // Concatenate the first two words
    }
    return title;
  };

  const deleteCartItem = (productId) => {
    // Filter out the item with the specified productId
    const updatedLikedProducts = cartProducts.filter(
      (item) => item.id !== productId
    );
    // Update the state with the filtered likedProducts array
    setUpdatedCartProducts(updatedLikedProducts);
  };

  const incrementQuantity = (productId) => {
    const updatedProducts = updatedCartProducts.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: (item.quantity || 0) + 1 };
      }
      return item;
    });
    setUpdatedCartProducts(updatedProducts);
  };

  const decrementQuantity = (productId) => {
    const updatedProducts = updatedCartProducts.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setUpdatedCartProducts(updatedProducts);
  };

  const isCartEmpty = updatedCartProducts.length === 0;

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        Shopping Cart
      </Text>
      <FlatList
        data={updatedCartProducts}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ fontSize: 20 }}>The Cart is Empty...</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Details", { productId: item.id })
            }
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "white",
                borderRadius: 8,
                padding: 10,
                marginVertical: 5,
              }}
            >
              <View style={{ marginRight: 10 }}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 100, height: 110, borderRadius: 8 }}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", marginTop: 5 }}
                >
                  {extractBrandAndModel(item.title)}
                </Text>
                <Text style={{ fontSize: 14, color: "#888", marginTop: 5 }}>
                  {item.prize}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  <TouchableOpacity onPress={() => decrementQuantity(item.id)}>
                    <Icons2 name="minuscircleo" size={25} color="#060606" />
                  </TouchableOpacity>
                  <Text style={{ marginHorizontal: 5, fontSize: 18 }}>
                    {item.quantity || 0}
                  </Text>
                  <TouchableOpacity onPress={() => incrementQuantity(item.id)}>
                    <Icons3 name="pluscircle" size={25} color="#6caee0" />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => deleteCartItem(item.id)}>
                <Icons
                  name="delete"
                  size={30}
                  color="#060606"
                  style={{ marginTop: 10 }}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Deliver")}
        style={[styles.button, isCartEmpty && styles.disabledButton]}
        disabled={isCartEmpty}
      >
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 14,
    backgroundColor: "#3b82f6", // Blue color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    paddingLeft:100
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default CartPage;


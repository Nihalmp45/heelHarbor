import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import useApiStore from "../Zustand/store";
import { useNavigation } from "@react-navigation/native";
import Icons from "react-native-vector-icons/FontAwesome";

const LikedPage = () => {
  const { likedProducts, setLikedProducts } = useApiStore();
  const navigation = useNavigation();

  const navigateToDetails = (productId) => {
    navigation.navigate("Details", { productId: productId });
  };

  const deleteFavorite = (productId) => {
    // Filter out the item with the specified productId
    const updatedLikedProducts = likedProducts.filter(
      (item) => item.id !== productId
    );
    // Update the state with the filtered likedProducts array
    setLikedProducts(updatedLikedProducts);
  };

  // Function to extract the first two words from the title
  const extractBrandAndModel = (title) => {
    const parts = title.split(/\s|-/);
    if (parts.length > 1) {
      return `${parts[0]} ${parts[1]}`; // Concatenate the first two words
    }
    return title;
  };

  return (
      <View style={{ flex: 1, padding: 10 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
            marginTop: 20,
          }}
        >
          Liked Products
        </Text>
        <FlatList
          data={likedProducts}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={{ fontSize: 20 }}>There are no liked products.</Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToDetails(item.id)}>
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
                    style={{ width: 100, height: 100, borderRadius: 8 }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                <Text className="text-md" style={{ color: "#5B9EE1", marginTop: 12 }}>
                  BEST SELLER
                </Text>
                  <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 5 }}>
                    {extractBrandAndModel(item.title)}
                  </Text>
                  <Text
                    style={{ fontSize: 14, color: "#888", marginTop: 5 }}
                  >
                    {item.prize}
                  </Text>
                  <Icons
                    onPress={() => deleteFavorite(item.id)}
                    name="heart"
                    size={30}
                    color="#FF0000"
                    style={{ position: "absolute", top: 10, right: 10 }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
  );
};

export default LikedPage;


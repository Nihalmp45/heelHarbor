import React, { useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import useApiStore from "../Zustand/store";
import { useNavigation } from "@react-navigation/native";
import Icons from "react-native-vector-icons/FontAwesome";

const MainPageContent = () => {
  const navigation = useNavigation();
  const {
    popularShoes,
    loading,
    error,
    setLoading,
    setError,
    setPopularShoes,
    likedProducts,
    setLikedProducts,
  } = useApiStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://real-time-product-search.p.rapidapi.com/search?q=shoes",
          {
            headers: {
              "X-RapidAPI-Key":
                "06832540c9msh0dcb7cb770bcbf6p1cc6b7jsn22fae4472ec8",
              "X-RapidAPI-Host": "real-time-product-search.p.rapidapi.com",
            },
          }
        );
        const data = await response.json();
        setPopularShoes(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator className="mt-5" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const extractBrandAndModel = (title) => {
    const parts = title.split(/\s|-/);
    if (parts.length > 1) {
      return parts.slice(0, 2).join(" ");
    }
    return title;
  };

  const toggleLike = (product) => {
    product.quantity = 1;

    setLikedProducts((prevCart) => ({
      ...prevCart,
      [product.id]: product,
    }));
  };

  return (
    <>
      <View className="mt-6 flex flex-1 justify-between flex-row">
        <Text className="text-xl font-bold">Popular Shoes</Text>
        <Text
          style={{ color: "#5B9EE1" }}
          onPress={() => navigation.navigate("See")}
        >
          See All
        </Text>
      </View>
      <View className="mt-6 ">
        <FlatList
          horizontal
          data={popularShoes?.data || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="bg-white rounded-lg flex flex-row mx-2 ">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Details", { productId: item.product_id })
                }
              >
                <View>
                  <TouchableOpacity onPress={() => toggleLike(item)}>
                    <View className="bg-white rounded-3xl p-4 flex align-bottom">
                      <Icons
                        name={
                          likedProducts[item.product_id] ? "heart" : "heart-o"
                        }
                        size={20}
                        color={
                          likedProducts[item.product_id] ? "red" : "#808080"
                        }
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View className="flex align-middle justify-center mx-3 mb-3 w-12 rounded-lg">
                  <Image
                    source={{ uri: item.product_photos[0] }}
                    style={{ width: 100, height: 130 }}
                  />
                </View>
                <Text className="mx-4 text-md" style={{ color: "#5B9EE1" }}>
                  BEST SELLER
                </Text>
                <Text className="mx-4 text-xl font-bold mt-2" numberOfLines={1}>
                  {extractBrandAndModel(item.product_title)}
                </Text>
                {item.typical_price_range && item.typical_price_range[0] && (
                  <Text className="italic mx-4 my-4 text-lg font-bold mt-2">
                    {item.typical_price_range[0]}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </>
  );
};

export default MainPageContent;

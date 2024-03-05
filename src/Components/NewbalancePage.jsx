import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import useApiStore from "../Zustand/store";
import { useNavigation } from "@react-navigation/native";
import Icons from "react-native-vector-icons/FontAwesome";

const NewbalancePage = () => {
  const navigation = useNavigation();
  const { newArrivals, loading, error, setNewArrivals, setLoading, setError, likedProducts, setLikedProducts } =
    useApiStore();
  const [isMounted, setIsMounted] = useState(true); // Ensure component is mounted


  const fetchNewArrivalsData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://real-time-product-search.p.rapidapi.com/search?q=newbalance&page=5",
        {
          method: "GET",
          headers: {
            'X-RapidAPI-Key': '34861748c4mshf3ebacfa17fc61fp145faajsna8ee6f68fbb2',
            'X-RapidAPI-Host': 'real-time-product-search.p.rapidapi.com'
          },
        }
      );

      const data = await response.json();
      if (isMounted) {
        setNewArrivals(data);
      }
    } catch (error) {
      if (isMounted) {
        setError(error.message);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchNewArrivalsData(); // Fetch data when component mounts
    return () => {
      // Cleanup function to set isMounted to false when component unmounts
      setIsMounted(false);
    };
  }, []); // Empty dependency array ensures useEffect runs only once when component mounts

  if (loading) {
    return <ActivityIndicator className="mt-5" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const extractBrandAndModel = (title) => {
    // Split title by space or hyphen
    const parts = title.split(/\s|-/);
    if (parts.length > 1) {
      // If there are multiple parts, return the first two joined
      return parts.slice(0, 2).join(" ");
    }
    // Otherwise, return the entire title
    return title;
  };

  const addToFavorite = (productId) => {
    const copyFavorites = [...likedProducts];
    const index = copyFavorites.findIndex((item) => item.id === productId);

    if (index === -1) {
      const getCurrentProduct = newArrivals?.data?.find(
        (item) => item.product_id === productId
      );
      if (getCurrentProduct) {
        copyFavorites.push({
          id: getCurrentProduct.product_id,
          title: getCurrentProduct?.product_title,
          prize: getCurrentProduct?.typical_price_range[0],
          image: getCurrentProduct?.product_photos[0]
        });
      }
    } else {
      // If the item is already in likedProducts, remove it
      copyFavorites.splice(index, 1);
    }

    // Update likedProducts after all modifications are done
    setLikedProducts(copyFavorites);

  };

  return (
    <ScrollView>
    <SafeAreaView>
      <View className="mt-6 flex flex-1 justify-between flex-row">
      </View>
      <View className="mt-6 ">
        {newArrivals?.data &&
          newArrivals.data.map((item, index) => (
            <View
              key={index}
              className="bg-white rounded-lg flex flex-row my-2 items-center justify-around"
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Details", { productId: item.product_id })
                }
              >
                <View className="flex flex-row ">
                  <View>
                    <Text
                      className="mx-4 text-md mt-4"
                      style={{ color: "#5B9EE1" }}
                    >
                      NEW CHOICES
                    </Text>
                    <Text
                      className="mx-4 text-xl font-bold mt-2"
                      numberOfLines={1}
                    >
                      {extractBrandAndModel(item.product_title)}
                    </Text>
                    {item.typical_price_range &&
                      item.typical_price_range[0] && (
                        <Text className="italic mx-4 my-4 text-lg font-bold mt-2">
                          {item.typical_price_range[0]}
                        </Text>
                      )}
                  </View>
                  <View className="flex align-middle justify-center mx-3 my-3 w-12 rounded-lg">
                    <Image
                      source={{ uri: item.product_photos[0] }}
                      style={{ width: 100, height: 100 }}
                    />
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => addToFavorite(item.product_id)}>
                      <View className="bg-white rounded-3xl p-4 flex align-bottom">
                        {likedProducts.some(
                          (product) => product.id === item.product_id
                        ) ? (
                          <Icons name="heart" size={20} color="#FF0000" />
                        ) : (
                          <Icons name="heart-o" size={20} color="black" />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};

export default NewbalancePage;
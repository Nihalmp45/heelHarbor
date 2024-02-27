import {
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import useApiStore from "../Zustand/store";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const SearchPage = ({ route }) => {
  const { searchTerm } = route.params;

  const navigation = useNavigation();
  const {
    searchProducts,
    loading,
    error,
    setSearchProducts,
    setLoading,
    setError,
  } = useApiStore();
  const [isMounted, setIsMounted] = useState(true); // Ensure component is mounted

  const fetchSearchPageData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://real-time-product-search.p.rapidapi.com/search",
        {
          headers: {
            'X-RapidAPI-Key': '06832540c9msh0dcb7cb770bcbf6p1cc6b7jsn22fae4472ec8',
            'X-RapidAPI-Host': 'real-time-product-search.p.rapidapi.com'
          },
          params: {
            q: searchTerm,
          },
        }
      );

      const data = await response.data;
      if (isMounted) {
        setSearchProducts(data);
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
    fetchSearchPageData(); // Fetch data when component mounts
    return () => {
      // Cleanup function to set isMounted to false when component unmounts
      setIsMounted(false);
    };
  }, []); // Empty dependency array ensures useEffect runs only once when component mounts

  if (loading) {
    return <ActivityIndicator className="mt-24" />;
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

  return (
    <ScrollView className="mx-4">
      <View className="mt-10">
        <Text className="text-xl font-bold">All Products</Text>
      </View>
      <View className="mt-2 ">
        {searchProducts?.data &&
          searchProducts.data.map((item, index) => (
            <View
              key={index}
              className="bg-white rounded-lg flex flex-row my-2"
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Details", { productId: item.product_id })
                }
              >
                <View className="flex flex-row">
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
                </View>
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

export default SearchPage;

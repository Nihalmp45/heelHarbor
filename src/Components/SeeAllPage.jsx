import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import useApiStore from "../Zustand/store";
import { useNavigation } from "@react-navigation/native";

const NewArrivals = () => {
  const navigation = useNavigation();
  const { seeAll, loading, error, setSeeAll, setLoading, setError } =
    useApiStore();
  const [isMounted, setIsMounted] = useState(true); // Ensure component is mounted

  const fetchNewArrivalsData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://real-time-product-search.p.rapidapi.com/search?q=shoes&page=5",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "4c6fe536b5mshc3ff65ebf0c23b9p1faa7djsn653e0d21fb96",
            "X-RapidAPI-Host": "real-time-product-search.p.rapidapi.com",
          },
        }
      );

      const data = await response.json();
      if (isMounted) {
        setSeeAll(data);
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
        {seeAll?.data &&
          seeAll.data.map((item, index) => (
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

export default NewArrivals;

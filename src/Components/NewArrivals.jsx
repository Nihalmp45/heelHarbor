import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import useApiStore from "../Zustand/store";

const NewArrivals = () => {
  const { newArrivals, loading, error, setNewArrivals, setLoading, setError } =
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
              "fa12f0226bmshc08e210014aeac0p190b80jsn0d9b43a24e5f",
            "X-RapidAPI-Host": "real-time-product-search.p.rapidapi.com",
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

  return (
    <SafeAreaView>
      <View className="mt-6 flex flex-1 justify-between flex-row">
        <Text className="text-xl font-bold">New Arrivals</Text>
        <Text style={{ color: "#5B9EE1" }}>See All</Text>
      </View>
      <View className="mt-6 ">
        {newArrivals?.data &&
          newArrivals.data.map((item, index) => (
            <View
              key={index}
              className="bg-white rounded-lg flex flex-row my-2"
            >
              <TouchableOpacity>
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
    </SafeAreaView>
  );
};

export default NewArrivals;

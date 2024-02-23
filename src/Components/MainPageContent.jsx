import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import useApiStore from "../Zustand/store";
import { useNavigation } from "@react-navigation/native";

const MainPageContent = () => {
  const navigation = useNavigation();
  const {
    popularShoes,
    loading,
    error,
    setLoading,
    setError,
    setPopularShoes,
  } = useApiStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://real-time-product-search.p.rapidapi.com/search?q=shoes",
          {
            headers: {
              'X-RapidAPI-Key': '4c6fe536b5mshc3ff65ebf0c23b9p1faa7djsn653e0d21fb96',
              'X-RapidAPI-Host': 'real-time-product-search.p.rapidapi.com'
            },
          }
        );

        const data = await response.json(); // Await the response.json() call

        setPopularShoes(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  console.log(popularShoes);

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
    <>
      <View className="mt-6 flex flex-1 justify-between flex-row">
        <Text className="text-xl font-bold">Popular Shoes</Text>
        <Text style={{ color: "#5B9EE1" }} onPress={()=>navigation.navigate('See')}>See All</Text>
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
                <View className="flex align-middle justify-center mx-3 my-3 w-12 rounded-lg">
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

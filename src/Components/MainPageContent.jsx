import React, { useEffect, useContext, useState } from "react";
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
              'X-RapidAPI-Key': 'dd166fe5c3msha314b784f7de628p1185dajsn0e073a4419d5',
              'X-RapidAPI-Host': 'real-time-product-search.p.rapidapi.com'
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

  const addToFavorite = (productId) => {
    const copyFavorites = [...likedProducts];
    const index = copyFavorites.findIndex((item) => item.id === productId);

    if (index === -1) {
      const getCurrentProduct = popularShoes?.data?.find(
        (item) => item.product_id === productId
      );
      if (getCurrentProduct) {
        copyFavorites.push({
          id: getCurrentProduct.product_id,
          title: getCurrentProduct?.product_title,
          prize: getCurrentProduct?.typical_price_range[0],
          image: getCurrentProduct?.product_photos[0],
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
    <>
      <View className="flex flex-row justify-between items-center my-5 ">
        <TouchableOpacity onPress={()=>navigation.navigate('Crocs')}>
          <Image
            source={require("../../assets/Images/crocs.png")}
            style={{ width: 65, height: 70 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Adidas')}>
          <Image
            source={require("../../assets/Images/adidas.png")}
            style={{ width: 70, height: 50 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Nike')}>
          <Image
            source={require("../../assets/Images/nike.png")}
            style={{ width: 65, height: 50 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('NewBalance')}>
          <Image
            source={require("../../assets/Images/newbalance.png")}
            style={{ width: 65, height: 50 }}
          />
        </TouchableOpacity>
      </View>
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
          data={popularShoes?.data || []} // Provide default value of an empty array
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="bg-white rounded-lg flex flex-row mx-2 ">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Details", { productId: item.product_id })
                }
              >
                <View>
                  <TouchableOpacity
                    onPress={() => addToFavorite(item.product_id)}
                  >
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

import axios from "axios";
import { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icons from "react-native-vector-icons/FontAwesome";
import useApiStore from "../Zustand/store";
import { useNavigation } from "@react-navigation/native";

const ProductDetailsPage = ({ route }) => {
  const { productId } = route.params;
  const [productDetails, setProductDetails] = useState(null);
  const { cartProducts, setCartProducts } = useApiStore();
  const navigation = useNavigation();

  const addToCart = (productId) => {
    const copyCartProducts = [...cartProducts];
    const existingProductIndex = copyCartProducts.findIndex(
      (item) => item.id === productId
    );

    // If the product is not in the cart, add it
    if (existingProductIndex === -1) {
      // Here, directly use properties of productDetails
      copyCartProducts.push({
        id: productId,
        title: productDetails.product_title,
        prize: productDetails.typical_price_range[0],
        image: productDetails.product_photos[0],
      });
      setCartProducts(copyCartProducts);
    } else {
      console.log("Product already exists in cart");
    }
    setCartProducts(copyCartProducts);
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        "https://real-time-product-search.p.rapidapi.com/product-details",
        {
          headers: {
            "X-RapidAPI-Key":
              "34861748c4mshf3ebacfa17fc61fp145faajsna8ee6f68fbb2",
            "X-RapidAPI-Host": "real-time-product-search.p.rapidapi.com",
          },
          params: {
            product_id: productId,
          },
        }
      );

      setProductDetails(response.data.data.product);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  if (!productDetails) {
    return <ActivityIndicator className="mt-24" />;
  }

  return (
    <ScrollView>
      <View>
        <View className="mx-5 my-10">
          <TouchableOpacity
            className="flex justify-end items-end"
            onPress={() => navigation.navigate("Cart")}
          >
            <View className=" bg-white rounded-3xl p-4">
              <Icons name="shopping-cart" size={24} />
            </View>
          </TouchableOpacity>
          <Image
            source={{ uri: productDetails?.product_photos?.[0] || "" }}
            className="w-full h-64 mt-4 rounded-2xl"
          />
          <Text className="text-black font-bold mt-6 text-2xl">
            {productDetails?.product_title}
          </Text>
          <Text className="text-black font-bold mt-3 text-2xl">
            {productDetails?.typical_price_range?.[0]}
          </Text>
          <Text className="text-gray-400 font-normal text-md mt-6">
            {productDetails?.product_description}
          </Text>
          <Text className="text-black font-bold mt-4 text-xl">Size</Text>
          <View className="items-start">
            <TouchableOpacity className=" bg-blue-400 p-5 rounded-3xl mt-2">
              <Text className="text-white">
                {productDetails?.product_attributes?.Size}
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-gray-400 font-bold mt-4 text-xl">Price</Text>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-black font-bold text-3xl">
              {productDetails?.typical_price_range?.[0]}
            </Text>
            <TouchableOpacity
              className=" bg-blue-400 p-5 rounded-3xl"
              onPress={() => addToCart(productDetails?.product_id)}
            >
              <Text className="text-white text-xl ">Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetailsPage;

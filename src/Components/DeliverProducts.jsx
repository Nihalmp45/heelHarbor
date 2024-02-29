import React from "react";
import { Text, View, StyleSheet,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DeliveryPage = () => {
  const navigation = useNavigation();


 
    // Generate a random number of delivery days between 1 and 7
    const days = Math.floor(Math.random() * 7) + 1;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thank You!</Text>
      <Text style={styles.message}>
        Your order will be delivered in approximately {days} days.
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Main")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeliveryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    marginTop: 14,
    backgroundColor: '#3b82f6', // Blue color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});



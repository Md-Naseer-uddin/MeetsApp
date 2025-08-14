import React from "react";
import { View, Text, TouchableOpacity, StyleSheet,Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

 function HomeScreen({ navigation }) {
  return (
      <View style={styles.container}>
        <Image style={styles.topImage} source={require('./images/cgc.png')}/>
      {/* App Title */}
      <Text style={styles.title}>Meeting Place</Text>
      <Text style={styles.subtitle}>
        Connect Institutions & Experts for Knowledge Sharing
      </Text>

      {/* Spacer */}
      <View style={{ height: 40 }} />

      {/* Admin Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4CAF50" }]}
        onPress={() => navigation.navigate("adminRegister", { role: "admin" })}
      >
        <Icon name="school" size={24} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.buttonText}>Register as Admin</Text>
      </TouchableOpacity>

      {/* SME Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#2196F3" }]}
        onPress={() => navigation.navigate("smeRegister", { role: "sme" })}
      >
        <Icon name="account-tie" size={24} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.buttonText}>Register as Subject Matter Expert</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center"
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
    justifyContent: "center",
    elevation: 2
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600"
  },
  topImage: {
    width:400,
    height:200,
    marginBottom: 20,
    borderRadius: 75,
    backgroundColor: "#white"
  },
});


export default HomeScreen

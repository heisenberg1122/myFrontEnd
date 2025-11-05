import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Homepage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App</Text>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Register"
            onPress={() => navigation.navigate("Register")}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="View All Users"
            onPress={() => navigation.navigate("UserList")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    width: "80%",
  },
  button: {
    marginBottom: 15,
  },
});

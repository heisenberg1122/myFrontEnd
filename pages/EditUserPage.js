import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

export default function EditUserPage({ route, navigation }) {
  const { user } = route.params;

  const [first_name, setFirstName] = useState(user.first_name);
  const [last_name, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender);
  const [password, setPassword] = useState(user.password);

  const handleUpdate = () => {
    axios
      .put(`http://192.168.30.115:8000/registration/api/users/${user.id}/`, {
        first_name,
        last_name,
        email,
        gender,
        password,
      })
      .then(() => {
        Alert.alert("Success", "User updated successfully");
        navigation.goBack();
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "Failed to update user");
      });
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Edit User
      </Text>

      <Text>First Name:</Text>
      <TextInput
        value={first_name}
        onChangeText={setFirstName}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 }}
      />

      <Text>Last Name:</Text>
      <TextInput
        value={last_name}
        onChangeText={setLastName}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 }}
      />

      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 }}
      />

      <Text>Gender:</Text>
      <TextInput
        value={gender}
        onChangeText={setGender}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 }}
      />

      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 }}
      />

      <Button title="Save Changes" onPress={handleUpdate} />
    </View>
  );
}

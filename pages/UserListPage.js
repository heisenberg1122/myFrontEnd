import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, Alert} from 'react-native';
import axios from 'axios';

export default function UserListPage({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://192.168.30.115:8000/registration/api/users/')
      .then(response => {
        setUsers(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2b17a5" />
        <Text>Loading users...</Text>
      </View>
    );
  }

  if (error) {
    // Show a friendly error message; avoid rendering raw error objects as text nodes
    const message = error?.response?.status
      ? `Server error: ${error.response.status}`
      : 'Failed to load users.';

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Text style={{ color: '#b00020', marginBottom: 8 }}>{message}</Text>
        <Button title="Retry" onPress={() => {
          setLoading(true);
          setError(null);
          // refetch
          axios.get('http://192.168.30.115:8000/registration/api/users/')
            .then(res => { setUsers(Array.isArray(res.data) ? res.data : []); setLoading(false); })
            .catch(err => { console.error(err); setError(err); setLoading(false); });
        }} />
      </View>
    );
  }

   const handleDelete = (id) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this user?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        axios
                            .delete(`http://192.168.30.115:8000/registration/api/users/${id}/`)
                            .then(() => {
                                Alert.alert("Success", "User deleted successfully");
                            })
                            .catch((err) => {
                                console.error(err);
                                Alert.alert("Error", "Failed to delete user");
                            });
                    },
                },
            ]
        );
    };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        View all Users
      </Text>

      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              marginBottom: 10,
              backgroundColor: '#f2f2f2',
              borderRadius: 8,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>
              {item.last_name} {item.first_name}
            </Text>
            <Text>Email: {item.email}</Text>
            <Text>Gender: {item.gender}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8,
              }}
            >
              <Button title="Edit" color="#49a43e" />
              <Button title="Delete" color="#f14545" 
              onPress={() => handleDelete(item.id)}/>
            </View>
          </View>
        )}
      />
    </View>
  );
}
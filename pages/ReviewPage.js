import { View, Text, Button } from 'react-native';
import axios from 'axios';
import styles from "../style";

export default function ReviewPage({ route, navigation }) {

    const { formData } = route.params;

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://192.168.30.115:8000/registration/api/register/', formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View> 
            <Text style={styles.title}>Review Page</Text>
            <Text style={styles.label}>First Name: {formData.first_name}</Text>
            <Text style={styles.label}>Last Name: {formData.last_name}</Text>
            <Text style={styles.label}>Gender: {formData.gender}</Text>
            <Text style={styles.label}>Email: {formData.email}</Text>
            <Text style={styles.label}>Password: {formData.password}</Text>
            <View> <Button title="Go back to Edit" onPress={() => navigation.navigate('Register')}/> </View>
            <View> <Button title="Submit" onPress={handleSubmit} /></View>
        </View>
    );
}
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const Pandit = () => {
  const [formData, setFormData] = useState({
    name: '',
    puja: '',
    phone: '',
    city: '',
    address: '',
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.puja || !formData.phone || !formData.city || !formData.address) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const response = await axios.post('https://socket.hindwana.com/api/getcontact', {formData: formData});
      Alert.alert('Success', 'Pandit booked successfully!');
      console.log(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to book Pandit');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image Section */}
      <Image 
        source={{ uri: 'https://4.imimg.com/data4/PK/NB/GLADMIN-24131595/wp-content-uploads-2015-08-pandit1-350x288-500x500.jpg' }}
        style={styles.image}
      />

      {/* Form Section */}
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
        />

        <Text style={styles.label}>Puja</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.puja}
            onValueChange={(value) => handleChange('puja', value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Puja" value="" />
            <Picker.Item label="Marriage" value="Marriage" />
            <Picker.Item label="Satyanarayan Puja" value="Satyanarayan Puja" />
            <Picker.Item label="Other..." value="Other" />
          </Picker>
        </View>

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          maxLength={10}
          value={formData.phone}
          onChangeText={(text) => handleChange('phone', text)}
        />

        <Text style={styles.label}>City</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.city}
            onValueChange={(value) => handleChange('city', value)}
            style={styles.picker}
          >
            <Picker.Item label="Select City" value="" />
            <Picker.Item label="Ranchi" value="Ranchi" />
            <Picker.Item label="Patna" value="Patna" />
            <Picker.Item label="Delhi" value="Delhi" />
          </Picker>
        </View>

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter your address"
          multiline
          numberOfLines={3}
          value={formData.address}
          onChangeText={(text) => handleChange('address', text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Book Pandit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  form: {
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    height: 45,
    width: '100%',
  },
  textArea: {
    height: 80,
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Pandit;

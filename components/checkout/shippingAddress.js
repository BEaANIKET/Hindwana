import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ShippingAddress = ({
  shippingInfo,
  setShippingInfo,
  fillCurrentLocation,
  currentLocation,
  showErrors = false
}) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (showErrors) validateFields();
  }, [shippingInfo, showErrors]);

  const validateFields = () => {
    const newErrors = {};
    if (!shippingInfo.email?.trim()) newErrors.email = 'Email is required';
    if (!shippingInfo.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!shippingInfo.address?.trim()) newErrors.address = 'Address is required';
    if (!shippingInfo.city?.trim()) newErrors.city = 'City is required';
    if (!shippingInfo.state?.trim()) newErrors.state = 'State is required';
    if (!shippingInfo.zipCode?.trim()) newErrors.zipCode = 'ZIP code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const inputStyle = (field) => [
    styles.input,
    errors[field] ? styles.inputError : null
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Shipping Address</Text>
        <TouchableOpacity style={styles.locationButton} onPress={fillCurrentLocation}>
          <Text style={styles.locationButtonText}>Use Current Location</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={inputStyle('email')}
          placeholder="Enter email address"
          value={shippingInfo.email}
          onChangeText={(text) => setShippingInfo({ ...shippingInfo, email: text })}
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={inputStyle('phone')}
          placeholder="Enter phone number"
          value={shippingInfo.phone}
          onChangeText={(text) => setShippingInfo({ ...shippingInfo, phone: text })}
          keyboardType="phone-pad"
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.textArea, errors.address ? styles.inputError : null]}
          placeholder="Enter complete address"
          value={shippingInfo.address}
          onChangeText={(text) => setShippingInfo({ ...shippingInfo, address: text })}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
        {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
      </View>

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={inputStyle('city')}
            placeholder="Enter city"
            value={shippingInfo.city}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, city: text })}
          />
          {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
        </View>

        <View style={styles.halfInput}>
          <Text style={styles.label}>State</Text>
          <TextInput
            style={inputStyle('state')}
            placeholder="Enter state"
            value={shippingInfo.state}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, state: text })}
          />
          {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>ZIP Code</Text>
        <TextInput
          style={inputStyle('zipCode')}
          placeholder="Enter ZIP code"
          value={shippingInfo.zipCode}
          onChangeText={(text) => setShippingInfo({ ...shippingInfo, zipCode: text })}
          keyboardType="numeric"
        />
        {errors.zipCode && <Text style={styles.errorText}>{errors.zipCode}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  locationButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  locationButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  inputError: {
    borderColor: '#FF5A5F',
  },
  errorText: {
    color: '#FF5A5F',
    fontSize: 12,
    marginTop: 4,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    height: 80,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 0.48,
    marginBottom: 16,
  },
});

export default ShippingAddress;

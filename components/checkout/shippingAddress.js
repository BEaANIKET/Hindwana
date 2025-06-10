import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ShippingAddress = ({ shippingInfo, setShippingInfo, fillCurrentLocation, currentLocation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Shipping Address</Text>
        <TouchableOpacity 
          style={styles.locationButton}
          onPress={fillCurrentLocation}
        >
          <Text style={styles.locationButtonText}>Use Current Location</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email address"
          value={shippingInfo.email}
          onChangeText={(text) => setShippingInfo({...shippingInfo, email: text})}
          keyboardType="email-address"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          value={shippingInfo.phone}
          onChangeText={(text) => setShippingInfo({...shippingInfo, phone: text})}
          keyboardType="phone-pad"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Enter complete address"
          value={shippingInfo.address}
          onChangeText={(text) => setShippingInfo({...shippingInfo, address: text})}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>
      
      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter city"
            value={shippingInfo.city}
            onChangeText={(text) => setShippingInfo({...shippingInfo, city: text})}
          />
        </View>
        
        <View style={styles.halfInput}>
          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter state"
            value={shippingInfo.state}
            onChangeText={(text) => setShippingInfo({...shippingInfo, state: text})}
          />
        </View>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>ZIP Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ZIP code"
          value={shippingInfo.zipCode}
          onChangeText={(text) => setShippingInfo({...shippingInfo, zipCode: text})}
          keyboardType="numeric"
        />
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
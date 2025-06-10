import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const OrderSummary = ({ orderData, promoCode, setPromoCode, applyPromoCode }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>
      
      <View style={styles.row}>
        <Text style={styles.label}>Total Price</Text>
        <Text style={styles.value}>₹{orderData.totalPrice}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Shipping Charge</Text>
        <Text style={styles.value}>₹{orderData.shippingCharge}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Tax</Text>
        <Text style={styles.value}>₹{orderData.tax}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Discount</Text>
        <Text style={styles.value}>-₹{orderData.discount}</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>₹{orderData.total}</Text>
      </View>
      
      <View style={styles.promoContainer}>
        <Text style={styles.promoLabel}>Promo Code</Text>
        <View style={styles.promoInputContainer}>
          <TextInput
            style={styles.promoInput}
            placeholder="Enter promo code"
            value={promoCode}
            onChangeText={setPromoCode}
          />
          <TouchableOpacity style={styles.applyButton} onPress={applyPromoCode}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  promoContainer: {
    marginTop: 16,
  },
  promoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  promoInputContainer: {
    flexDirection: 'row',
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  applyButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    justifyContent: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default OrderSummary;
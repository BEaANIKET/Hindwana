import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PaymentMode = ({ paymentMode, setPaymentMode }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Mode</Text>
      
      <TouchableOpacity 
        style={styles.radioContainer}
        onPress={() => setPaymentMode('cod')}
      >
        <View style={styles.radioButton}>
          {paymentMode === 'cod' && <View style={styles.radioSelected} />}
        </View>
        <Text style={styles.radioLabel}>Cash on Delivery</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.radioContainer}
        onPress={() => setPaymentMode('online')}
      >
        <View style={styles.radioButton}>
          {paymentMode === 'online' && <View style={styles.radioSelected} />}
        </View>
        <Text style={styles.radioLabel}>Online Payment (Razorpay)</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4A90E2',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4A90E2',
  },
  radioLabel: {
    fontSize: 14,
    color: '#333',
  },
});

export default PaymentMode;
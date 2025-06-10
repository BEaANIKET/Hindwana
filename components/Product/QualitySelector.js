import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './Style';

export const QuantitySelector = ({ onQuantityChange }) => {
  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (newQuantity) => {
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  return (
    <View style={styles.quantityContainer}>
      <Text style={styles.quantityLabel}>Quantity:</Text>
      <View style={styles.quantitySelector}>
        <TouchableOpacity
          onPress={() => updateQuantity(Math.max(1, quantity - 1))}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityValue}>{quantity}</Text>
        <TouchableOpacity
          onPress={() => updateQuantity(quantity + 1)}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
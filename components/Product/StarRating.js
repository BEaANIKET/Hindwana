
// StarRating.js
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

export const StarRating = ({ rating, size = 16 }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <Ionicons
          key={i}
          name={i < rating ? 'star' : 'star-outline'}
          size={size}
          color={i < rating ? '#FFD700' : '#D1D5DB'}
        />
      ))}
    </View>
  );
};

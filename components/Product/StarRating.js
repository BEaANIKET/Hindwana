// StarRating.js
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // or whatever icon library you're using

export const StarRating = ({ 
  rating = 0, 
  onChangeRating, 
  interactive = false, 
  disabled = false,
  maxStars = 5 
}) => {
  const handleStarPress = (starIndex) => {
    if (interactive && !disabled && onChangeRating) {
      onChangeRating(starIndex + 1);
    }
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(maxStars)].map((_, index) => {
        const filled = index < rating;
        
        if (interactive && !disabled) {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleStarPress(index)}
              style={{ marginRight: 4 }}
            >
              <Icon
                name={filled ? 'star' : 'star-o'}
                size={20}
                color={filled ? '#FFD700' : '#D1D5DB'}
              />
            </TouchableOpacity>
          );
        }
        
        return (
          <Icon
            key={index}
            name={filled ? 'star' : 'star-o'}
            size={20}
            color={filled ? '#FFD700' : '#D1D5DB'}
            style={{ marginRight: 4 }}
          />
        );
      })}
    </View>
  );
};
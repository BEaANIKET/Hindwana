import { Text, View } from 'react-native';
import { styles } from './Style';
import { StarRating } from './StarRating';
import { Ionicons } from '@expo/vector-icons';

export const ProductInfo = ({ product = {}, averageRating = 0, reviewCount = 0 }) => {
  const {
    Title = 'No Title',
    sku = 'N/A',
    dprice = 0,
    oprice = 0,
    stock = 0,
    deladdress = 'Unknown',
  } = product || {};

  console.log(product, averageRating, reviewCount );
  
  const safeAverageRating = Number.isFinite(averageRating) ? averageRating : 0;
  const safeReviewCount = Number.isInteger(reviewCount) ? reviewCount : 0;
  const savings = oprice - dprice;

  return (
    <View style={styles.productInfo}>
      <Text style={styles.productTitle}>{Title}</Text>
      <Text style={styles.productSku}>{sku}</Text>

      <View style={styles.ratingRow}>
        <StarRating rating={Math.round(safeAverageRating)} />
        <Text style={styles.ratingText}>
          ({safeAverageRating.toFixed(1)}) • {safeReviewCount} reviews
        </Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.currentPrice}>₹{dprice}</Text>
        <Text style={styles.originalPrice}>₹{oprice}</Text>
        {savings > 0 && (
          <View style={styles.savingsBadge}>
            <Text style={styles.savingsText}>Save ₹{savings}</Text>
          </View>
        )}
      </View>

      {/* Features */}
      <View style={styles.featuresContainer}>
        <View style={styles.feature}>
          <Ionicons name="flash" size={24} color="#3B82F6" />
          <Text style={styles.featureText}>Fast Delivery</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="refresh" size={24} color="#10B981" />
          <Text style={styles.featureText}>Easy Refundable</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="shield-checkmark" size={24} color="#8B5CF6" />
          <Text style={styles.featureText}>Secure Payment</Text>
        </View>
      </View>

      {/* Stock Status */}
      <View style={styles.stockContainer}>
        <Ionicons name="checkmark-circle" size={20} color="#10B981" />
        <Text style={styles.stockText}>In Stock ({stock} available)</Text>
      </View>

      {/* Location */}
      <View style={styles.locationContainer}>
        <Ionicons name="location" size={20} color="#6B7280" />
        <Text style={styles.locationText}>Available in: {deladdress}</Text>
      </View>
    </View>
  );
};

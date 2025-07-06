import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./Style";

export const ActionButtons = ({onBuyNow, onAddToCart, onWishlist, onShare, addToCartLoading}) => {
  return (
    <View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.buyNowButton} onPress={onBuyNow}>
          <Ionicons name="bag" size={20} color="white" />
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            addToCartLoading && {opacity: 0.6}, // Visually indicate disabled
          ]}
          onPress={onAddToCart}
          disabled={addToCartLoading}>
          {addToCartLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.addToCartText}>Add to Cart</Text>
          )}
        </TouchableOpacity>
      </View>

        {/* <View style={styles.secondaryActions}>
          <TouchableOpacity style={styles.secondaryAction} onPress={onWishlist}>
            <Ionicons name="heart-outline" size={20} color="#6B7280" />
            <Text style={styles.secondaryActionText}>Wishlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryAction} onPress={onShare}>
            <Ionicons name="share-outline" size={20} color="#6B7280" />
            <Text style={styles.secondaryActionText}>Share</Text>
          </TouchableOpacity>
        </View> */}
    </View>
  );
};

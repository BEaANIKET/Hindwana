import { Text, View } from 'react-native';
import { styles } from './Style';

export const AboutTab = ({ product }) => {
  // Remove HTML tags from About content
  const cleanAboutText = (htmlString) => {
    if (!htmlString) return '';
    return htmlString.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
  };

  return (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>About {product.Title}</Text>
      <Text style={styles.aboutText}>
        {cleanAboutText(product.About)}
      </Text>
      
      <Text style={styles.subTitle}>Product Information:</Text>
      <Text style={styles.aboutText}>• Category: {product.category}</Text>
      <Text style={styles.aboutText}>• Brand: {product.brand}</Text>
      <Text style={styles.aboutText}>• Available in: {product.state}</Text>
      <Text style={styles.aboutText}>• Delivery areas: {product.pincode.join(', ')}</Text>
      
      <Text style={styles.subTitle}>Usage:</Text>
      <Text style={styles.aboutText}>
        Perfect for religious ceremonies, temple decorations, and festive occasions.
        Fresh flowers that bring divine fragrance and positive energy to your worship.
      </Text>
    </View>
  );
};
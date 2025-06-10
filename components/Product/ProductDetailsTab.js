import { Text, View } from 'react-native';
import { styles } from './Style';

export const ProductDetailsTab = ({ product }) => {
  return (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Product Details</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Product Name:</Text>
          <Text style={styles.detailValue}>{product.Title}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>SKU:</Text>
          <Text style={styles.detailValue}>{product.sku}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Brand:</Text>
          <Text style={styles.detailValue}>{product.brand}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Category:</Text>
          <Text style={styles.detailValue}>{product.category}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>State:</Text>
          <Text style={styles.detailValue}>{product.state}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Available Pincodes:</Text>
          <Text style={styles.detailValue}>{product.pincode.length} areas</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Tax Rate:</Text>
          <Text style={styles.detailValue}>{product.taxrate}%</Text>
        </View>
      </View>
    </View>
  );
};

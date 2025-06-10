import { useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { ImageUri } from '../../constants/ImageUri';
import { styles } from './Style';

const { width } = Dimensions.get('window');

export const ProductImageGallery = ({ images, discount }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  console.log(ImageUri(images?.[selectedImage]));
  
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: ImageUri(images?.[selectedImage]) }}
        style={styles.mainImage}
        resizeMode="cover"
      />
      {discount > 0 && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{discount}% OFF</Text>
        </View>
      )}
      <View style={styles.offerBadge}>
        <Text style={styles.offerText}>SPECIAL OFFER</Text>
      </View>
      
      <View style={styles.thumbnailContainer}>
        {images.map((img, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedImage(index)}
            style={[
              styles.thumbnail,
              selectedImage === index && styles.selectedThumbnail
            ]}
          >
            <Image
              source={{ uri: ImageUri(img) }}
              style={styles.thumbnailImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

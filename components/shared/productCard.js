import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ImageUri } from "../../constants/ImageUri";
import Styles from "./Styles";

const ProductCard = ({product}) => {
  return (
    <View style={Styles.card}>
      <TouchableOpacity onPress={() => router.push(`/product/${product?._id}`)}>
        <Image source={{uri: ImageUri(product.image)}} style={Styles.image} />
        <View style={Styles.content}>
          <Text style={Styles.title} numberOfLines={1}>
            {product.Title}
          </Text>
          <Text style={Styles.sku} numberOfLines={1}>
            {product.sku}
          </Text>
          <View style={Styles.footer}>
            <Text style={Styles.price}>₹{product.dprice}</Text>
            <TouchableOpacity style={Styles.bookNowBtn}>
              <Text style={Styles.bookNowText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;

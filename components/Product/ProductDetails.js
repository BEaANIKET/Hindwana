import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthProvider";
import { useAddToCart } from "../../query/productQuery";
import { PageLoading } from "../PageLoading";
import { AboutTab } from "./AboutTab";
import { ActionButtons } from "./ActionButton";
import { ProductDetailsTab } from "./ProductDetailsTab";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductInfo } from "./ProductInfo";
import { ReviewsTab } from "./ReviewTab";
import { styles } from "./Style";
import { TabNavigation } from "./TanNavigation";

export const ProductDetail = ({product, reviewsData}) => {
  const {checkoutContext, setCheckoutContext} = useAppContext();
  const {isAuth} = useAuth();
  const [activeTab, setActiveTab] = useState("details");
  const [quantity, setQuantity] = useState(1);
  const averageRating =
    reviewsData?.reviews?.reduce((sum, review) => sum + review?.rating, 0) /
    reviewsData?.reviews?.length;
  const discount = Math.round(((product.oprice - product.dprice) / product.oprice) * 100);

  const {mutate: addToCart, isPending: addToCartLoading} = useAddToCart();

  const handleBuyNow = () => {
    if (!isAuth) {
      router.push("/login");
      return;
    }
    setCheckoutContext(product);
    router.push("/checkout");
  };

  const handleAddToCart = () => {
    if (!isAuth) {
      router.push("/login");
      return;
    }
    addToCart(product._id);
  };

  const handleWishlist = () => {
    console.log("Added to wishlist");
  };

  const handleShare = () => {
    console.log("Share pressed");
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return <ProductDetailsTab product={product} />;
      case "reviews":
        return reviewsData?.loadind ? (
          <PageLoading />
        ) : (
          <ReviewsTab reviews={reviewsData?.reviews} averageRating={averageRating} productId={product?._id} />
        );
      case "about":
        return <AboutTab product={product} />;
      default:
        return <ProductDetailsTab product={product} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProductImageGallery images={product?.ProductImage} discount={discount} />
        <ProductInfo product={product} averageRating={40} reviewCount={40} />
        <View style={styles.actionSection}>
          {/* <QuantitySelector onQuantityChange={handleQuantityChange} /> */}

          <ActionButtons
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
            onWishlist={handleWishlist}
            onShare={handleShare}
            addToCartLoading={addToCartLoading}
          />
        </View>
        <View style={styles.tabsContainer}>
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          {renderTabContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

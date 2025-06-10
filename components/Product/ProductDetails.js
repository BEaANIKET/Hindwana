import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import { PageLoading } from "../PageLoading";
import { AboutTab } from "./AboutTab";
import { ActionButtons } from "./ActionButton";
import { ProductDetailsTab } from "./ProductDetailsTab";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductInfo } from "./ProductInfo";
import { QuantitySelector } from "./QualitySelector";
import { ReviewsTab } from "./ReviewTab";
import { styles } from "./Style";
import { TabNavigation } from "./TanNavigation";

export const ProductDetail = ({product, reviewsData}) => {
  const [activeTab, setActiveTab] = useState("details");
  const [quantity, setQuantity] = useState(1);

  const averageRating =
    reviewsData?.reviews?.reduce((sum, review) => sum + review?.rating, 0) /
    reviewsData?.reviews?.length;
  const discount = Math.round(((product.oprice - product.dprice) / product.oprice) * 100);

  const handleBuyNow = () => {
    console.log("Buy now pressed with quantity:", quantity);
    // setCheckoutProduct([...product]);
    router.push("/checkout");
  };

  const handleAddToCart = () => {
    console.log("Add to cart pressed with quantity:", quantity);
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
          <ReviewsTab reviews={reviewsData?.reviews} averageRating={averageRating} />
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
          <QuantitySelector onQuantityChange={handleQuantityChange} />

          <ActionButtons
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
            onWishlist={handleWishlist}
            onShare={handleShare}
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

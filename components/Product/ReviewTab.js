import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthProvider";
import { useAddProductReview } from "../../query/productQuery";
import { StarRating } from "./StarRating";
import { styles } from "./Style";

export const ReviewsTab = ({reviews = [], averageRating = 0, productId}) => {
  const {user, isAuth} = useAuth();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const {
    mutate: addProductReview,
    isPending: addProductReviewLoading,
    error: addProductReviewError,
  } = useAddProductReview(user?._id);

  const handleSubmitReview = () => {

    if(!isAuth) {
      router.push('/login')
    }

    
    if (!reviewText || rating === 0) {
      Alert.alert("Error", "Please add text and select a rating before submitting.");
      return;
    }

    addProductReview(
      {
        fullname: user?.fullname,
        param: productId,
        rating,
        reviewText,
      },
      {
        onSuccess: () => {
          Alert.alert("Success", "Your review has been submitted successfully!");
          setReviewText("");
          setRating(0);
        },
        onError: (error) => {
          Alert.alert("Error", error?.message || "Failed to submit review. Please try again.");
        },
      }
    );
  };

  return (
    <View style={styles.tabContent}>
      {/* Review Summary */}
      <View style={styles.reviewHeader}>
        <Text style={styles.sectionTitle}>Customer Reviews</Text>
        <View style={styles.ratingContainer}>
          <StarRating rating={Math.round(averageRating)} />
          <Text style={styles.ratingText}>
            {averageRating?.toFixed(1)} out of 5 ({reviews?.length} reviews)
          </Text>
        </View>
      </View>

      {/* Error Display */}
      {addProductReviewError && (
        <View
          style={{
            backgroundColor: "#FEE2E2",
            borderColor: "#F87171",
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
          }}>
          <Text style={{color: "#DC2626", fontWeight: "500"}}>
            Error: {addProductReviewError?.message || "Failed to submit review"}
          </Text>
        </View>
      )}

      {/* List of Reviews */}
      {reviews.map((review) => (
        <View key={review.id} style={styles.reviewCard}>
          <View style={styles.reviewUserInfo}>
            {review?.user?.profilepicture && (
              <Image
                source={{uri: review.user.profilepicture}}
                style={{width: 36, height: 36, borderRadius: 18, marginRight: 8}}
              />
            )}
            <View>
              <Text style={styles.reviewUserName}>{review?.user?.fullname}</Text>
              <Text style={styles.reviewDate}>{new Date(review.updatedAt).toLocaleString()}</Text>
            </View>
          </View>
          <StarRating rating={review.rating} />
          <Text style={styles.reviewComment}>{review.reviewText}</Text>
        </View>
      ))}

      {/* Add New Review */}
      <View style={{marginTop: 24}}>
        <Text style={[styles.sectionTitle, {marginBottom: 12}]}>Write a Review</Text>
        <StarRating
          rating={rating}
          onChangeRating={setRating}
          interactive={true}
          disabled={addProductReviewLoading}
        />
        <TextInput
          placeholder="Write your review..."
          value={reviewText}
          onChangeText={setReviewText}
          multiline
          editable={!addProductReviewLoading}
          style={{
            borderWidth: 1,
            borderColor: "#E5E7EB",
            borderRadius: 8,
            padding: 12,
            height: 100,
            textAlignVertical: "top",
            marginTop: 12,
            marginBottom: 12,
            backgroundColor: addProductReviewLoading ? "#F9FAFB" : "white",
            opacity: addProductReviewLoading ? 0.7 : 1,
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: addProductReviewLoading ? "#9CA3AF" : "#3B82F6",
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={handleSubmitReview}
          disabled={addProductReviewLoading}>
          {addProductReviewLoading && (
            <ActivityIndicator size="small" color="white" style={{marginRight: 8}} />
          )}
          <Text style={{color: "white", fontWeight: "600"}}>
            {addProductReviewLoading ? "Submitting..." : "Submit Review"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

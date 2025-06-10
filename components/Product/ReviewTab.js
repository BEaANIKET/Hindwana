import { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StarRating } from './StarRating';
import { styles } from './Style';

export const ReviewsTab = ({ reviews = [], averageRating = 0 }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmitReview = () => {
    if (!reviewText || rating === 0) {
      Alert.alert('Error', 'Please add text and select a rating before submitting.');
      return;
    }

    console.log('Submitting review:', { rating, reviewText });
    // Call your API here

    setReviewText('');
    setRating(0);
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

      {/* List of Reviews */}
      {reviews.map((review) => (
        <View key={review.id} style={styles.reviewCard}>
          <View style={styles.reviewUserInfo}>
            {review?.user?.profilepicture && (
              <Image
                source={{ uri: review.user.profilepicture }}
                style={{ width: 36, height: 36, borderRadius: 18, marginRight: 8 }}
              />
            )}
            <View>
              <Text style={styles.reviewUserName}>{review?.user?.fullname}</Text>
              <Text style={styles.reviewDate}>
                {new Date(review.updatedAt).toLocaleString()}
              </Text>
            </View>
          </View>
          <StarRating rating={review.rating} />
          <Text style={styles.reviewComment}>{review.reviewText}</Text>
        </View>
      ))}

      {/* Add New Review */}
      <View style={{ marginTop: 24 }}>
        <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>Write a Review</Text>
        <StarRating rating={rating} onChangeRating={setRating} />
        <TextInput
          placeholder="Write your review..."
          value={reviewText}
          onChangeText={setReviewText}
          multiline
          style={{
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 8,
            padding: 12,
            height: 100,
            textAlignVertical: 'top',
            marginTop: 12,
            marginBottom: 12,
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#3B82F6',
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={handleSubmitReview}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>Submit Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

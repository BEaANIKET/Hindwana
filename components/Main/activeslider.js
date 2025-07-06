import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.7;
const CARD_MARGIN = 10;

const ActiveSlider = ({info}) => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = [
    {
      id: 1,
      title: 'Santra, Orange',
      description: 'Offer fresh, high-quality oranges for spiritual rituals and prasad through your online app. Ensure...',
      image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      title: 'Amrud, Guava',
      description: 'Sweet and pure guavas – perfect for eating and divine enough for prasad.',
      image: 'https://images.unsplash.com/photo-1536511132770-e5058c4205f4?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      title: 'Satyanarayan Puja',
      description: 'Satyanarayan Puja is a sacred Hindu ritual dedicated to Lord Vishnu in his Satyanarayan form...',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    },
    {
      id: 4,
      title: 'Fresh Fruits',
      description: 'Premium quality fresh fruits for all your spiritual and daily needs.',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop',
    },
  ];

  const scrollToIndex = (index) => {
    if (scrollViewRef.current) {
      const offset = index * (CARD_WIDTH + CARD_MARGIN * 2);
      scrollViewRef.current.scrollTo({ x: offset, animated: true });
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : data.length - 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (CARD_WIDTH + CARD_MARGIN * 2));
    setCurrentIndex(index);
  };

  const renderCard = (item) => (
    <TouchableOpacity key={item._id} onPress={() => router.push(`/product/${item._id}`)} >
       <View  style={styles.card}>
      <Image source={{ uri: `https://socket.hindwana.com/public/Images/${item?.image}` }} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item?.Title}</Text>
        <Text style={styles.cardDescription} numberOfLines={3}>
          {item?.sku}
        </Text>
      </View>
    </View>
    </TouchableOpacity>
   
  );

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        {/* Previous Button */}
        {/* <TouchableOpacity 
          style={[styles.navButton, styles.prevButton]} 
          onPress={handlePrevious}
          activeOpacity={0.7}
        >
          <Text style={styles.navButtonText}>‹</Text>
        </TouchableOpacity> */}

        {/* Horizontal ScrollView */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={false}
          decelerationRate="fast"
          snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
          snapToAlignment="start"
          contentContainerStyle={styles.scrollContainer}
          onMomentumScrollEnd={handleScroll}
          scrollEventThrottle={16}
        >
          {info?.map((item, index) => renderCard(item, index))}
        </ScrollView>

        {/* Next Button */}
        {/* <TouchableOpacity 
          style={[styles.navButton, styles.nextButton]} 
          onPress={handleNext}
          activeOpacity={0.7}
        >
          <Text style={styles.navButtonText}>›</Text>
        </TouchableOpacity> */}
      </View>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              currentIndex === index && styles.paginationDotActive,
            ]}
            onPress={() => {
              setCurrentIndex(index);
              scrollToIndex(index);
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 20,
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  scrollContainer: {
    paddingHorizontal: CARD_MARGIN,
    paddingRight: CARD_MARGIN + 50, // Extra padding for next button
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: CARD_MARGIN,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -25 }],
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  prevButton: {
    left: 10,
  },
  nextButton: {
    right: 10,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#007AFF',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default ActiveSlider;
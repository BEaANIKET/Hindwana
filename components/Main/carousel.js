import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const Carousel = ({
  data = [],
  autoPlay = false,
  autoPlayInterval = 3000,
  showDots = true,
  showArrows = true,
  itemWidth = screenWidth * 0.8,
  itemHeight = 200,
  spacing = 10,
  borderRadius = 12,
  onItemPress = () => {},
}) => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || data.length <= 1) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      scrollToIndex(nextIndex);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, data.length, autoPlayInterval]);

  const scrollToIndex = (index) => {
    if (scrollViewRef.current && index >= 0 && index < data.length) {
      const offset = index * (itemWidth + spacing);
      scrollViewRef.current.scrollTo({ x: offset, animated: true });
      setCurrentIndex(index);
    }
  };

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : data.length - 1;
    scrollToIndex(prevIndex);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    const nextIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(nextIndex);
  };

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (itemWidth + spacing));
    if (index !== currentIndex && index >= 0 && index < data.length) {
      setCurrentIndex(index);
    }
  };

  const handleScrollBegin = () => {
    setIsAutoPlaying(false);
  };

  const handleScrollEnd = () => {
    if (autoPlay) {
      setTimeout(() => setIsAutoPlaying(true), 2000);
    }
  };

  const renderCarouselItem = (item, index) => (
    <TouchableOpacity
      key={item.id || index}
      style={[styles.carouselItem, { width: itemWidth, height: itemHeight }]}
      onPress={() => onItemPress(item, index)}
      activeOpacity={0.9}
    >
      <View style={[styles.itemContainer, { borderRadius }]}>
        {item.image && (
          <Image
            source={typeof item.image === 'string' ? { uri: item.image } : item.image}
            style={[styles.itemImage, { borderRadius }]}
            resizeMode="cover"
          />
        )}
        <View style={styles.overlay}>
          {item.title && (
            <Text style={styles.itemTitle} numberOfLines={2}>
              {item.title}
            </Text>
          )}
          {item.description && (
            <Text style={styles.itemDescription} numberOfLines={3}>
              {item.description}
            </Text>
          )}
          {item.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderDots = () => (
    <View style={styles.pagination}>
      {data.map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.paginationDot,
            currentIndex === index && styles.paginationDotActive,
          ]}
          onPress={() => scrollToIndex(index)}
        />
      ))}
    </View>
  );

  const renderArrows = () => (
    <>
      <TouchableOpacity
        style={[styles.navButton, styles.prevButton]}
        onPress={handlePrevious}
        activeOpacity={0.7}
      >
        <Text style={styles.navButtonText}>‹</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navButton, styles.nextButton]}
        onPress={handleNext}
        activeOpacity={0.7}
      >
        <Text style={styles.navButtonText}>›</Text>
      </TouchableOpacity>
    </>
  );

  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No items to display</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={false}
          decelerationRate="fast"
          snapToInterval={itemWidth + spacing}
          snapToAlignment="start"
          contentContainerStyle={[styles.scrollContainer, { paddingHorizontal: spacing / 2 }]}
          onScrollBeginDrag={handleScrollBegin}
          onMomentumScrollEnd={(e) => {
            handleScroll(e);
            handleScrollEnd();
          }}
          scrollEventThrottle={16}
        >
          {data.map((item, index) => renderCarouselItem(item, index))}
        </ScrollView>

        {showArrows && data.length > 1 && renderArrows()}
      </View>

      {showDots && data.length > 1 && renderDots()}

      {/* Auto-play indicator */}
      {isAutoPlaying && (
        <View style={styles.autoPlayIndicator}>
          <View style={styles.autoPlayDot} />
        </View>
      )}
    </View>
  );
};

// Sample data for demonstration
const sampleData = [
  {
    id: 1,
    title: 'Beautiful Sunset',
    description: 'Experience the most breathtaking sunset views from around the world.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    badge: 'Popular',
  },
  {
    id: 2,
    title: 'Mountain Adventure',
    description: 'Discover amazing mountain trails and hiking experiences.',
    image: 'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=800&h=400&fit=crop',
    badge: 'New',
  },
  {
    id: 3,
    title: 'Ocean Paradise',
    description: 'Dive into crystal clear waters and explore marine life.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'City Lights',
    description: 'Experience the vibrant nightlife of modern cities.',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=800&h=400&fit=crop',
    badge: 'Featured',
  },
];

// Example usage component
const CarouselExample = () => {
  const handleItemPress = (item, index) => {
    console.log('Pressed item:', item.title, 'at index:', index);
  };

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>React Native Carousel</Text>
      
      {/* Basic Carousel */}
      <Carousel
        data={sampleData}
        autoPlay={true}
        autoPlayInterval={4000}
        onItemPress={handleItemPress}
      />

      {/* Compact Carousel */}
      <Text style={styles.sectionTitle}>Compact Version</Text>
      <Carousel
        data={sampleData}
        itemWidth={screenWidth * 0.6}
        itemHeight={150}
        showArrows={false}
        spacing={15}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  carouselContainer: {
    position: 'relative',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  carouselItem: {
    marginHorizontal: 5,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '70%',
    backgroundColor: '#f0f0f0',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    lineHeight: 16,
  },
  badge: {
    position: 'absolute',
    top: -40,
    right: 8,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -25 }],
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
    fontSize: 28,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
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
  autoPlayIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 5,
  },
  autoPlayDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  emptyContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
  // Example styles
  exampleContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 50,
  },
  exampleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 15,
    color: '#333',
  },
});

export default CarouselExample;
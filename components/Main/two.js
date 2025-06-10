import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, ImageBackground } from 'react-native';

export default function Two() {
  const windowWidth = Dimensions.get('window').width;
  
  // Card data - images and captions
  const cardData = [
    { 
      id: '1', 
      image: 'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?q=80&w=2070',
      caption: 'Fresh Mango' 
    },
    { 
      id: '2', 
      image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=2187',
      caption: 'something good' 
    },
    { 
      id: '3', 
      image: 'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?q=80&w=2070',
      caption: 'Raghav Jha nn' 
    },
    { 
      id: '4', 
      image: 'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?q=80&w=2070',
      caption: 'fukra insaan' 
    },
  ];

  // Background image URL - replace with your preferred background
  const backgroundImage = 'https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2029';

  return (
    <ImageBackground 
      source={{ uri: backgroundImage }} 
      style={styles.backgroundImage}
      blurRadius={3}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.gridContainer}>
          {cardData.map((item) => (
            <View key={item.id} style={[styles.card, { width: windowWidth / 2 - 24 }]}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.captionContainer}>
                <Text style={styles.caption}>{item.caption}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    padding: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150,
  },
  captionContainer: {
    padding: 12,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  caption: {
    fontSize: 14,
    color: '#666',
  },
});
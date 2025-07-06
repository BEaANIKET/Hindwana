import { AntDesign } from '@expo/vector-icons'; // Make sure to install expo vector icons
import axios from 'axios';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProductCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: `https://socket.hindwana.com/public/Images/${item?.thumbnail}`}} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.programName}</Text>
        <Text style={styles.description}>{item.venueName}</Text>
        <Text style={styles.price}>₹{item.ticketPrice.toFixed(2)}</Text>
        
        <TouchableOpacity style={styles.buyButton} onPress={() => console.log('Add to cart:', item.id)}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
          <AntDesign name="shoppingcart" size={16} color="white" style={styles.cartIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const explore = () => {
    const navigation = useNavigation();
    const [info, setInfo] = useState([])
    const getevent = async() => {
      try {
        const res = await axios.get("https://socket.hindwana.com/api/events")
          setInfo(res.data)
      } catch (error) {
        
      }
    }
    useEffect(()=>{
      getevent();
    },[])
  return (
<View style={styles.container}>
  <Text style={styles.sectionTitle}>Enjoy Events</Text>

  <View style={styles.topButtons}>
    <TouchableOpacity onPress={() => console.log('Events pressed')}>
      <Text style={styles.topButtonText}>Events</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('createevent')}>
      <Text style={styles.topButtonText}>Organise</Text> 
    </TouchableOpacity>
  </View>

  <FlatList
    data={info}
    renderItem={({ item }) => <ProductCard item={item} />}
    keyExtractor={item => item._id}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.listContainer}
  />
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '900',
    // marginBottom: 16,
    padding: 20,
    color: '#000',
    textAlign: 'center',
    textShadowColor: '#aaa',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e91e63',
    marginBottom: 12,
  },
  buyButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 8,
  },
  cartIcon: {
    marginLeft: 4,
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  
  topButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#e3f2fd',
  },
});

export default explore;
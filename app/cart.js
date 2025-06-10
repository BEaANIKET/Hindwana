import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Alert, ActivityIndicator, StyleSheet } from 'react-native';
// import { useAuth } from '../stores/Auth';
// import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons'; // Using AntDesign for delete icon
import { useNavigation } from 'expo-router';

const Cart = () => {
  const user = "680a69f6a3eb0188797cbe05"
  const navigation = useNavigation();
  const backendUrl = 'https://socket.hindwana.com';
  const [initialReviews, setInitialReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCartData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/usercartdata/${user}`);
      setInitialReviews(res.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to load cart data.");
    } finally {
      setLoading(false);
    }
  };

  const navigateToPage = (id) => {
    navigation.navigate('Page', { id });
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${backendUrl}/api/deletecart/${id}`);
      Alert.alert("Deleted", res.data.message);
      setInitialReviews((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      Alert.alert("Error", "Failed to delete item.");
    }
  };

  useEffect(() => {
    if (user) {
      getCartData();
    }
  }, [user]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity style={styles.itemRow} onPress={() => navigateToPage(item.productId._id)}>
        <Image
          source={{ uri: `${backendUrl}/public/Images/${item.productId.image}` }}
          style={styles.image}
          defaultSource={{uri: "https://socket.hindwana.com/public/Images/435597b2d80a41c54d8d5532eb96fb7a"}} // fallback image
        />
        <View style={styles.details}>
          <Text style={styles.title}>{item.productId.Title}</Text>
          <Text style={styles.brand}>{item.productId.brand}</Text>
          <Text style={styles.price}>₹ {item.productId.dprice}</Text>
          <Text style={styles.date}>{moment(item.createdAt).format("MMMM D, YYYY")}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(item._id)} style={styles.deleteButton}>
        <AntDesign name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="rgb(30,144,255)" />
      </View>
    );
  }

  return (
    <FlatList
      data={initialReviews}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: '#f9fafb',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
  },
  itemRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
  },
  details: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  brand: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginTop: 6,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  deleteButton: {
    padding: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Cart;

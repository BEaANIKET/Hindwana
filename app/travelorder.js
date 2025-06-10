import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
// import { useAuth } from '../stores/Auth';
import axios from 'axios';
import { ToastAndroid } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
// import { Truck } from 'lucide-react-native';
import moment from 'moment';

const travelorder = () => {
  const backendUrl = 'https://socket.hindwana.com';
const user = '680a69f6a3eb0188797cbe05'
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyorder = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/getmyorder/${user}`);
      setReviews(res.data);
    } catch (error) {
      ToastAndroid.show("Invalid Access", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getMyorder();
    }
  }, [user]);

//   if (!isLoggedIn || loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

  if (reviews?.length < 1) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noOrdersText}>No Orders</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Your Orders ({reviews.length})</Text>

      {reviews?.map((order) => (
        <View key={order._id} style={styles.orderCard}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: `${backendUrl}/Public/Images/${order?.ProductId?.image}` }}
              style={styles.productImage}
              resizeMode="contain"
              onError={({ nativeEvent: { error } }) => console.log('Image Load Error:', error)}
            />
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.titlePriceRow}>
              <Text style={styles.productTitle}>{order.ProductId?.Title}</Text>
              <Text style={styles.priceText}>₹{parseFloat(order.amount).toFixed(2)}</Text>
            </View>

            <View style={styles.sellerInfo}>
              <Text style={styles.sellerText}>Seller: {order.seller.fullname}</Text>
              <Text style={styles.sellerText}>Order #{order._id}</Text>
            </View>

            <View style={styles.statusRow}>
              <Text style={styles.statusText}>{order?.status || "Pending"}</Text>
              <View style={styles.etaBox}>
                <Text style={styles.etaTime}>15 min</Text>
                <Text style={styles.etaLabel}>ETA</Text>
              </View>
            </View>

            <View style={styles.footerRow}>
              <Text style={styles.dateText}>
                Ordered: {moment(order.createdAt).format('MMMM D, YYYY h:mm A')}
              </Text>
              <TouchableOpacity style={styles.cancelButton}>
                {/* <Truck size={18} color="#fff" style={{ marginRight: 5 }} /> */}

                <Feather name="truck" size={18} color="#fff" style={{ marginRight: 5 }}/>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default travelorder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f9fafb',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },
  noOrdersText: {
    fontSize: 20,
    color: '#555',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1f2937',
  },
  orderCard: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  imageContainer: {
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  detailsContainer: {
    padding: 12,
  },
  titlePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  sellerInfo: {
    marginTop: 8,
    marginBottom: 10,
  },
  sellerText: {
    fontSize: 12,
    color: '#6b7280',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusText: {
    color: 'green',
    fontWeight: '600',
  },
  etaBox: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignItems: 'center',
  },
  etaTime: {
    color: '#0284c7',
    fontWeight: 'bold',
  },
  etaLabel: {
    fontSize: 10,
    color: '#0284c7',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#6b7280',
  },
  cancelButton: {
    flexDirection: 'row',
    backgroundColor: '#2563eb',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 30,
    alignItems: 'center',
  },
  cancelText: {
    color: 'white',
    fontSize: 14,
  },
});

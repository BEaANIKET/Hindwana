import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { Toast } from "toastify-react-native";
import CheckoutButton from "../components/checkout/checkoutButton";
import OrderSummary from "../components/checkout/orderSummary";
import PaymentMode from "../components/checkout/pamentMode";
import PersonalInformation from "../components/checkout/personalInformation";
import ShippingAddress from "../components/checkout/shippingAddress";
import { useAppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthProvider";
import { useCreateOrder, useGetRazorPayKey } from "../query/productQuery";
import { openRazorpayCheckout } from "../utils/razorPament";

const CheckoutScreen = () => {
  const { checkoutContext } = useAppContext();
  const [showErrors, setShowErrors] = useState(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const { user } = useAuth();
  
  const { mutate: createOrder, isPending: createOrderPending } = useCreateOrder();
  const { data: razorpayKey, isLoading: getRazorPayLoading } = useGetRazorPayKey(user?._id, {
    enabled: !!user
  });

  const [orderData, setOrderData] = useState({
    totalPrice: checkoutContext?.oprice || 0,
    shippingCharge: checkoutContext?.scost || 0,
    tax: checkoutContext?.percent || 0,
    discount: checkoutContext?.oprice - checkoutContext?.dprice || 0,
    total: (checkoutContext?.dprice || 0) + (checkoutContext?.scost || 0),
  });

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    whatsapp: "",
  });

  const [shippingInfo, setShippingInfo] = useState({
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [paymentMode, setPaymentMode] = useState("Online");
  const [promoCode, setPromoCode] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);

  // Get user's current location
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address.length > 0) {
        const addr = address[0];
        console.log({
          address: `${addr.street || ""} ${addr.streetNumber || ""}`,
          city: addr.city || "",
          state: addr.region || "",
          zipCode: addr.postalCode || "",
          country: addr.country || "",
        });

        setCurrentLocation({
          address: `${addr.street || ""} ${addr.streetNumber || ""}`,
          city: addr.city || "",
          state: addr.region || "",
          zipCode: addr.postalCode || "",
          country: addr.country || "",
        });
      }
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const fillCurrentLocation = () => {
    console.log(currentLocation);

    if (currentLocation) {
      setShippingInfo({
        ...shippingInfo,
        address: currentLocation.address,
        city: currentLocation.city,
        state: currentLocation.state,
        zipCode: currentLocation.zipCode,
      });
    } else {
      Alert.alert("Location not available", "Please enable location services and try again");
    }
  };

  const applyPromoCode = () => {
    // Mock promo code logic
    if (promoCode.toLowerCase() === "save10") {
      const discount = 10;
      const newTotal = orderData.totalPrice + orderData.shippingCharge - discount;
      setOrderData({
        ...orderData,
        discount: discount,
        total: newTotal,
      });
      Alert.alert("Success", "Promo code applied successfully!");
    } else if (promoCode) {
      Alert.alert("Invalid", "Invalid promo code");
    }
  };

  // Validation function
  const validateOrderData = () => {
    const errors = [];

    if (!personalInfo.name.trim()) {
      errors.push("Name is required");
    }
    if (!personalInfo.whatsapp.trim()) {
      errors.push("WhatsApp number is required");
    }
    if (!shippingInfo.email.trim()) {
      errors.push("Email is required");
    }
    if (!shippingInfo.phone.trim()) {
      errors.push("Phone number is required");
    }
    if (!shippingInfo.address.trim()) {
      errors.push("Address is required");
    }
    if (!shippingInfo.city.trim()) {
      errors.push("City is required");
    }
    if (!shippingInfo.state.trim()) {
      errors.push("State is required");
    }
    if (!shippingInfo.zipCode.trim()) {
      errors.push("Zip code is required");
    }

    if (errors.length > 0) {
      Alert.alert("Validation Error", errors.join("\n"));
      return false;
    }
    return true;
  };

  const createOrderData = () => {
    return {
      buyerName: personalInfo?.name,
      BuyerEmail: shippingInfo?.email,
      BuyerPhone: shippingInfo?.phone,
      BuyerWhatsApp: personalInfo?.whatsapp,
      BuyerAddress: shippingInfo?.address,
      BuyerCity: shippingInfo?.city,
      BuyerPincode: shippingInfo?.zipCode,
      BuyerState: shippingInfo?.state,
      
      ProductId: checkoutContext?._id,
      products: [
        {
          productId: checkoutContext?._id,
          quantity: 1,
          price: orderData?.total,
        },
      ],
      
      totalPrice: orderData?.totalPrice,
      amount: orderData?.total,
      oprice: orderData?.totalPrice,
      discount: orderData?.discount,
      scost: orderData?.shippingCharge,
      tax: orderData?.tax,
      paymentMode: paymentMode, // Fixed: was using totalPrice instead of paymentMode
      seller: checkoutContext?.user,
      user: user?._id,
    };
  };

  const handleCODOrder = async (orderDataToCreate) => {
    try {
      setIsProcessingOrder(true);
      
      await new Promise((resolve, reject) => {
        createOrder(orderDataToCreate, {
          onSuccess: (data) => {
            console.log('COD Order created successfully:', data);
            Toast.show({ 
              type: 'success', 
              text1: 'Order Placed Successfully!',
              text2: 'Your COD order has been confirmed'
            });
            resolve(data);
          },
          onError: (error) => {
            console.error('COD Order creation failed:', error);
            Toast.show({ 
              type: 'error', 
              text1: 'Order Failed',
              text2: 'Could not place your order. Please try again.'
            });
            reject(error);
          }
        });
      });
      
    } catch (error) {
      console.error('Error in COD order:', error);
    } finally {
      setIsProcessingOrder(false);
    }
  };

  const handleOnlinePayment = async (orderDataToCreate) => {
    try {
      setIsProcessingOrder(true);
      
      // Check if Razorpay key is available
      if (!razorpayKey?.key) {
        Toast.show({ 
          type: 'error', 
          text1: 'Payment Setup Error',
          text2: 'Payment gateway not configured. Please try COD.'
        });
        return;
      }

      // Open Razorpay checkout
      await openRazorpayCheckout({
        amount: orderData?.total,
        orderId: `order_${Date.now()}`, // Generate a unique order ID
        name: 'My Store',
        description: 'Order Payment',
        image: 'https://yourdomain.com/logo.png',
        prefill: {
          email: shippingInfo?.email,
          contact: shippingInfo?.phone,
          name: personalInfo?.name,
        },
        razorpayKey: razorpayKey?.key,
        onSuccess: async (paymentData) => {
          console.log('Payment Success:', paymentData);

          // Create order with payment details
          const finalOrderData = {
            ...orderDataToCreate,
            paymentStatus: 'Paid',
            razorpay_payment_id: paymentData.razorpay_payment_id,
            razorpay_order_id: paymentData.razorpay_order_id,
            razorpay_signature: paymentData.razorpay_signature,
          };

          // Create order in backend
          createOrder(finalOrderData, {
            onSuccess: (data) => {
              console.log('Online Order created successfully:', data);
              Toast.show({ 
                type: 'success', 
                text1: 'Payment Successful!',
                text2: 'Your order has been placed successfully'
              });
            },
            onError: (error) => {
              console.error('Order creation failed after payment:', error);
              Toast.show({ 
                type: 'error', 
                text1: 'Order Error',
                text2: 'Payment successful but order creation failed. Contact support.'
              });
            }
          });
        },
        onFailure: (err) => {
          console.log('Payment failed:', err);
          Toast.show({ 
            type: 'error', 
            text1: 'Payment Failed',
            text2: err.description || 'Please try again or use COD'
          });
        },
      });
    } catch (error) {
      console.error('Error in online payment:', error);
      Toast.show({ 
        type: 'error', 
        text1: 'Payment Error',
        text2: 'Could not initiate payment. Please try again.'
      });
    } finally {
      setIsProcessingOrder(false);
    }
  };

  const handleCheckout = async () => {
    // Prevent multiple submissions
    if (isProcessingOrder || createOrderPending) {
      return;
    }

    setShowErrors(true);

    // Validate form data
    if (!validateOrderData()) {
      return;
    }

    // Check if checkout context is available
    if (!checkoutContext?._id) {
      Alert.alert("Error", "Product information is missing. Please go back and try again.");
      return;
    }

    const orderDataToCreate = createOrderData();

    if (paymentMode === 'COD') {
      await handleCODOrder(orderDataToCreate);
    } else {
      await handleOnlinePayment(orderDataToCreate);
    }
  };

  // Calculate loading state
  const isLoading = getRazorPayLoading || createOrderPending || isProcessingOrder;

  return (
    <ScrollView style={styles.container}>
      <OrderSummary
        orderData={orderData}
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        applyPromoCode={applyPromoCode}
      />
      <PaymentMode paymentMode={paymentMode} setPaymentMode={setPaymentMode} />
      <PersonalInformation
        personalInfo={personalInfo}
        setPersonalInfo={setPersonalInfo}
        showErrors={showErrors}
      />
      <ShippingAddress
        shippingInfo={shippingInfo}
        setShippingInfo={setShippingInfo}
        fillCurrentLocation={fillCurrentLocation}
        currentLocation={currentLocation}
        showErrors={showErrors}
      />
      <CheckoutButton 
        onPress={handleCheckout} 
        isLoading={isLoading}
        disabled={isLoading}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});

export default CheckoutScreen;
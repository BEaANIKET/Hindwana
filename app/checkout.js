import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import CheckoutButton from "../components/checkout/checkoutButton";
import OrderSummary from "../components/checkout/orderSummary";
import PaymentMode from "../components/checkout/pamentMode";
import PersonalInformation from "../components/checkout/personalInformation";
import ShippingAddress from "../components/checkout/shippingAddress";
// import { checkoutAtom } from "../state/checkoutState";

const CheckoutScreen = () => {
  // const [checkoutProduct, setCheckoutProduct] = useAtom(checkoutAtom);

  // console.log("checkout product : ", checkoutProduct);

  const [orderData, setOrderData] = useState({
    totalPrice: 125,
    shippingCharge: 40,
    tax: 0,
    discount: 0,
    total: 175,
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

  const [paymentMode, setPaymentMode] = useState("online");
  const [promoCode, setPromoCode] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);

  // Get user's current location
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      let {status} = await Location.requestForegroundPermissionsAsync();
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

  const handleCheckout = () => {
    // Validation
    if (!personalInfo.name || !personalInfo.whatsapp) {
      Alert.alert("Error", "Please fill in personal information");
      return;
    }

    if (
      !shippingInfo.email ||
      !shippingInfo.phone ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state
    ) {
      Alert.alert("Error", "Please fill in shipping address");
      return;
    }

    // Process checkout
    Alert.alert("Success", "Order placed successfully!", [
      {
        text: "OK",
        onPress: () => console.log("Order processed"),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <OrderSummary
        orderData={orderData}
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        applyPromoCode={applyPromoCode}
      />

      <PaymentMode paymentMode={paymentMode} setPaymentMode={setPaymentMode} />

      <PersonalInformation personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />

      <ShippingAddress
        shippingInfo={shippingInfo}
        setShippingInfo={setShippingInfo}
        fillCurrentLocation={fillCurrentLocation}
        currentLocation={currentLocation}
      />

      <CheckoutButton onPress={handleCheckout} />
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

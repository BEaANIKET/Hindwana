import RazorpayCheckout from 'react-native-razorpay';

export const openRazorpayCheckout = ({
  amount,
  orderId,
  name,
  description,
  image,
  prefill,
  themeColor,
  onSuccess,
  onFailure,
  razorpayKey
}) => {
  const options = {
    description: description,
    image: image || '',
    currency: 'INR',
    key: razorpayKey, // 🛑 Replace this with your Razorpay key
    amount: amount.toString(), // in paise (e.g., 50000 = ₹500)
    name: name,
    order_id: orderId, // from backend
    prefill: {
      email: prefill?.email || '',
      contact: prefill?.contact || '',
      name: prefill?.name || '',
    },
    theme: {
      color: themeColor || '#3399cc',
    },
  };

  RazorpayCheckout.open(options)
    .then((data) => {
      // Payment success
      onSuccess && onSuccess(data);
    })
    .catch((error) => {
      // Payment failed
      onFailure && onFailure(error);
    });
};

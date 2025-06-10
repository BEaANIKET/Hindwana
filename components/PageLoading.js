import { ActivityIndicator, StyleSheet, View } from "react-native";

export const PageLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4ade80" /> {/* Tailwind green-400 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // Optional: match your theme
  },
});

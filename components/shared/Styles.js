import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 10,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  sku: {
    fontSize: 12,
    color: "#777",
    marginVertical: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000",
  },
  bookNowBtn: {
    backgroundColor: "#0066ff",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  bookNowText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
});

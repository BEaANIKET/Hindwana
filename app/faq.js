import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Install if needed: npm install react-native-vector-icons

// Enable layout animations on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionItem = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity onPress={toggleExpand} style={styles.accordionHeader}>
        <Text style={styles.accordionTitle}>{title}</Text>
        <Icon name={expanded ? "chevron-up" : "chevron-down"} size={20} color="black" />
      </TouchableOpacity>
      {expanded && <View style={styles.accordionContent}><Text>{content}</Text></View>}
    </View>
  );
};

const faq = () => {
  const data = [
    { title: "What is React Native?", content: "React Native allows you to build mobile apps using React." },
    { title: "Why use React Native?", content: "It lets you develop for iOS and Android with the same codebase." },
    { title: "How does it work?", content: "It uses native components with JavaScript bridging." },
  ];

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  accordionItem: { backgroundColor: "#fff", marginBottom: 10, borderRadius: 8, elevation: 3, overflow: "hidden" },
  accordionHeader: { flexDirection: "row", justifyContent: "space-between", padding: 15, backgroundColor: "#f2f2f2" },
  accordionTitle: { fontSize: 16, fontWeight: "bold" },
  accordionContent: { padding: 15, backgroundColor: "#fff", borderTopWidth: 1, borderColor: "#ddd" },
});

export default faq;

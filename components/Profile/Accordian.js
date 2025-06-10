import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Enable animations for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Data for the accordion
const accordionData = [
  {
    id: 1,
    title: "Account Section",
    icon: "account-circle",
    color: "#FF5733",
    content: [
      { id: 1, title: "Your Dashboard", route: "login", icon: "view-dashboard", color: "#1E88E5" },
      { id: 2, title: "Update Account", route: "updateaccount", icon: "account-edit", color: "#43A047" },
      { id: 3, title: "Cart", route: "cart", icon: "cart", color: "#FBC02D" },
      { id: 4, title: "Orders", route: "order", icon: "clipboard-list", color: "#8E24AA" },
      { id: 5, title: "Travel", route: "travelorder", icon: "bus", color: "#FB8C00" },
    ],
  },
  {
    id: 2,
    title: "Settings",
    icon: "cog",
    color: "#673AB7",
    content: [
      { id: 1, title: "Logout", route: "Logout", icon: "exit-to-app", color: "#D32F2F" },
      { id: 2, title: "Contact Us", route: "Contact", icon: "whatsapp", color: "#4CAF50" },
    ],
  },
  {
    id: 3,
    title: "Help",
    icon: "clover",
    color: "purple",
    content: [
      { id: 1, title: "Faq", route: "faq", icon: "apple-keyboard-command", color: "#D32F2F" },
      { id: 2, title: "HindAi", route: "ai", icon: "chat", color: "#4CAF50" },
    ],
  },
];

const Accordion = () => {
  const [open, setOpen] = useState(null);
  const navigation = useNavigation();

  const toggleAccordion = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(open === id ? null : id);
  };

  return (
    <View style={{ padding: 15 }}>
      {accordionData.map((section) => (
        <View key={section.id} style={{ marginBottom: 12, borderRadius: 10, overflow: "hidden", backgroundColor: "#fff", elevation: 4, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5 }}>
          {/* Header Section */}
          <TouchableOpacity
            onPress={() => toggleAccordion(section.id)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 15,
              backgroundColor: section.color,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name={section.icon} size={24} color="#fff" />
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff", marginLeft: 10 }}>
                {section.title}
              </Text>
            </View>
            <Icon name={open === section.id ? "chevron-up" : "chevron-down"} size={24} color="#fff" />
          </TouchableOpacity>

          {/* Content Section */}
          {open === section.id && (
            <View style={{ padding: 12, backgroundColor: "#f9f9f9" }}>
              {section.content.map((item) => (
                <TouchableOpacity
                  key={item.id} 
                  onPress={() => navigation.navigate(item.route)}
                  style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" }}
                >
                  <Icon name={item.icon} size={22} color={item.color} style={{ marginRight: 10 }} />
                  <Text style={{ fontSize: 14, color: "#333" }}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default Accordion;

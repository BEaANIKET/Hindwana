import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { LayoutAnimation, Platform, Text, TouchableOpacity, UIManager, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useLogout } from "../../query/authQuery";

// Enable animations for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Accordion = () => {
  const [open, setOpen] = useState(null);
  const navigation = useNavigation();
  const { logout } = useLogout();

  // Data for the accordion
  const accordionData = [
    {
      id: 1,
      title: "Account Section",
      icon: "account-circle",
      color: "#FF5733",
      content: [
        {
          id: 2,
          title: "Update Account",
          route: "updateaccount",
          icon: "account-edit",
          color: "#43A047",
          type: "navigation"
        },
        {
          id: 3, 
          title: "Cart", 
          route: "cart", 
          icon: "cart", 
          color: "#FBC02D",
          type: "navigation"
        },
        {
          id: 4, 
          title: "Orders", 
          route: "order", 
          icon: "clipboard-list", 
          color: "#8E24AA",
          type: "navigation"
        },
      ],
    },
    {
      id: 2,
      title: "Settings",
      icon: "cog",
      color: "#673AB7",
      content: [
        {
          id: 1,
          title: "Logout",
          icon: "exit-to-app",
          color: "#D32F2F",
          type: "action",
          action: logout,
        },
        {
          id: 2, 
          title: "Contact Us", 
          route: "Contact", 
          icon: "whatsapp", 
          color: "#4CAF50",
          type: "navigation"
        },
      ],
    },
  ];

  const toggleAccordion = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(open === id ? null : id);
  };

  const handleItemPress = (item) => {
    if (item.type === "action" && item.action) {
      // Execute the action function
      item.action();
    } else if (item.type === "navigation" && item.route) {
      // Navigate to the specified route
      navigation.navigate(item.route);
    }
  };

  return (
    <View style={{ padding: 15 }}>
      {accordionData.map((section) => (
        <View
          key={section.id}
          style={{
            marginBottom: 12,
            borderRadius: 10,
            overflow: "hidden",
            backgroundColor: "#fff",
            elevation: 4,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 5,
          }}>
          {/* Header Section */}
          <TouchableOpacity
            onPress={() => toggleAccordion(section.id)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 15,
              backgroundColor: section.color,
            }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name={section.icon} size={24} color="#fff" />
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff", marginLeft: 10 }}>
                {section.title}
              </Text>
            </View>
            <Icon
              name={open === section.id ? "chevron-up" : "chevron-down"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          {/* Content Section */}
          {open === section.id && (
            <View style={{ padding: 12, backgroundColor: "#f9f9f9" }}>
              {section.content.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleItemPress(item)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ddd",
                  }}>
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
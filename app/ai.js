import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet
} from "react-native";
// import { useAuth } from "../stores/Auth";
import { FontAwesome } from "@expo/vector-icons"; // Using Expo icons
import axios from "axios";

const Ai = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
//   const { user } = useAuth();
  const scrollRef = useRef();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("https://socket.hindwana.com/api/ai", {
        prompt: input,
      });

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: res.data.response || "I didn't get that, can you rephrase?",
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: "Error fetching AI response.",
          sender: "ai",
        },
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Chat App</Text>
        <View style={styles.userBubble}>
          {/* <Text style={styles.userText}>{user?.fullname || "User"}</Text> */}
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.chatContainer}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === "user" ? styles.userBubbleMsg : styles.aiBubbleMsg,
            ]}
          >
            <View style={styles.messageHeader}>
              <FontAwesome
                name={message.sender === "user" ? "user" : "robot"}
                size={14}
                color="#333"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.senderName}>Hindwana</Text>
            </View>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
        {loading && (
          <View style={styles.aiBubbleMsg}>
            <Text style={styles.messageText}>Thinking...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend} disabled={loading}>
          <FontAwesome name="send" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Ai;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "#2563eb",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  userBubble: {
    backgroundColor: "#10b981",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  userText: {
    color: "white",
    fontSize: 12,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  messageBubble: {
    marginVertical: 6,
    padding: 10,
    borderRadius: 12,
    maxWidth: "80%",
  },
  userBubbleMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#3b82f6",
  },
  aiBubbleMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#e5e7eb",
  },
  messageText: {
    color: "#111827",
  },
  messageHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  senderName: {
    fontSize: 10,
    fontWeight: "500",
    color: "#4b5563",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 30,
    marginBottom: 100,
    borderTopWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#f3f4f6",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  sendButton: {
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 25,
  },
});

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
// import {Provider} from "jotai";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useState } from "react";
import { AppContextProvider } from "../context/AppContext";
import { AuthContextProvider } from "../context/AuthProvider";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [queryClient] = useState(() => new QueryClient());

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <AppContextProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{headerShown: false}} />
              <Stack.Screen name="cart" options={{title: "Cart"}} />
              <Stack.Screen name="faq" options={{title: "Faq", animation: "none"}} />
              <Stack.Screen name="order" options={{title: "Your Orders", animation: "none"}} />
              <Stack.Screen
                name="SearchPage"
                options={{title: "Search Hindwana", animation: "none"}}
              />
              <Stack.Screen name="ai" options={{title: "Hindwana Ai", animation: "none"}} />
              <Stack.Screen
                name="travelorder"
                options={{title: "travel order", animation: "none"}}
              />
              <Stack.Screen
                name="updateaccount"
                options={{title: "Update Account", animation: "none"}}
              />
              <Stack.Screen
                name="category/[title]"
                options={{title: "Category", animation: "none"}}
              />
              <Stack.Screen name="product/[id]" options={{title: "Product", animation: "none"}} />
              <Stack.Screen name="checkout" options={{title: "checkout", animation: "none"}} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </AppContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ModalHeaderText from "@/components/ModalHeaderText";
import Colors from "@/constants/Colors";

const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY =
  "pk_test_ZGFzaGluZy1nYXJmaXNoLTIxLmNsZXJrLmFjY291bnRzLmRldiQ";
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    outfitL: require("../assets/fonts/Outfit-Light.ttf"),
    outfitM: require("../assets/fonts/Outfit-Medium.ttf"),
    outfitSB: require("../assets/fonts/Outfit-SemiBold.ttf"),
    outfitB: require("../assets/fonts/Outfit-Bold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  // Method to trasition if user is logged in or not
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/(modals)/login");
    }
  }, [isLoaded]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/login"
        options={{
          title: "Sign In or Sign Up",
          headerTitleStyle: {
            fontFamily: "outfitSB",
          },
          presentation: "modal",
          // Pop from the screen button
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="listing/[id]"
        options={{ headerTitle: "", headerTransparent: true }}
      />
      <Stack.Screen
        name="(modals)/booking"
        options={{
          // presentation: "transparentModal",
          animation: "fade",
          headerTransparent: true,
          headerTitle: () => <ModalHeaderText />,
          // headerLeft: () => (
          //   <TouchableOpacity
          //     onPress={() => router.back()}
          //     style={{
          //       backgroundColor: Colors.white,
          //       borderColor: Colors.grey,
          //       borderRadius: 18,
          //       borderWidth: 1,
          //       padding: 4,
          //     }}
          //   >
          //     <Ionicons name="close-outline" size={22} />
          //   </TouchableOpacity>
          // ),
        }}
      />
    </Stack>
  );
}

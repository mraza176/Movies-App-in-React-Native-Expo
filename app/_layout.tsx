import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack screenOptions={{ animation: "slide_from_right" }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="movie/[movieid]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="search/[query]"
              options={{ headerShown: false }}
            />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}

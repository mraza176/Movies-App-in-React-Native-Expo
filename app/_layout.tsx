import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ animation: "slide_from_right" }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="movie/[movieid]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

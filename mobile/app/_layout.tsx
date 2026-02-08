import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { PortalHost } from "@rn-primitives/portal";
import "../global.css";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
    primary: "#1E90FF",
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={theme}>
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }} />
      <PortalHost />
    </ThemeProvider>
  );
}

import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider, useTheme } from "./ThemeContext";
import { palette } from "./theme";


import HomeScreen from "./screens/Home";
import QuizScreen from "./screens/Quiz";
import CareerResultsScreen from "./screens/CareerResults";
import JobPrepHubScreen from "./screens/JobPrep";
import Roadmap from "./screens/Roadmap";


import LoginScreen from "./screens/Login";
import ProfileScreen from "./screens/profileScreen";
import SettingsScreen from "./screens/settingsScreen";
import MentorshipScreen from "./screens/mentor";
import ExploreScreen from "./screens/Explore";

const Stack = createNativeStackNavigator();

// Maps the lowercase route keys the older screens call internally
// (e.g. navigate("settings")) to the PascalCase route names registered
// below (e.g. "Settings"), so both naming styles can coexist.
const ROUTE_MAP = {
  profile: "Profile",
  settings: "Settings",
  mentorship: "Mentorship",
  prep: "JobPrep",
  results: "CareerResults",
  roadmap: "Roadmap",
  login: "Login",
  home: "Home",
};
const mapRoute = (key) => ROUTE_MAP[key] || key;

function LoginScreenAdapter({ navigation }) {
  return (
    <LoginScreen
      onLogin={() => navigation.reset({ index: 0, routes: [{ name: "Home" }] })}
    />
  );
}

// Old screens' "back" buttons call navigate("profile") unconditionally.
// That's correct when they were pushed on top of Profile, but Mentor (and
// potentially others) can now be reached from Home too — pushing a new
// Profile screen instead of actually going back would leave stale screens
// stacked behind the user. This prefers a real goBack() when there's
// somewhere to go back to, and only falls back to a fresh Profile push
// when there isn't (e.g. deep-linking straight into the screen).
function goBackOrToProfile(navigation) {
  if (navigation.canGoBack()) {
    navigation.goBack();
  } else {
    navigation.navigate("Profile");
  }
}

function ProfileScreenAdapter({ navigation }) {
  return <ProfileScreen navigate={(key) => navigation.navigate(mapRoute(key))} />;
}

function SettingsScreenAdapter({ navigation }) {
  return (
    <SettingsScreen
      navigate={(key) =>
        key === "profile" ? goBackOrToProfile(navigation) : navigation.navigate(mapRoute(key))
      }
      onLogout={() => navigation.reset({ index: 0, routes: [{ name: "Login" }] })}
    />
  );
}

function MentorshipScreenAdapter({ navigation }) {
  return (
    <MentorshipScreen
      navigate={(key) =>
        key === "profile" ? goBackOrToProfile(navigation) : navigation.navigate(mapRoute(key))
      }
    />
  );
}

// Explore is reached three ways: the bottom-nav "Explore" tab (no
// params, defaults to the Skills tab inside Explore.js), and the
// "Salary Guide" / "Certifications" quick actions on Home, which pass
// an initialTab param through untouched.
function ExploreScreenAdapter({ navigation, route }) {
  return <ExploreScreen navigation={navigation} route={route} />;
}

function RootStack() {
  const { dark } = useTheme();

  // Matches the Figma design's persistent background: a deep teal
  // radial/linear gradient in dark mode, a near-white wash with
  // faint teal accent orbs in light mode.
  return (
    <LinearGradient
      colors={
        dark
          ? [palette.tealDeep, palette.teal, palette.tealMid, palette.tealDark]
          : [palette.lightBg, palette.lightBg]
      }
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.background}
    >
      {dark ? (
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          <View style={[styles.orb, { top: -60, right: -40, width: 300, height: 300, backgroundColor: "rgba(77,212,206,0.18)" }]} />
          <View style={[styles.orb, { bottom: 80, left: -60, width: 260, height: 260, backgroundColor: "rgba(26,158,153,0.14)" }]} />
        </View>
      ) : (
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          <View style={[styles.orb, { top: -80, right: -60, width: 340, height: 340, backgroundColor: "rgba(13,84,81,0.07)" }]} />
          <View style={[styles.orb, { bottom: 60, left: -80, width: 300, height: 300, backgroundColor: "rgba(13,84,81,0.05)" }]} />
        </View>
      )}
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreenAdapter} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreenAdapter} />
        <Stack.Screen name="Settings" component={SettingsScreenAdapter} />
        <Stack.Screen name="Mentorship" component={MentorshipScreenAdapter} />
        <Stack.Screen name="JobPrep" component={JobPrepHubScreen} />
        <Stack.Screen name="CareerResults" component={CareerResultsScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Roadmap" component={Roadmap} />
        <Stack.Screen name="Explore" component={ExploreScreenAdapter} />
      </Stack.Navigator>
    </LinearGradient>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  orb: { position: "absolute", borderRadius: 999 },
});
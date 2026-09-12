import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [fullName, setFullName] = useState("");
  const insets = useSafeAreaInsets();

  const valid = email.length > 3 && password.length > 4;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
      {/* Logo */}
      <View style={styles.logoSection}>
        <View style={styles.logoRow}>
          <View style={styles.logoBadge}>
            <BlurView intensity={20} tint="light" style={StyleSheet.absoluteFill} />
            <Text style={styles.logoBadgeText}>TC</Text>
          </View>
          <View>
            <Text style={styles.brandName}>Tech Career</Text>
            <Text style={styles.brandSub}>Explorer</Text>
          </View>
        </View>

        <Text style={styles.heading}>{isSignup ? "Create your\naccount" : "Welcome\nback"}</Text>
        <Text style={styles.subheading}>
          {isSignup
            ? "Start mapping your tech career path today."
            : "Your career journey continues here."}
        </Text>
      </View>

      {/* Glass form card */}
      <View style={styles.formSection}>
        <View style={styles.formCard}>
          <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />

          {isSignup && (
            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Full Name</Text>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Thabo Molefe"
                placeholderTextColor="rgba(255,255,255,0.5)"
                style={styles.input}
              />
            </View>
          )}

          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@university.ac.za"
              placeholderTextColor="rgba(255,255,255,0.5)"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <View style={[styles.fieldWrap, { marginBottom: isSignup ? 20 : 8 }]}>
            <Text style={styles.fieldLabel}>Password</Text>
            <View style={{ position: "relative", justifyContent: "center" }}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="rgba(255,255,255,0.5)"
                secureTextEntry={!showPass}
                autoCapitalize="none"
                style={[styles.input, { paddingRight: 56 }]}
              />
              <TouchableOpacity
                onPress={() => setShowPass(!showPass)}
                style={styles.showButton}
              >
                <Text style={styles.showButtonText}>{showPass ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {!isSignup && (
            <TouchableOpacity style={styles.forgotWrap}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              if (isSignup) {
                // Account created — send the user back to the sign-in form.
                setIsSignup(false);
                setPassword("");
              } else {
                onLogin();
              }
            }}
            disabled={!valid}
            style={[styles.primaryButton, valid ? styles.primaryButtonActive : styles.primaryButtonDisabled]}
          >
            <Text style={[styles.primaryButtonText, valid ? styles.primaryButtonTextActive : styles.primaryButtonTextDisabled]}>
              {isSignup ? "Create Account" : "Sign In"}
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity onPress={onLogin} style={styles.googleButton}>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>
              {isSignup ? "Already have an account? " : "Don't have an account? "}
            </Text>
            <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
              <Text style={styles.switchLink}>{isSignup ? "Sign In" : "Sign Up"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  logoSection: { paddingHorizontal: 32, paddingTop: 24 },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 44 },
  logoBadge: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logoBadgeText: { fontWeight: "800", fontSize: 14, color: "#fff" },
  brandName: { fontWeight: "800", fontSize: 16, color: "#fff" },
  brandSub: {
    fontWeight: "600",
    fontSize: 11,
    color: "#fff",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  heading: {
    fontSize: 36,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 10,
    lineHeight: 42,
  },
  subheading: { fontSize: 15, color: "#fff" },
  formSection: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 24,
  },
  formCard: {
    width: "100%",
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  fieldWrap: { marginBottom: 16 },
  fieldLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.25)",
    backgroundColor: "rgba(255,255,255,0.1)",
    fontSize: 15,
    color: "#fff",
  },
  showButton: {
    position: "absolute",
    right: 14,
  },
  showButtonText: { color: "#fff", fontSize: 13 },
  forgotWrap: { alignItems: "flex-end", marginBottom: 20 },
  forgotText: { color: "#fff", fontSize: 13 },
  primaryButton: {
    width: "100%",
    paddingVertical: 17,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  primaryButtonActive: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  primaryButtonDisabled: { backgroundColor: "rgba(255,255,255,0.3)" },
  primaryButtonText: { fontSize: 17, fontWeight: "800" },
  primaryButtonTextActive: { color: "#0d5451" },
  primaryButtonTextDisabled: { color: "#fff" },
  dividerRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.2)" },
  dividerText: { fontSize: 12, color: "#fff" },
  googleButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    marginBottom: 20,
  },
  googleButtonText: { color: "#fff", fontSize: 15, fontWeight: "600" },
  switchRow: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap" },
  switchText: { fontSize: 14, color: "#fff" },
  switchLink: { fontSize: 14, fontWeight: "700", color: "#fff" },
});
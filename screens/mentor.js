import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCardTheme } from "../theme";

const mentors = [
  {
    name: "Sipho Dlamini",
    role: "Senior Backend Engineer",
    company: "Takealot",
    location: "Cape Town",
    tags: ["Python", "Microservices", "AWS"],
    bio: "8 years in backend engineering. Passionate about helping new grads navigate the industry.",
    available: true,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
  },
  {
    name: "Amahle Nkosi",
    role: "DevOps Lead",
    company: "Standard Bank",
    location: "Johannesburg",
    tags: ["Kubernetes", "CI/CD", "Terraform"],
    bio: "Led DevOps transformation at multiple SA fintechs. Loves mentoring women in tech.",
    available: true,
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&auto=format",
  },
  {
    name: "Lethabo Mokoena",
    role: "Cloud Architect",
    company: "Vodacom",
    location: "Midrand",
    tags: ["Azure", "Cloud Strategy", "Security"],
    bio: "Certified Azure Solutions Architect. Helping SA students break into cloud roles.",
    available: false,
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format",
  },
  {
    name: "Kefilwe Tau",
    role: "Data Engineer",
    company: "Discovery",
    location: "Sandton",
    tags: ["Spark", "dbt", "Snowflake"],
    bio: "5 years building data pipelines. Bridging the gap for CS graduates into data.",
    available: true,
    img: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=80&h=80&fit=crop&auto=format",
  },
  {
    name: "Ruan van der Berg",
    role: "Frontend Tech Lead",
    company: "Synthesis",
    location: "Cape Town",
    tags: ["React", "TypeScript", "Performance"],
    bio: "Building fast React apps for 7 years. Passionate about clean code and mentoring juniors.",
    available: true,
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&auto=format",
  },
];

export default function MentorshipScreen({ navigate }) {
  const [requested, setRequested] = useState(new Set());
  const { G, border, text, subtext } = useCardTheme();
  const insets = useSafeAreaInsets();

  const toggleRequest = (mentor) => {
    if (!mentor.available) return;
    setRequested((prev) => {
      const next = new Set(prev);
      if (next.has(mentor.name)) {
        next.delete(mentor.name);
      } else {
        next.add(mentor.name);
      }
      return next;
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.headerWrap, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => navigate("profile")} style={styles.backButton}>
          <BlurView intensity={30} tint="light" style={StyleSheet.absoluteFill} />
          <Svg width={18} height={14} viewBox="0 0 18 14" fill="none">
            <Path
              d="M17 7H1M1 7L7 1M1 7L7 13"
              stroke="#fff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.eyebrow}>Learn from those who've been there</Text>
        <Text style={styles.title}>Find a Mentor</Text>
        <Text style={styles.subtitle}>
          {mentors.filter((m) => m.available).length} mentors available now
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {mentors.map((mentor) => {
          const isReq = requested.has(mentor.name);
          return (
            <View
              key={mentor.name}
              style={[styles.card, { backgroundColor: G }, border]}
            >
              <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />

              <View style={styles.headerRow}>
                <View style={styles.avatarWrap}>
                  <Image source={{ uri: mentor.img }} style={styles.avatar} />
                  {mentor.available && <View style={styles.availableDot} />}
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={[styles.name, { color: text }]}>{mentor.name}</Text>
                  <Text style={[styles.roleText, { color: subtext }]}>
                    {mentor.role} · {mentor.company}
                  </Text>
                  <Text style={styles.locationText}>{mentor.location}</Text>
                </View>

                <View
                  style={[
                    styles.availabilityBadge,
                    { backgroundColor: mentor.available ? "#f0fdf4" : "#f1f5f9" },
                  ]}
                >
                  <Text
                    style={[
                      styles.availabilityBadgeText,
                      { color: mentor.available ? "#16a34a" : "#94a3b8" },
                    ]}
                  >
                    {mentor.available ? "Available" : "Busy"}
                  </Text>
                </View>
              </View>

              <Text style={[styles.bio, { color: subtext }]}>{mentor.bio}</Text>

              <View style={styles.tagsRow}>
                {mentor.tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                onPress={() => toggleRequest(mentor)}
                disabled={!mentor.available}
                style={[
                  styles.requestButton,
                  isReq && styles.requestButtonSent,
                  !mentor.available && styles.requestButtonDisabled,
                ]}
              >
                <Text
                  style={[
                    styles.requestButtonText,
                    isReq && styles.requestButtonTextSent,
                    !mentor.available && styles.requestButtonTextDisabled,
                  ]}
                >
                  {isReq
                    ? "Request Sent"
                    : mentor.available
                    ? "Request Mentorship"
                    : "Currently Unavailable"}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerWrap: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 14,
  },
  eyebrow: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.55)",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  card: {
    borderRadius: 18,
    padding: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    marginBottom: 10,
  },
  avatarWrap: {
    position: "relative",
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: "#edfafa",
  },
  availableDot: {
    position: "absolute",
    bottom: -3,
    right: -3,
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "#16a34a",
    borderWidth: 2.5,
    borderColor: "#fff",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  roleText: {
    fontSize: 12,
    marginTop: 2,
  },
  locationText: {
    fontSize: 11,
    color: "#94a3b8",
    marginTop: 1,
  },
  availabilityBadge: {
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 20,
  },
  availabilityBadgeText: {
    fontSize: 10,
    fontWeight: "700",
  },
  bio: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 10,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: "rgba(13,84,81,0.1)",
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 20,
  },
  tagText: {
    color: "#0d5451",
    fontSize: 11,
    fontWeight: "600",
  },
  requestButton: {
    width: "100%",
    paddingVertical: 13,
    borderRadius: 12,
    backgroundColor: "#0d5451",
    alignItems: "center",
  },
  requestButtonSent: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderWidth: 2,
    borderColor: "#0d5451",
  },
  requestButtonDisabled: {
    backgroundColor: "#e2e8f0",
  },
  requestButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
  requestButtonTextSent: {
    color: "#0d5451",
  },
  requestButtonTextDisabled: {
    color: "#94a3b8",
  },
});
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";
import { BlurView } from "expo-blur";
import { useCardTheme } from "../theme";

const stats = [
  { label: "Quiz", value: "Done", sub: "Matched" },
  { label: "Roadmap", value: "29%", sub: "2 of 7" },
  { label: "Mentors", value: "1", sub: "Requested" },
];

const savedCareers = [
  { title: "Backend Developer", match: 87 },
  { title: "DevOps Engineer", match: 74 },
  { title: "Data Engineer", match: 68 },
];

const recentActivity = [
  { text: "Completed Interest Quiz", time: "Today" },
  { text: "Viewed Backend Developer roadmap", time: "Today" },
  { text: "Requested mentorship from Sipho Dlamini", time: "Today" },
  { text: "Bookmarked AWS cert", time: "Yesterday" },
];

const quickActions = [
  { label: "My Roadmap", screen: "roadmap" },
  { label: "Find a Mentor", screen: "mentorship" },
  { label: "Prep Hub", screen: "prep" },
  { label: "Settings", screen: "settings" },
];

function initials(title) {
  return title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

function SettingsGearIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={3} stroke="#fff" strokeWidth={2} />
      <Path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
        stroke="#fff"
        strokeWidth={2}
      />
    </Svg>
  );
}

export default function ProfileScreen({ navigate }) {
  const { G, border, text } = useCardTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.headerWrap, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>TM</Text>
            </View>
            <View>
              <Text style={styles.name}>Thabo Molefe</Text>
              <Text style={styles.subLine}>BSc Computer Science · Year 3</Text>
              <Text style={styles.subLine2}>University of Johannesburg</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigate("settings")} style={styles.settingsButton}>
            <BlurView intensity={30} tint="light" style={StyleSheet.absoluteFill} />
            <SettingsGearIcon />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats */}
        <View style={[styles.statsCard, { backgroundColor: G }, border]}>
          <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
          {stats.map((s, i) => (
            <View key={i} style={styles.statCell}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
              <Text style={styles.statSub}>{s.sub}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Saved Matches</Text>
        <View style={{ gap: 8, marginBottom: 20 }}>
          {savedCareers.map((c, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => navigate("results")}
              style={[styles.careerRow, { backgroundColor: G }, border]}
            >
              <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
              <View style={styles.careerIcon}>
                <Text style={styles.careerIconText}>{initials(c.title)}</Text>
              </View>
              <Text style={[styles.careerTitle, { color: text }]}>{c.title}</Text>
              <View style={styles.matchBadge}>
                <Text style={styles.matchBadgeText}>{c.match}%</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((a) => (
            <TouchableOpacity
              key={a.label}
              onPress={() => navigate(a.screen)}
              style={[styles.quickAction, { backgroundColor: G }, border]}
            >
              <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
              <Text style={[styles.quickActionText, { color: text }]}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={{ gap: 8 }}>
          {recentActivity.map((a, i) => (
            <View key={i} style={[styles.activityRow, { backgroundColor: G }, border]}>
              <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
              <View style={styles.activityDot} />
              <Text style={[styles.activityText, { color: text }]}>{a.text}</Text>
              <Text style={styles.activityTime}>{a.time}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerWrap: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flexShrink: 1,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#1a9e99", // flat fallback for the web's gradient
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
  },
  name: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
  },
  subLine: {
    fontSize: 12,
    color: "rgba(255,255,255,0.65)",
    marginTop: 3,
  },
  subLine2: {
    fontSize: 11,
    color: "rgba(255,255,255,0.45)",
    marginTop: 2,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  statsCard: {
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 8,
    flexDirection: "row",
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  statCell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0d5451",
  },
  statLabel: {
    fontSize: 10,
    color: "#64748b",
    fontWeight: "600",
    marginTop: 2,
  },
  statSub: {
    fontSize: 10,
    color: "#94a3b8",
    marginTop: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
  },
  careerRow: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  careerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(13,84,81,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  careerIconText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0d5451",
  },
  careerTitle: {
    fontSize: 15,
    fontWeight: "700",
    flex: 1,
  },
  matchBadge: {
    backgroundColor: "rgba(13,84,81,0.12)",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  matchBadgeText: {
    color: "#0d5451",
    fontSize: 13,
    fontWeight: "800",
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  quickAction: {
    width: "48%",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: "700",
  },
  activityRow: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4dd4ce",
  },
  activityText: {
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
  },
  activityTime: {
    fontSize: 11,
    color: "#94a3b8",
  },
});
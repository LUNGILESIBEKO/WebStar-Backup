import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles } from 'lucide-react-native';
import { useTheme } from '../ThemeContext';

const COLORS = {
  tealDark: '#042F2E',
  tealMid: '#0d5451',
  tealLight: '#0F766E',
  white: '#FFFFFF',
  black: '#000000',
  mint: '#E6F4F1',
  textMuted: 'rgba(255,255,255,0.7)',
};

const DEFAULT_MATCHES = [
  { title: 'Backend Developer', percent: 87 },
  { title: 'DevOps Engineer', percent: 74 },
  { title: 'Data Engineer', percent: 68 },
  { title: 'Frontend Developer', percent: 55 },
];

export default function CareerResultsScreen({ navigation, route }) {
  const matches = route?.params?.matches || DEFAULT_MATCHES;
  const topMatch = route?.params?.topMatch || matches[0];
  const { dark } = useTheme();

  const scrollBg = dark ? '#0f172a' : '#F8FAFA';
  const cardBg = dark ? 'rgba(30,41,59,0.9)' : COLORS.white;
  const cardText = dark ? '#e2e8f0' : COLORS.black;
  const cardTextMuted = dark ? '#94a3b8' : '#6B7280';
  const sectionTitleColor = dark ? '#94a3b8' : '#6B7280';
  const trackBg = dark ? 'rgba(255,255,255,0.1)' : '#EEF2F1';
  const secondaryBg = dark ? 'rgba(255,255,255,0.1)' : '#F0F3F2';

  const safeNavigate = (screenName, params) => {
    if (!navigation) {
      Alert.alert(screenName, 'Navigation is not connected in this preview.');
      return;
    }
    const knownRoutes = navigation.getState()?.routeNames || [];
    if (knownRoutes.includes(screenName)) {
      navigation.navigate(screenName, params);
    } else {
      Alert.alert('Coming soon', `The ${screenName} screen isn't wired up yet.`);
    }
  };

  const goHome = () => safeNavigate('Home', { quizDone: true, topMatch, matches });
  const goRetake = () => safeNavigate('Quiz');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.tealDark} />
      <LinearGradient
        colors={[COLORS.tealDark, COLORS.tealLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Your Career Matches</Text>
        <Text style={styles.headerSubtitle}>
          Based on your quiz answers, here's how you stack up
        </Text>
      </LinearGradient>

      <ScrollView
        style={[styles.scroll, { backgroundColor: scrollBg }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.topCard, { backgroundColor: cardBg }]}>
          <View style={styles.topIconCircle}>
            <Sparkles size={20} color={COLORS.tealMid} />
          </View>
          <Text style={styles.topLabel}>TOP MATCH</Text>
          <Text style={[styles.topTitle, { color: cardText }]}>{topMatch.title}</Text>
          <Text style={[styles.topPercent, { color: cardTextMuted }]}>{topMatch.percent}% compatibility</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: sectionTitleColor }]}>ALL MATCHES</Text>
        {matches.map((match) => (
          <View key={match.title} style={[styles.matchRow, { backgroundColor: cardBg }]}>
            <View style={styles.matchRowTop}>
              <Text style={[styles.matchRowTitle, { color: cardText }]}>{match.title}</Text>
              <Text style={styles.matchRowPercent}>{match.percent}%</Text>
            </View>
            <View style={[styles.barTrack, { backgroundColor: trackBg }]}>
              <View
                style={[styles.barFill, { width: `${match.percent}%` }]}
              />
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={goHome}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>Back to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, { backgroundColor: secondaryBg }]}
          onPress={goRetake}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryButtonText}>Retake Quiz</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.tealDark,
  },
  header: {
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#F8FAFA',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
  topCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  topIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.mint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  topLabel: {
    color: COLORS.tealMid,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  topTitle: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  topPercent: {
    color: '#6B7280',
    fontSize: 13,
  },
  sectionTitle: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  matchRow: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  matchRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  matchRowTitle: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: '700',
  },
  matchRowPercent: {
    color: COLORS.tealMid,
    fontSize: 14,
    fontWeight: '700',
  },
  barTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EEF2F1',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: COLORS.tealMid,
  },
  primaryButton: {
    backgroundColor: COLORS.tealMid,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 12,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryButton: {
    backgroundColor: '#F0F3F2',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 12,
  },
  secondaryButtonText: {
    color: COLORS.tealMid,
    fontWeight: '700',
    fontSize: 15,
  },
});

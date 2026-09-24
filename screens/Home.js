import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../ThemeContext';
import {
  FileText,
  DollarSign,
  Award,
  Users,
  Sparkles,
  TrendingUp,
  Lightbulb,
  Home as HomeIcon,
  Compass,
  Map,
  User,
} from 'lucide-react-native';

const COLORS = {
  tealDark: '#042F2E',
  tealDarker: '#021917',
  tealMid: '#0d5451',
  tealLight: '#0F766E',
  white: '#FFFFFF',
  black: '#000000',
  mint: '#E6F4F1',
  textMuted: 'rgba(255,255,255,0.7)',
};

const QUICK_ACTIONS = [
  { key: 'JobPrep', title: 'Job Prep Hub', subtitle: 'CV tips and interview prep', icon: FileText, route: 'JobPrep' },
  // Salary Guide and Certifications both open the Explore screen, just
  // jumped to a different one of its internal tabs via route params.
  { key: 'SalaryGuide', title: 'Salary Guide', subtitle: 'SA market rates 2025', icon: DollarSign, route: 'Explore', params: { initialTab: 'Jobs' } },
  { key: 'Certifications', title: 'Certifications', subtitle: 'Boost your credentials', icon: Award, route: 'Explore', params: { initialTab: 'Certs' } },
  { key: 'Mentorship', title: 'Find a Mentor', subtitle: 'Connect with SA pros', icon: Users, route: 'Mentorship' },
];

const INSIGHTS = [
  {
    key: 'trending',
    tag: 'TRENDING',
    text: 'AWS skills required for 68% of SA cloud roles in 2025 — OfferZen report',
    icon: TrendingUp,
  },
  {
    key: 'salary',
    tag: 'SALARY',
    text: 'Backend devs earning avg R650k/yr in Johannesburg and Cape Town',
    icon: DollarSign,
  },
  {
    key: 'tip',
    tag: 'TIP',
    text: "GitHub profile strength is the #1 factor in SA junior dev hiring",
    icon: Lightbulb,
  },
];

const TABS = [
  { key: 'Home', label: 'Home', icon: HomeIcon },
  { key: 'Explore', label: 'Explore', icon: Compass },
  { key: 'Roadmap', label: 'Roadmap', icon: Map },
  { key: 'Profile', label: 'Profile', icon: User },
];

export default function HomeScreen({ navigation, route }) {
  // quizDone / topMatch normally live in a shared context (the way App.tsx
  // handled it on web) so Home reflects whatever the Quiz screen produced.
  // Here, Quiz sends the result back as navigation params when it finishes,
  // and this effect picks it up and flips the card into its matched state.
  const [quizDone, setQuizDone] = useState(false);
  const [topMatch, setTopMatch] = useState({ title: 'Backend Developer', percent: 87 });
  const [matches, setMatches] = useState([
    { title: 'Backend Developer', percent: 87 },
    { title: 'DevOps Engineer', percent: 74 },
    { title: 'Data Engineer', percent: 68 },
    { title: 'Frontend Developer', percent: 55 },
  ]);

  useEffect(() => {
    if (route?.params?.quizDone) {
      setQuizDone(true);
      if (route.params.topMatch) {
        setTopMatch(route.params.topMatch);
      }
      if (route.params.matches) {
        setMatches(route.params.matches);
      }
    }
  }, [route?.params]);

  const student = {
    name: 'Lerato Mokoena',
    initials: 'LM',
    year: '3rd Year CS',
    university: 'University of Pretoria',
    skillsTracked: 12,
    roadmapStep: 2,
    roadmapTotal: 7,
  };

  // Every button on this screen calls safeNavigate so it's always clickable
  // and gives feedback - it navigates if a teammate has registered that
  // screen in the navigator, or shows a "coming soon" alert if they haven't
  // yet, instead of crashing on an unknown route.
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

  const goToQuiz = () => safeNavigate('Quiz');
  const goToProfile = () => safeNavigate('Profile');
  const goToResults = () => safeNavigate('CareerResults', { matches });

  const insets = useSafeAreaInsets();
  const { dark } = useTheme();

  // "White card" surfaces and their text need a dark variant — the gradient
  // background and tab bar are already dark teal, so those stay as-is.
  const cardBg = dark ? 'rgba(30,41,59,0.94)' : 'rgba(255,255,255,0.96)';
  const cardBgAlt = dark ? 'rgba(30,41,59,0.9)' : 'rgba(255,255,255,0.94)';
  const cardText = dark ? '#e2e8f0' : COLORS.black;
  const cardTextMuted = dark ? '#94a3b8' : '#6B7280';
  const retakeBg = dark ? 'rgba(255,255,255,0.1)' : '#F0F3F2';

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.tealDark} />
      <View style={styles.flexArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[COLORS.tealDark, COLORS.tealLight, COLORS.tealMid, COLORS.tealDarker]}
          locations={[0, 0.22, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.pageGradient}
        >
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <View>
              <Text style={styles.greeting}>Good morning</Text>
              <Text style={styles.name}>{student.name}</Text>
              <Text style={styles.subline}>
                {student.year} · {student.university}
              </Text>
            </View>
            <TouchableOpacity style={styles.avatar} onPress={goToProfile}>
              <Text style={styles.avatarText}>{student.initials}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statTile}>
              <Text style={styles.statValue}>
                {quizDone ? `${topMatch.percent}%` : '—'}
              </Text>
              <Text style={styles.statLabel}>Top Match</Text>
            </View>
            <View style={styles.statTile}>
              <Text style={styles.statValue}>{student.skillsTracked}</Text>
              <Text style={styles.statLabel}>Skills tracked</Text>
            </View>
            <View style={styles.statTile}>
              <Text style={styles.statValue}>
                {student.roadmapStep}/{student.roadmapTotal}
              </Text>
              <Text style={styles.statLabel}>Roadmap steps</Text>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          {!quizDone ? (
            <View style={[styles.matchCard, { backgroundColor: cardBg }]}>
              <View style={styles.matchIconCircle}>
                <Sparkles size={20} color={COLORS.tealMid} />
              </View>
              <Text style={[styles.matchTitle, { color: cardText }]}>Find Your Career Match</Text>
              <Text style={[styles.matchMeta, { color: cardTextMuted }]}>5 questions · about 2 minutes</Text>
              <Text style={[styles.matchBody, { color: cardText }]}>
                Take the quiz and discover which tech career path is built for you.
              </Text>
              <TouchableOpacity onPress={goToQuiz} activeOpacity={0.85}>
                <LinearGradient
                  colors={[COLORS.tealMid, COLORS.tealLight]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.ctaButton}
                >
                  <Text style={styles.ctaButtonText}>Start Career Quiz</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.matchCard, { backgroundColor: cardBg }]}>
              <Text style={styles.topMatchLabel}>TOP MATCH</Text>
              <View style={styles.matchedRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.matchTitle, { color: cardText }]}>{topMatch.title}</Text>
                  <Text style={[styles.matchMeta, { color: cardTextMuted }]}>
                    {topMatch.percent}% compatibility match
                  </Text>
                </View>
                <View style={styles.matchIconCircle}>
                  <Sparkles size={20} color={COLORS.tealMid} />
                </View>
              </View>
              <View style={styles.matchedButtonsRow}>
                <TouchableOpacity
                  style={styles.allMatchesButton}
                  onPress={goToResults}
                  activeOpacity={0.85}
                >
                  <Text style={styles.allMatchesButtonText}>All Matches</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.retakeButton, { backgroundColor: retakeBg }]}
                  onPress={goToQuiz}
                  activeOpacity={0.85}
                >
                  <Text style={styles.retakeButtonText}>Retake Quiz</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
          <View style={styles.quickGrid}>
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <TouchableOpacity
                  key={action.key}
                  style={[styles.quickCard, { backgroundColor: cardBgAlt }]}
                  activeOpacity={0.85}
                  onPress={() => safeNavigate(action.route, action.params)}
                >
                  <View style={styles.quickIconBox}>
                    <Icon size={18} color={COLORS.tealMid} />
                  </View>
                  <Text style={[styles.quickTitle, { color: cardText }]}>{action.title}</Text>
                  <Text style={[styles.quickSubtitle, { color: cardTextMuted }]}>{action.subtitle}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={[styles.sectionTitle, styles.insightsTitle]}>SA TECH INSIGHTS</Text>
          {INSIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <View key={item.key} style={[styles.insightCard, { backgroundColor: cardBgAlt }]}>
                <View style={styles.insightTagPill}>
                  <Text style={styles.insightTagText}>{item.tag}</Text>
                </View>
                <View style={styles.insightRow}>
                  <View style={styles.insightIconBox}>
                    <Icon size={16} color={COLORS.tealMid} />
                  </View>
                  <Text style={[styles.insightText, { color: cardText }]}>{item.text}</Text>
                </View>
              </View>
            );
          })}
        </View>
        </LinearGradient>
      </ScrollView>

      <View style={styles.tabBar}>
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.key === 'Home';
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              activeOpacity={0.7}
              onPress={() => safeNavigate(tab.key)}
            >
              <Icon
                size={20}
                color={isActive ? COLORS.white : COLORS.textMuted}
              />
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
              {isActive && <View style={styles.tabDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.tealDark,
  },
  flexArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    backgroundColor: COLORS.tealDark,
  },
  scrollContent: {
    flexGrow: 1,
  },
  pageGradient: {
    flex: 1,
    paddingBottom: 32,
  },
  header: {
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greeting: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginBottom: 4,
  },
  name: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  subline: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statTile: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 14,
    paddingVertical: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statValue: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    textAlign: 'center',
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  matchCard: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  matchIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.mint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  topMatchLabel: {
    color: COLORS.tealMid,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  matchedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  matchTitle: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  matchMeta: {
    color: '#6B7280',
    fontSize: 13,
    marginBottom: 10,
  },
  matchBody: {
    color: COLORS.black,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  ctaButton: {
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 15,
  },
  matchedButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  allMatchesButton: {
    flex: 1,
    backgroundColor: COLORS.tealMid,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  allMatchesButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },
  retakeButton: {
    flex: 1,
    backgroundColor: '#F0F3F2',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  retakeButtonText: {
    color: COLORS.tealMid,
    fontWeight: '700',
    fontSize: 14,
  },
  sectionTitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickCard: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  quickIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: COLORS.mint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  quickTitle: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  quickSubtitle: {
    color: '#6B7280',
    fontSize: 11,
  },
  insightsTitle: {
    marginTop: 4,
  },
  insightCard: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  insightTagPill: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.mint,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 10,
  },
  insightTagText: {
    color: COLORS.tealMid,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  insightIconBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.mint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  insightText: {
    flex: 1,
    color: COLORS.black,
    fontSize: 13.5,
    lineHeight: 19,
    fontWeight: '500',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.tealDark,
    paddingTop: 10,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: COLORS.white,
    fontWeight: '700',
  },
  tabDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.white,
    marginTop: 2,
  },
});
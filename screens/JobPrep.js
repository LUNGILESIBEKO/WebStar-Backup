import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from '../ThemeContext';

const COLORS = {
  tealDark: '#042F2E',
  tealDarker: '#021917',
  tealMid: '#0d5451',
  tealLight: '#0F766E',
  white: '#FFFFFF',
  black: '#000000',
  textMuted: 'rgba(255,255,255,0.7)',
};

const TABS = [
  { key: 'cv', label: 'CV Tips' },
  { key: 'interview', label: 'Interview' },
  { key: 'jobsearch', label: 'Job Search' },
];

const TIPS = {
  cv: [
    {
      title: 'Lead with impact, not duties',
      body: "Write 'Built REST API serving 50k daily requests, reducing response time by 40%' — not 'Responsible for building APIs'. Quantify everything.",
    },
    {
      title: 'Always include a GitHub link',
      body: 'SA hiring managers check GitHub. Pin your 3 best repos, add READMEs with screenshots, and keep commit history clean.',
    },
    {
      title: 'Tailor your skills section',
      body: "Mirror the exact terminology in the job posting. If they say 'PostgreSQL', don't write 'relational databases'. ATS systems are literal.",
    },
    {
      title: 'One page for under 3 years experience',
      body: "Ruthlessly cut filler. If a bullet doesn't demonstrate a skill or outcome, delete it. White space is your friend.",
    },
    {
      title: 'Add your location and remote preference',
      body: "Specify 'Cape Town — open to remote' so you don't get filtered out of remote-first roles.",
    },
  ],
  interview: [
    {
      title: 'Use the STAR method',
      body: 'Situation, Task, Action, Result. Practice 5 STAR stories covering teamwork, conflict, failure, success, and learning.',
    },
    {
      title: 'Practice coding out loud',
      body: 'SA interviews often include live coding. Narrate your thinking — interviewers care as much about your process as the solution.',
    },
    {
      title: "Research the company's stack",
      body: 'Check LinkedIn, their engineering blog, and job ads. Ask intelligent questions about their architecture and team setup.',
    },
    {
      title: 'Prepare 3 strong questions to ask',
      body: "'What does the first 90 days look like?', 'What is the biggest technical debt you're dealing with?', 'How do you handle code review?'",
    },
    {
      title: 'Know your salary range',
      body: 'Check PayScale ZA, Glassdoor, and OfferZen. Never be the first to give a number — ask what the budget is.',
    },
  ],
  jobsearch: [
    {
      title: "OfferZen is SA's best tech board",
      body: 'Companies apply to you. Create a strong profile and get inbound from SA and international companies hiring now.',
    },
    {
      title: 'Attend tech meetups',
      body: 'Cape Town JS, Johannesburg Python Meetup, PyCon ZA — these communities lead to referrals. Most hires come through networks.',
    },
    {
      title: 'Check LinkedIn properly',
      body: "Turn on 'Open to Work' for recruiters only. Connect with hiring managers and send a personalised 3-line message.",
    },
    {
      title: 'Target scale-ups, not just big corps',
      body: 'Companies like Synthesis, BBD, DVT, and Clickatell hire heavily in SA and offer great mentorship.',
    },
    {
      title: 'Consider remote for international salary',
      body: 'Remote.co, We Work Remotely, and Toptal connect SA devs with USD/EUR salaries. Senior SA devs earn $80k–$150k remotely.',
    },
  ],
};

export default function JobPrepHubScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('cv');
  const insets = useSafeAreaInsets();
  const { dark } = useTheme();

  const cardBg = dark ? 'rgba(30,41,59,0.92)' : 'rgba(255,255,255,0.94)';
  const cardTitleColor = dark ? '#e2e8f0' : COLORS.black;
  const cardBodyColor = dark ? '#94a3b8' : '#4B5563';

  const goBack = () => {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.tealDark} />
      <LinearGradient
        colors={[COLORS.tealDark, COLORS.tealLight, COLORS.tealMid, COLORS.tealDarker]}
        locations={[0, 0.22, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.pageGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack} activeOpacity={0.7}>
            <ChevronLeft size={22} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.eyebrow}>Get hired faster</Text>
          <Text style={styles.title}>Job Prep Hub</Text>

          <View style={styles.tabRow}>
            {TABS.map((tab) => {
              const isActive = tab.key === activeTab;
              return (
                <TouchableOpacity
                  key={tab.key}
                  style={[styles.tabPill, isActive && styles.tabPillActive]}
                  activeOpacity={0.85}
                  onPress={() => setActiveTab(tab.key)}
                >
                  <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {TIPS[activeTab].map((tip, index) => (
            <View key={tip.title} style={[styles.tipCard, { backgroundColor: cardBg }]}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{String(index + 1).padStart(2, '0')}</Text>
              </View>
              <Text style={[styles.tipTitle, { color: cardTitleColor }]}>{tip.title}</Text>
              <Text style={[styles.tipBody, { color: cardBodyColor }]}>{tip.body}</Text>
            </View>
          ))}
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.tealDark,
  },
  pageGradient: {
    flex: 1,
  },
  header: {
    paddingTop: 8,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  eyebrow: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginBottom: 4,
  },
  title: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 18,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    padding: 4,
  },
  tabPill: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabPillActive: {
    backgroundColor: COLORS.white,
  },
  tabLabel: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  tabLabelActive: {
    color: COLORS.tealMid,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
  },
  tipCard: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.tealDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  tipTitle: {
    color: COLORS.black,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  tipBody: {
    color: '#4B5563',
    fontSize: 13.5,
    lineHeight: 20,
  },
});

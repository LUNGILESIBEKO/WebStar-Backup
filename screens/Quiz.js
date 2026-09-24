import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const COLORS = {
  tealDark: '#042F2E',
  tealMid: '#0d5451',
  tealLight: '#0F766E',
  white: '#FFFFFF',
  black: '#000000',
  textMuted: 'rgba(255,255,255,0.7)',
};

const QUESTIONS = [
  {
    id: 1,
    text: 'What excites you most about technology?',
    options: [
      'Building systems that scale to millions of users',
      'Designing beautiful, intuitive interfaces',
      'Automating pipelines and infrastructure',
      'Analysing data to find hidden insights',
    ],
  },

  {
    id: 2,
    text: 'When debugging a hard problem, you usually...',
    options: [
      'Dig deep into logs and traces',
      'Check the UI state and user flow',
      'Spin up a test environment and reproduce it',
      'Visualise the data to spot the anomaly',
    ],
  },

  {
    id: 3,
    text: 'Which of these sounds like your ideal workday?',
    options: [
      'Optimising APIs and database queries',
      'Crafting pixel-perfect components and animations',
      'Writing Terraform configs and CI/CD pipelines',
      'Building dashboards and running A/B tests',
    ],
  },

  {
    id: 4,
    text: 'Which course did you enjoy most at university?',
    options: [
      'Databases, Algorithms, or Networking',
      'Human-Computer Interaction or Web Development',
      'Operating Systems or Cloud Computing',
      'Statistics, Machine Learning, or Data Structures',
    ],
  },

  {
    id: 5,
    text: 'In a group project, your role tends to be...',
    options: [
      'The one making the server and APIs work',
      'The one making it look and feel great',
      'The one setting up the repo, CI, and deployment',
      'The one analysing results and writing reports',
    ],
  },
];

const CAREER_TRACKS = [
  'Backend Developer',
  'Frontend Developer',
  'DevOps Engineer',
  'Data Engineer',
];

function computeMatches(answers) {
  const tally = [0, 0, 0, 0];

  Object.values(answers).forEach((optionIndex) => {
    if (
      typeof optionIndex === 'number' &&
      optionIndex >= 0 &&
      optionIndex < tally.length
    ) {
      tally[optionIndex] += 1;
    }
  });

  const totalAnswered = Object.keys(answers).length || 1;

  const matches = CAREER_TRACKS.map((title, index) => {
    const rawPercent = Math.round(
      (tally[index] / totalAnswered) * 100
    );

    const percent = Math.max(
      rawPercent,
      55 - index * 3
    );

    return {
      title,
      percent,
    };
  });

  matches.sort((a, b) => b.percent - a.percent);

  return matches;
}

export default function QuizScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const question = QUESTIONS[currentIndex];

  const isLastQuestion =
    currentIndex === QUESTIONS.length - 1;

  const selectedOption = answers[question.id];

  const progress =
    ((currentIndex + 1) / QUESTIONS.length) * 100;

  const selectOption = (optionIndex) => {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [question.id]: optionIndex,
    }));
  };

  const safeNavigate = (screenName, params) => {
    if (!navigation) {
      Alert.alert(
        'Navigation Error',
        'Navigation is not connected.'
      );
      return;
    }

    const state = navigation.getState();

    const knownRoutes = state?.routeNames || [];

    if (knownRoutes.includes(screenName)) {
      navigation.navigate(screenName, params);
    } else {
      Alert.alert(
        'Coming Soon',
        `The ${screenName} screen is not connected yet.`
      );
    }
  };

  const goNext = () => {
    if (selectedOption === undefined) {
      return;
    }

    if (isLastQuestion) {
      const finalAnswers = {
        ...answers,
        [question.id]: selectedOption,
      };

      const matches = computeMatches(finalAnswers);

      safeNavigate('CareerResults', {
        answers: finalAnswers,
        matches: matches,
        topMatch: matches[0],
      });

      return;
    }

    setCurrentIndex(
      (previousIndex) => previousIndex + 1
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.tealDark}
      />

      <LinearGradient
        colors={[
          COLORS.tealDark,
          COLORS.tealLight,
        ]}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.container}
      >
        {/* TOP BAR */}

        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>
            Career Quiz
          </Text>

          <Text style={styles.topBarCount}>
            {currentIndex + 1} / {QUESTIONS.length}
          </Text>
        </View>

        {/* PROGRESS */}

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress}%`,
              },
            ]}
          />
        </View>

        {/* QUESTION CARD */}

        <View style={styles.card}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              QUESTION {currentIndex + 1}
            </Text>
          </View>

          <Text style={styles.questionText}>
            {question.text}
          </Text>

          <View style={styles.optionsList}>
            {question.options.map(
              (option, index) => {
                const isSelected =
                  selectedOption === index;

                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionRow,
                      isSelected &&
                        styles.optionRowSelected,
                    ]}
                    activeOpacity={0.85}
                    onPress={() =>
                      selectOption(index)
                    }
                  >
                    <View
                      style={[
                        styles.radioOuter,
                        isSelected &&
                          styles.radioOuterSelected,
                      ]}
                    >
                      {isSelected && (
                        <View
                          style={
                            styles.radioInner
                          }
                        />
                      )}
                    </View>

                    <Text
                      style={[
                        styles.optionText,
                        isSelected &&
                          styles.optionTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              }
            )}
          </View>
        </View>

        {/* NEXT BUTTON */}

        <TouchableOpacity
          style={[
            styles.nextButton,
            selectedOption === undefined &&
              styles.nextButtonDisabled,
          ]}
          activeOpacity={0.85}
          disabled={
            selectedOption === undefined
          }
          onPress={goNext}
        >
          <Text
            style={[
              styles.nextButtonText,
              selectedOption === undefined &&
                styles.nextButtonTextDisabled,
            ]}
          >
            {isLastQuestion
              ? 'See My Results'
              : 'Next Question'}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.tealDark,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  topBarTitle: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },

  topBarCount: {
    color: COLORS.textMuted,
    fontSize: 13,
  },

  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor:
      'rgba(255,255,255,0.2)',
    marginBottom: 28,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 2,
  },

  card: {
    backgroundColor:
      'rgba(255,255,255,0.10)',
    borderRadius: 20,
    padding: 20,
    flex: 1,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor:
      'rgba(255,255,255,0.18)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 14,
  },

  badgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  questionText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 27,
    marginBottom: 24,
  },

  optionsList: {
    gap: 0,
  },

  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:
      'rgba(255,255,255,0.10)',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
  },

  optionRowSelected: {
    backgroundColor: COLORS.white,
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor:
      'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  radioOuterSelected: {
    borderColor: COLORS.tealMid,
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.tealMid,
  },

  optionText: {
    flex: 1,
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19,
  },

  optionTextSelected: {
    color: COLORS.black,
  },

  nextButton: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginVertical: 20,
  },

  nextButtonDisabled: {
    backgroundColor:
      'rgba(255,255,255,0.25)',
  },

  nextButtonText: {
    color: COLORS.tealMid,
    fontWeight: '700',
    fontSize: 15,
  },

  nextButtonTextDisabled: {
    color:
      'rgba(255,255,255,0.6)',
  },
});
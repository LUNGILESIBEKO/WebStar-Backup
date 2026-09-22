import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Check, Home, Compass, Map, User } from 'lucide-react-native';
import Roadmapdata from '../Data/Roadmapdata';

export default function Roadmap({ navigation }) {
  const { overallProgress, milestonesCompleted, milestonesTotal, steps } = Roadmapdata;

  // Matches the safeNavigate pattern used on Home.js: navigates if the
  // target screen is registered, otherwise shows a friendly alert instead
  // of crashing or silently doing nothing.
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

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#116b67', '#0d5451', '#042f2e']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
         
          <View style={styles.header}>
            <Text style={styles.pathTitle}>Backend Developer Path</Text>
            <Text style={styles.mainTitle}>Your Roadmap</Text>

          
            <View style={styles.progressCard}>
              <View style={styles.progressTopRow}>
                <Text style={styles.progressLabel}>Overall progress</Text>
                <Text style={styles.progressPercent}>{overallProgress}%</Text>
              </View>
              
             
              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: `${overallProgress}%` }]} />
              </View>
              
              <Text style={styles.progressSubtext}>
                {milestonesCompleted} of {milestonesTotal} milestones completed
              </Text>
            </View>

            <View style={styles.timelineContainer}>
              {steps.map((step, index) => (
                <View key={step.id} style={styles.stepRow}>
                  
                
                  {index !== steps.length - 1 && (
                    <View 
                      style={[
                        styles.verticalLine,
                        { backgroundColor: step.status === 'completed' ? '#FFFFFF' : 'rgba(255,255,255,0.2)' }
                      ]} 
                    />
                  )}

                
                  <View style={styles.circleContainer}>
                    {step.status === 'completed' ? (
                      <View style={styles.completedCircle}>
                        <Check size={18} color="#0A5C53" strokeWidth={3} />
                      </View>
                    ) : step.status === 'current' ? (
                      <View style={styles.currentCircleOuter}>
                        <Text style={styles.currentCircleText}>{step.id}</Text>
                      </View>
                    ) : (
                      <View style={styles.pendingCircle}>
                        <Text style={styles.pendingCircleText}>{step.id}</Text>
                      </View>
                    )}
                  </View>

            
                  <View style={styles.stepContent}>
                    <Text style={styles.stepCategory}>{step.category}</Text>
                    <View style={styles.stepTitleRow}>
                      <Text style={styles.stepTitle} numberOfLines={2}>{step.title}</Text>
                      <Text style={styles.stepDuration}>{step.duration}</Text>
                    </View>
                    <Text style={styles.stepDescription}>{step.description}</Text>

                    {/* 'You are here' Badge */}
                    {step.status === 'current' && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>You are here</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={() => safeNavigate('Home')}>
            <Home size={22} color="rgba(0,0,0,0.35)" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={() => safeNavigate('Explore')}>
            <Compass size={22} color="rgba(0,0,0,0.35)" />
            <Text style={styles.navText}>Explore</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={() => safeNavigate('Roadmap')}>
            <Map size={22} color="#000000" />
            <Text style={[styles.navText, styles.activeNavText]}>Roadmap</Text>
            <View style={styles.activeDot} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={() => safeNavigate('Profile')}>
            <User size={22} color="rgba(0,0,0,0.35)" />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05342F',
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  pathTitle: {
    color: '#88B3AD',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 24,
  },
  progressCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 32,
  },
  progressTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  progressLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  progressPercent: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  },
  progressBarTrack: {
    height: 8,
    width: '100%',
    backgroundColor: '#08443E',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  progressSubtext: {
    color: '#88B3AD',
    fontSize: 14,
  },
  timelineContainer: {
    position: 'relative',
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 32,
    position: 'relative',
  },
  verticalLine: {
    position: 'absolute',
    left: 16,
    top: 40,
    bottom: -32,
    width: 2,
    marginLeft: -1,
  },
  circleContainer: {
    zIndex: 10,
    marginRight: 16,
  },
  completedCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentCircleOuter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#0A5C53',
  },
  currentCircleText: {
    color: '#0A5C53',
    fontWeight: 'bold',
    fontSize: 14,
  },
  pendingCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendingCircleText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepContent: {
    flex: 1,
    paddingBottom: 8,
  },
  stepCategory: {
    color: '#2DD4BF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  stepTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  stepTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22,
    flex: 1,
    marginRight: 8,
  },
  stepDuration: {
    color: '#88B3AD',
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  stepDescription: {
    color: '#88B3AD',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
  },
  badgeText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 50,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: 'rgba(0,0,0,0.35)',
    fontSize: 10,
    marginTop: 4,
  },
  activeNavText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  activeDot: {
    width: 4,
    height: 4,
    backgroundColor: '#0d5451',
    borderRadius: 2,
    marginTop: 4,
  },
});
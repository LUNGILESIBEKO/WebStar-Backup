import { StyleSheet, Text, View } from 'react-native';
import Roadmap from './Screens/Roadmap';

export default function App() {
  return (
    <View style={styles.container}>
      <Roadmap/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5efef',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

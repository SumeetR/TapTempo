/**
 * Tap Tempo React Native App
 * https://github.com/SumeetR/TapTempo
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

class TapTempo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      samples: []
    };
  }

  // Push sample into samples array
  onPressButton = () => {
    const { samples } = this.state;
    samples.push(new Date().getTime());
    this.setState({samples: samples});
  }


  calculateTempo = (samples) => {
    // Only start processing when at least 5 samples are available
    if (samples.length >= 5) {
      // Take last 5 samples, subtract from first sample, and then return array of last 4 samples
      const lastFourSamples = samples.slice(-5).map((sample, index, array) => {
        if (index > 0) {
          return sample - array[index - 1];
        }
        return 0;
      }).slice(-4);
      // Calculate total time
      let total = 0;
      for (const index in lastFourSamples) {
        total = total + lastFourSamples[index];
      }
      // Calculate average
      const average = total / 4

      // Divide by milliseconds in a minute
      return Math.round(60000 / average);
    }
    return 0;
  } 

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          TapTempo
        </Text>
        <View style={styles.center}>
          <Text style={styles.instructions}>
            Tap the button to the beat!
          </Text>
          <Text style={styles.tempo}>
            {this.calculateTempo(this.state.samples)}
          </Text>
          <TouchableOpacity style={styles.tap} onPress={this.onPressButton}>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tap: {
    backgroundColor: 'red',
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  tempo: {
    fontSize: 48,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('TapTempo', () => TapTempo);

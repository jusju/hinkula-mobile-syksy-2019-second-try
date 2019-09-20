import React from 'react';
import { StyleSheet, Text, Button, TextInput, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import Expo from 'expo';
import { createStackNavigator } from 'react-navigation-stack';
import { FlatList } from 'react-native-gesture-handler';

export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

class CalcScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {num1: '', num2: '', sum: '', history: []}
  }
  static navigationOptions = {
    title: 'Calculator',

  };

  calcSum = () => {
    const sum = parseInt(this.state.num1) + parseInt(this.state.num2)
    const historyCalc = "" + this.state.num1 + " + " + this.state.num2 + " = " + sum;
    this.setState({result: sum, history: [...this.state.history, {key: historyCalc}], num1: '', num2: ''});
  }

  calcSub = () => {
    const sub = parseInt(this.state.num1) - parseInt(this.state.num2)
    const historyCalc = "" + this.state.num1 + " - " + this.state.num2 + " = " + sub;
    this.setState({result: sub, history: [...this.state.history, {key: historyCalc}], num1: '', num2: ''});
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={{fontSize: 20}}>Result: {this.state.result}</Text>
            <TextInput keyboardType="numeric" style={{fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(num1) => this.setState({num1})}
              value={this.state.num1}/>
            <TextInput keyboardType="numeric" style={{fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(num2) => this.setState({num2})}
              value={this.state.num2}/>
        </View>
        <View style={styles.buttoncontainer}>
          <Button onPress={this.calcSum} title=" + " />
          <Button onPress={this.calcSub} title=" - " />
          <Button onPress={() => navigate('History', {history: this.state.history})}
            title="History"/>
        </View>
      </View>
    );
  }
}

const HistoryScreen = (props) => {
  navigationOptions = {
    title: 'History',
  };
  const { params } = props.navigation.state;
  return(
    <View style={styles.listcontainer}>
      <Text style={{fontSize: 18}}>History</Text>
      <FlatList data={params.history} renderItem={({item}) => <Text style={{fontSize:18}}>{item.key}</Text>}/>
    </View>
  );
}

const MyApp = createStackNavigator({
  Calculator: {screen: CalcScreen},
  History: {screen: HistoryScreen}
});

const AppContainer = createAppContainer(MyApp);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttoncontainer: {
    flex: 1,
    width: 150,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  listcontainer: {
    flex: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
  },
});


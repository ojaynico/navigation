# Hello World

```js
import {StateNavigator} from 'navigation';
import {NavigationHandler} from 'navigation-react';
import {NavigationStack} from 'navigation-react-native';

var stateNavigator = new StateNavigator([
  {key: 'hello'},
  {key: 'world', trackCrumbTrail: true},
]);

const {hello, world} = stateNavigator.states;

hello.renderScene = () => (
  <TouchableHighlight
    onPress={() => {
      stateNavigator.navigate('world', {size: 20});
    }}>
    <Text>Hello</Text>
  </TouchableHighlight>
);

world.renderScene = ({size}) => (
  <Text style={{fontSize: size}}>World</Text>
);

stateNavigator.navigate('hello');

export default () => (
  <NavigationHandler stateNavigator={stateNavigator}>
    <NavigationStack />
  </NavigationHandler>
);
```

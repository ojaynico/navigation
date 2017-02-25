import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationMotion, spring} from 'navigation-react-native';

const getStyle = ({x, y, w, h, width}, show = 1) => ({
  x: spring(x, {stiffness: 250}),
  y: spring(y, {stiffness: 250}),
  w: spring(w, {stiffness: 250}),
  h: spring(h, {stiffness: 250}),
  show: spring(show, {stiffness: 250}),
});

export default ({stateNavigator}) => (
  <NavigationMotion
    startStateKey="grid"
    unmountedStyle={(state, data, sceneData) => getStyle({...data, ...sceneData}, 0)}
    mountedStyle={(state, data, sceneData) => getStyle({...data, ...sceneData})}
    crumbStyle={getStyle({})}
    style={{flex: 1}}
    stateNavigator={stateNavigator}>
    {({show, x, y, w, h}, scene, url, state, {color}) => (
      <View key={url} style={styles.scene}>
        <View
          style={{
            position: 'absolute',
            left: x,
            top: y,
            width: w,
            height: h,
            backgroundColor: color,
          }}>
        </View>
        <View
          style={{
            flex: 1,
            opacity: Math.floor(show),
          }}>
          {scene}
        </View>
      </View>
    )}
  </NavigationMotion>
);

const styles = StyleSheet.create({
  scene: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
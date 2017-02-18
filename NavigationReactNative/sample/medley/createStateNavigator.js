import React from 'react';
import {StateNavigator} from 'navigation';
import Scene from './Scene';
import {spring} from 'navigation-react-native';

export default () => {
  const stateNavigator = new StateNavigator([
    {key: 'sceneNorth', trackCrumbTrail: true},
    {key: 'sceneEast', trackCrumbTrail: true},
    {key: 'sceneSouth', trackCrumbTrail: true},
    {key: 'sceneWest', trackCrumbTrail: true},
  ]);

  const { sceneNorth, sceneEast, sceneSouth, sceneWest } = stateNavigator.states;
  sceneNorth.renderScene = (data, moveScene) => <Scene direction="North" color="blue" stateNavigator={stateNavigator}/>;
  sceneEast.renderScene = (data, moveScene) => <Scene direction="East" color="red" stateNavigator={stateNavigator}/>;
  sceneSouth.renderScene = (data, moveScene) => <Scene direction="South" color="green" stateNavigator={stateNavigator}/>;
  sceneWest.renderScene = (data, moveScene) => <Scene direction="West" color="black" stateNavigator={stateNavigator}/>;

  sceneNorth.unmountedStyle = () => ({translateY: spring(-1, {stiffness: 30})});
  sceneEast.unmountedStyle = () => ({translateX: spring(1, {stiffness: 30})});
  sceneSouth.unmountedStyle = () => ({translateY: spring(1, {stiffness: 30})});
  sceneWest.unmountedStyle = () => ({translateX: spring(-1, {stiffness: 30})});

  sceneNorth.mountedStyle = () => ({translateY: spring(0, {stiffness: 30})});
  sceneEast.mountedStyle = () => ({translateX: spring(0, {stiffness: 30})});
  sceneSouth.mountedStyle = () => ({translateY: spring(0, {stiffness: 30})});
  sceneWest.mountedStyle = () => ({translateX: spring(0, {stiffness: 30})});

  sceneNorth.crumbStyle = () => ({translateY: spring(-.3, {stiffness: 30})});
  sceneEast.crumbStyle = () => ({translateX: spring(.3, {stiffness: 30})});
  sceneSouth.crumbStyle = () => ({translateY: spring(.3, {stiffness: 30})});
  sceneWest.crumbStyle = () => ({translateX: spring(-.3, {stiffness: 30})});
  
  return stateNavigator;
}

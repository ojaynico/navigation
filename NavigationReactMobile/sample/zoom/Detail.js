import React from 'react';
import {NavigationBackLink} from 'navigation-react';
import {SharedElement} from 'navigation-react-mobile';

export default ({color, stateNavigator}) => (
  <div>
    <NavigationBackLink
      distance={1}
      stateNavigator={stateNavigator}>
      X
    </NavigationBackLink>
    <SharedElement
      name={color}
      data={{color}}
      stateNavigator={stateNavigator}>
      <div style={{backgroundColor: color}} />
    </SharedElement>
    <SharedElement
      name={`text${color}`}
      data={{color, fontSize: 80, fontColor: '#000'}}
      stateNavigator={stateNavigator}>
      <div>{color}</div>
    </SharedElement>
  </div>
);


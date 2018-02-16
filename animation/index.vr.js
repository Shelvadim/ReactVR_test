import React from 'react'
//import Location from 'Location'
import {
  AppRegistry,
  asset,
  Pano,
  View,
  VrButton,
  Plane,
  Box,
  Sphere, 
  PointLight, 
  Animated
} from 'react-vr'



const AnimatedSphere = Animated.createAnimatedComponent(Sphere);



export default class ReactVR_game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xx: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.move();
  }

  move = () => {
    this.state.xx.setValue(-10);
    Animated.timing(
      this.state.xx,
      {
        toValue: 10,
        duration: 10000,
      }
    ).start(this.move);
  }

  render() {
    return (
      <View
      style={{transform: [{translateY: 0},{translateX: 30}, {translateZ:0}],}}
      >
        <Pano source={asset('sky.jpg')}/>
        <PointLight style={{color: 'white', transform: [{translate: [0, 400, 700]}]}} />
        <AnimatedSphere
          style={{
            color: 'red',
            transform: [{translateY: 0},{translateX: this.state.xx}, {translateZ:-20}],}}
            radius={2.5}
            widthSegments={10}
            heightSegments={10}
            wireframe
        />
        <Plane
          dimWidth={60}
          dimHeight={60}
          style={{
            color: 'darkseagreen',
            transform: [{ translate: [0, -5, 0] }, { rotateX: -90 }],
          }}
        />
          
        
      </View>
    );
  }
  
}


AppRegistry.registerComponent('ReactVR_game', () => ReactVR_game);

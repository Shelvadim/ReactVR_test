import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  Plane,
  Sphere,
  PointLight,
  Box,
  Animated,
  Image,
  Model,
  VrButton,
  View,
} from 'react-vr';
import Easing from 'Easing';

const AnimatedSharke = Animated.createAnimatedComponent(Model);

export default class island extends React.Component {
  constructor(props) {
    super(props);
    //this.click = this.click.bind(this);
   
    this.state = {
      //source: {uri:'../static_assets/skys.jpg'},    
      sharkx: new Animated.Value(0),
      sharky: new Animated.Value(0),
      sharkz: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this.moveX();
    
  }

  animateProgress() {
      //this.timeout = this.setTimeout(this.click, 1000); // or however many milliseconds you want to wait
      this.timeout = setTimeout(()=> {
        this.setState(this.click)
     }, 1000)
      // begin animation
      console.log('ok');
  }

  stopProgress() {
      clearTimeout(this.timeout);
      this.timeout = null;
      console.log('stop');
          // end animation
      }

  click() {
    console.log('click');
    //sharkz: new Animated.Value(0);
    Animated.sequence([
      Animated.timing(
        this.state.sharkz,
        {
          toValue: -30,
          duration: 900
        }
      ),
      Animated.timing(
        this.state.sharkz,
        {
          toValue: 0,
          duration: 1500,
          easing: Easing.elastic(2)
        }
      )
    ]).start();
  }

  moveX = () => {
    this.state.sharkx.setValue(-30);
    this.state.sharky.setValue(180);
    Animated.sequence([  
        Animated.timing(
          this.state.sharkx,
          {
            toValue: 30,
            duration: 10000,
          }
        ),
        Animated.timing(
          this.state.sharky,
          {
            toValue: 0,
            duration: 2000,
          }
        ),
        Animated.timing(
          this.state.sharkx,
          {
            toValue: -30,
            duration: 10000,
          }
        ),
        Animated.timing(
          this.state.sharky,
          {
            toValue: 180,
            duration: 2000,
          }
        )
    ]).start(this.moveX);
    
  }

  

  render() {
    return (
      <View>
        <Pano
           source={asset('skys.jpg')} 
         />
         <PointLight style={{color: 'white', transform: [{translate: [0, 200, 300]}]}} />
         <VrButton onEnter={ () => this.animateProgress() }
                  onExit={ () => this.stopProgress() }
                  onClick={ ()=> this.click() }>
                  <Image
                          style={{
                            height: 0.2,
                            width: 0.2,
                            transform: [{ translate: [1.6, -1, -2.7] }, , { rotateY: -45 }],
                          }}
                          source={asset('info.png')}
                  />
          </VrButton>

          <Image
                 style={{
                 height: 2,
                 width: 4,
                transform: [{ translate: [-1.6, 1.8, 10] }, , { rotateY: 0 }],
              }}
              source={asset('ship1.png')}
           />
         
        <Plane
          dimWidth={600}
          dimHeight={600}
          texture={{
            ...asset('water.jpg'),
            repeat: [8, 8],
          }}
          style={{
            color: 'aquamarine',
            opacity: 0.9,
            transform: [{ translate: [0, -5, 0] }, { rotateX: -90 }],
          }}          
        />
        <Sphere
            radius={20}
            widthSegments={20}
            heightSegments={30}
            //texture={'../static_assets/sand.jpg'}
            texture={{
              ...asset('sand.jpg'),
              repeat: [8, 8],
            }}
            style={{
              color: 'moccasin', 
              transform: [{ translate: [-2, -22, -10] }],             
            }}
           // lit={true} 
        />
        <Sphere
            radius={15}
            widthSegments={10}
            heightSegments={10}
            style={{
              color: 'yellow', 
              transform: [{ translate: [150, 80, -200] }],             
            }} 
            //lit={true}
        />
        <Model 
          style={{
            //color: 'red',
            transform: [
              {translate: [-3, -2.3, -7]},
              {scale: 0.045 },             
              {rotateX: -90},//,
              {rotateY: -8}
            ],
          }}        
          source={{obj:asset('Palm_Tree.obj'), mtl:asset('Palm_Tree.mtl')}}
          //lit={true} 
        />

          <Model 
          style={{
            //color: 'red',
            transform: [
              {translate: [-2, -2.3, -7]},
              {scale: 0.05 },             
              {rotateX: -80},//,
              {rotateY: 8}
            ],
          }}        
          source={{obj:asset('Palm_Tree.obj'), mtl:asset('Palm_Tree.mtl')}}
          //lit={true} 
        />

          
            <AnimatedSharke 
              style={{
                transform: [
                  {translate: [14, -5.7, -14]},
                  {scale: 2 },             
                  {rotateY: 25},
                  {rotateZ: this.state.sharkz}
                ],
              }}        
              source={{obj:asset('SHARK.obj'), mtl:asset('SHARK.mtl')}}
              lit={true} 
             />
        

      <AnimatedSharke 
          style={{
            //color: 'red',
            transform: [
              {translateY: -5.5},
              {translateX: (this.state.sharkx)},
              //2d: x = r*cos(a) + u; y = r*sin(a) + v, где r - радиус, a - угол, (u,v) - координаты центра окружности.
              //{translateX: (30*Math.cos(this.state.sharkx))},
              {translateZ: -40},
              //{translate: [-30, -5.5, -30]},
              {scale: 2 },             
              //{rotateX: this.state.sharkx},
              {rotateY: this.state.sharky}
              //{rotateY: this.state.sharkx.interpolate({
               // inputRange: [0, 360],
               // outputRange: [180, -180]  // 0 : 150, 0.5 : 75, 1 : 0
              //}),}
              //{rotateZ: -10}
            ]
      }}        
            source={{obj:asset('SHARK.obj'), mtl:asset('SHARK.mtl')}}
            lit={true} 
          />
      </View>
    );
  }
};

AppRegistry.registerComponent('island', () => island);

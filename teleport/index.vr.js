import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
  Model,
  AmbientLight,
} from 'react-vr';

export default class teleport extends React.Component {
  constructor() {
    super();
    this.state = {selectedState: "Arizona"};
  }

  stateClicked (selection) {
    let newState;
    switch(selection) {
      case 1:
        newState = "Arizona";
        break;
      case 2:
        newState = "New Hampshire";
        break;
      case 3:
        newState = "Space";
        break;
      case 4:
        newState = "Hawaii";
        break;
      case 5:
        newState = "Vancouver";
        break;
    }
    console.log(newState);
    this.setState({ selectedState: newState});
  }  

  render() {
    const states = {
      Arizona: "Arizona",
      NewHampshire: "New Hampshire",
      Space: "Space",
      Hawaii: "Hawaii",
      Vancouver: "Vancouver"
   }
    
   console.log(this.state.selectedState);
    return (
      <View>
        <Pano source={asset(this.state.selectedState + '.jpg')}/>
        <View
          style={{
            flex: 1,
            width: 2,
            flexDirection: 'column',
            alignItems: 'stretch',
            layoutOrigin: [0.5, 0.5],
            transform: [{translate: [0, 0, -5]}]
          }}
        >
          <Title/>
          <TextBoxes stateClicked={this.stateClicked.bind(this)} states={states}/>
        </View>
        
        <AmbientLight intensity={ 2.6 } /> 
                      
        {(this.state.selectedState==="Space") && <Earth/>}       
        
      </View>
    );
  }
};

class Earth extends React.Component {
  constructor() {
    super();
     this.state = {
        rotation: 130,
        };
        this.lastUpdate = Date.now();
        this.rotate = this.rotate.bind(this);
        }
        componentDidMount() {
           this.rotate();
       }
          
          componentWillUnmount() {
             if (this.frameHandle) {
                cancelAnimationFrame(this.frameHandle);
                 this.frameHandle = null;
            }
          }
              
 
 rotate() {
    const now = Date.now();
    const delta = now - this.lastUpdate;
    this.lastUpdate = now;
    this.setState({
       rotation: this.state.rotation + delta / 150
      });
       this.frameHandle = requestAnimationFrame(this.rotate);
  }

  //if (this.state.selectedState) {
   // return null;
  //}
  
  render() {
    
   return (
     <View>        
       <Model
        style={{
         transform: [
            {translate: [-45, 0, -70]},
            {scale: 0.05 },
            {rotateY: this.state.rotation},
            {rotateX: 20},
            {rotateZ: -10}
         ],
    }} 
    source={{obj:asset('earth.obj'), mtl:asset('earth.mtl')}}
     lit={true} 
     />

     </View>
   );
 }

}

class TextBoxes extends React.Component {

  render() {
    return (
      <View>
        <VrButton onClick={() => this.props.stateClicked(1)}>
          <View style={{ margin: 0.1, height: 0.3, borderRadius:0.1, backgroundColor: '#3bcfbd'}}>
            <Text style={{fontSize: 0.2, textAlign: 'center'}}>{this.props.states.Arizona}</Text>
          </View>
        </VrButton>
        <VrButton onClick={() => this.props.stateClicked(2)}>
          <View style={{ margin: 0.1, height: 0.3, borderRadius:0.1, backgroundColor: '#3bcfbd'}}>
            <Text style={{fontSize: 0.2, textAlign: 'center'}}>{this.props.states.NewHampshire}</Text>
          </View>
        </VrButton>
        <VrButton onClick={() => this.props.stateClicked(3)}>
          <View style={{ margin: 0.1, height: 0.3, borderRadius:0.1, backgroundColor: '#3bcfbd'}}>
            <Text style={{fontSize: 0.2, textAlign: 'center'}}>{this.props.states.Space}</Text>
          </View>
        </VrButton>
        <VrButton onClick={() => this.props.stateClicked(4)}>
          <View style={{ margin: 0.1, height: 0.3, borderRadius:0.1, backgroundColor: '#3bcfbd'}}>
            <Text style={{fontSize: 0.2, textAlign: 'center'}}>{this.props.states.Hawaii}</Text>
          </View>
        </VrButton>
        <VrButton onClick={() => this.props.stateClicked(5)}>
          <View style={{ margin: 0.1, height: 0.3, borderRadius:0.1, backgroundColor: '#3bcfbd'}}>
            <Text style={{fontSize: 0.2, textAlign: 'center'}}>{this.props.states.Vancouver}</Text>
          </View>
        </VrButton>
      </View>
    )
  }
}

class Title extends React.Component {
  constructor() {
    super();
    this.state = {title: "Teleport Destination"};
  }
  render() {
    return (
      <View>
        <Text style={{fontSize: 0.2, textAlign: 'center', color: "#3bcfbd"}}>
        {this.state.title}
        </Text>
      </View>
    )
  }
}

AppRegistry.registerComponent('teleport', () => teleport);

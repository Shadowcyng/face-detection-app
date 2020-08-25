import React, { Component } from 'react';
import './App.css';
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkFrom';
import FaceDetection from './components/FaceDetection/FaceDetection';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';

const PaticlesOption = {
  particles: {
   number: {
      value:100,
      density: {
        enable: true,
        value_area:700,  
      }
     
    },
    color:{
      value:'#ff5edf',
    },
  }
}
const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route:'signin',
  isSignedIn:false,
  user:{
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
        }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState


    }

  loadUser=(data)=>{
    this.setState({user : {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
      }  }) 
    }

  componentDidMount=()=>{
    fetch('https://cryptic-sierra-52852.herokuapp.com/')
    .then(res=>res.json()).then(data=>console.log(data)).catch(console.log)
  }

  calculateFaceLocation=(data)=>{
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width= Number(image.width);
    const height= Number(image.height);
    return({
      leftCol: clarifaiFace.left_col*width,
      topRow: clarifaiFace.top_row*height,
      rightCol: width - (clarifaiFace.right_col*width),
      bottomRow: height - (clarifaiFace.bottom_row*height),
  })

  }
  
  displayFaceBox=(BoundingBox) =>{
    this.setState({box:BoundingBox});
  }
  onRouteChange= (route) => {
    if(route==='signout'){
      this.setState(initialState)
    }
    if(route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route});
  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }
  onButtonClick = () =>{
    this.setState({imageUrl:this.state.input});
    console.log(this.state.input);
    fetch('https://cryptic-sierra-52852.herokuapp.com/imageAPI',{
      method:'post',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({
        input : this.state.input
      })
    }).then(res=>res.json())
      .then(response =>{
        console.log(response)
        if(response){
          fetch('https://cryptic-sierra-52852.herokuapp.com/image',{
            method:'put',
            headers:{'content-type':'application/json'},
            body:JSON.stringify({
            id:this.state.user.id,
            })
          }).then(res=>res.json()).then(count=>{
            Object.assign(this.state.user,{entries:count})
          }).catch(err=>console.log('err',err))
        }
      this.displayFaceBox(this.calculateFaceLocation(response)
      )}
      ).catch(err=>console.log('Something went wrong',  err));
  }
  render(){
    const {user,imageUrl,box,route,isSignedIn} = this.state;
  return (
    <div className="App">
 <Particles className='particles' params={PaticlesOption} />

      <Navigation
      onRouteChange={this.onRouteChange}
      isSignedIn={isSignedIn} />

    {route==='home'?
    <div><Logo />
    <Rank 
    name={user.name}
    entries={user.entries}
    />
    <ImageLinkForm 
    onInputChange={this.onInputChange} 
    onButtonClick={this.onButtonClick}/>
   <FaceDetection 
    imageUrl={imageUrl}
    box={box}/>
   </div>
      : ((route==='signin' || route==='signout') ?
      <Signin onRouteChange={this.onRouteChange}
        loadUser = {this.loadUser}
      />
      : 
      <Register onRouteChange={this.onRouteChange}
      loadUser={this.loadUser}
      />
     
      )
    } 
    </div>
  );
}
}
export default App;

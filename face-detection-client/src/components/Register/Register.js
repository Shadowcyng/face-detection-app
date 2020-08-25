import React from 'react';

class Register  extends React.Component {
  constructor(props){
    super(props)
    this.state={
      registerName:'',
      registeremail:'',
      registerpassword:''
    }
  }
  onNameChange=(event)=>{
    this.setState({registerName:event.target.value});
  }
  onEmailChange=(event)=>{
    this.setState({registerEmail:event.target.value});
  }
  onPasswordChange=(event)=>{
    this.setState({registerPassword:event.target.value});
  }
  onRegister=()=>{
    fetch('https://cryptic-sierra-52852.herokuapp.com/register',{
      method:'post',
      headers:{'content-type':'application/JSON'},
      body:JSON.stringify({
        name:this.state.registerName,
        email:this.state.registerEmail,
        password:this.state.registerPassword
      })
    }).then(res => {
      res.json().then(data=>this.props.loadUser(data));
      if(res.status===200){
        this.props.onRouteChange('home');
     }
     else{
        document.getElementById('err').textContent = 'Unable to Register! Try Again ';
     }
     })

    
  }
  render(){
    const{onRouteChange} = this.props
    return(
      <article className="br3 shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
       <main className="pa4 black-80">
        <div className="measure ">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Register</legend>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="Name">Name</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              onChange={this.onNameChange}
              type="text"
               name="name"  
              id="name" 
              pattern="/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/"
              title="Enter valid name"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
               onChange={this.onEmailChange}
               type="email" 
               name="email-address"  
               id="email-address" 
               pattern="/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i"
               title="Enter valid email"
               />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
               onChange={this.onPasswordChange}
               type="password" 
               name="password" 
                id="password"
                pattern=" /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16$/"
                title="Passowrd should have altleast one uppercase, 1 lowercase and 1 number.
                and min length is 4 max length is 16"
                />
            </div>
            </fieldset>
          <div className="">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
            type="submit" 
            value="Register" 
            onClick={this.onRegister}/>
          </div>
          <div className="lh-copy mt3">
            <a href="#0" className="f6 link dim black db"
            onClick={() => onRouteChange('signin')}>Sign In</a>
          </div>
          <div className='lh-copy mt3 b red'>
         <p id='err'></p>
         </div>
        </div>
      </main>
      </article>
      
      );
  }

}
export default Register;
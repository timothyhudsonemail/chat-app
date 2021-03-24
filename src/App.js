import React, {Component} from 'react';
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      msg1:'',
      msg2:'',
      msg3:'',
      msg4:'',
    }
  }

  componentDidMount(){
    this.autoUpdateMsg1();
    this.autoUpdateMsg2();
  }

  sendMsg1 = (e) => {
    e.preventDefault()
    
    fetch("https://server-v1-2021.herokuapp.com/msg1", {
      method: 'put',
      body: JSON.stringify({
        "id": "1",
        "msg": this.state.msg1
      }),

      headers:{
        'Content-Type': 'application/json',
      }
    })
    .then(() => {
      fetch("https://server-v1-2021.herokuapp.com/a")
      .then(res => res.json())
      .then(
        (result) => {
            this.setState(
            {msg3: result[0].msg}
            )
          });
    })
    .then(() => {
      this.setState(
        {msg1: ""}
      )
    })
  }

  sendMsg2 = (e) => {
    e.preventDefault()
    fetch("https://server-v1-2021.herokuapp.com/msg2", {
      method: 'put',
      body: JSON.stringify({
        "id": "2",
        "msg": this.state.msg2
      }),

      headers:{
        'Content-Type': 'application/json',
      }
    })
    .then(() => {
      fetch("https://server-v1-2021.herokuapp.com/a")
      .then(res => res.json())
      .then(
        (result) => {
            this.setState(
            {msg4: result[0].msg}
            )
        }
      )
    })
    .then(() => {
      this.setState(
        {msg2: ""}
      )
    })
  }

  autoUpdateMsg1 = () => {
    fetch("https://server-v1-2021.herokuapp.com/a")
    .then(res => res.json())
    .then(
      (result) => {
          this.setState(
          {msg3: result[0].msg}
          )
        });
        setTimeout(this.autoUpdateMsg1, 3000)
  }

  autoUpdateMsg2 = () => {
    fetch("https://server-v1-2021.herokuapp.com/a")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState(
        {msg4: result[0].msg2}
        )
      })
      setTimeout(this.autoUpdateMsg2, 3000)
  }

  msg1Handler = (event) => {
    this.setState({msg1: event.target.value});
  }

  msg2Handler = (event) => {
    this.setState({msg2: event.target.value})
  }
  
  render() {
    return (
      <div className="App">
        <br />
      <h1 style={{fontFamily:"Avaraa"}}>
      chat app
      </h1>
        <img src="https://bunnyland-proto.s3.us-east-2.amazonaws.com/Untitled-1.png" 
          style={{height: 160}}
          alt="abstract art" />
        <br />
      <p style={{color:"rgb(255, 51, 153)",fontFamily:"Avaraa",paddingLeft:"90px",paddingRight:"90px"}}>
      welcome! this is a full stack chat application which facilitates communication between 2 remote users. conversation persists between page reloads. <br />
      technical info: this application is built using react. front end hosted on vercel (deployed via github), server built from scratch and hosted on heroku. psql database hosted on aws s3.
      </p>
    <br />
    
     

        <div className='flex-container'>
          <div className='flex-child'>
      <h3 style={{fontFamily:"Avaraa"}}>user 1</h3>
           <img src="https://bunnyland-proto.s3.us-east-2.amazonaws.com/Untitled-2.png" 
            style={{height: 120}}
            alt="illustration of user 1" />
            <form 
      onSubmit={this.sendMsg1}>
              <label>
                
                <input
                onChange={this.msg1Handler} 
                value={this.state.msg1} 
                placeholder='enter msg here' />
              </label>
              <input type="submit" value="send" />
            </form>
          </div>

         <div className='flex-child'>
            <h3 style={{fontFamily:"Avaraa"}}>user 2</h3>
            <img src="https://bunnyland-proto.s3.us-east-2.amazonaws.com/Untitled-3.png" 
            style={{height: 120}}
            alt="illustration of user 2" />
            <form 
      onSubmit={this.sendMsg2}>
              <label>
                
                <input
                onChange={this.msg2Handler} 
                value={this.state.msg2} 
                placeholder='enter msg here' />
              </label>
              <input type="submit" value="send" />
            </form>
          </div>
        </div>

        <div className='flex-container'>
          <div className='flex-child'>
      <br />
            <p style={{fontFamily:"Avaraa",color:"rgb(255, 51, 153)"}}>message from user 1:</p>
      <br />      
      <h2 style={{fontFamily:"Avaraa"}}>{this.state.msg3 ? this.state.msg3 :'msg1 will appear here'}</h2>
          </div>

          <div className='flex-child'> 
      <br />      
      <p style={{fontFamily:"Avaraa",color:"rgb(255, 51, 153)"}}>message from user 2:</p>
      <br />      
      <h2 style={{fontFamily:"Avaraa"}}>{this.state.msg4 ? this.state.msg4 : 'msg2 will appear here'}</h2>
          </div>
        </div>
      </div>
      );
  }
}

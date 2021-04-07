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
      chosenSection:false,
    }
  }

  componentDidMount(){
    this.autoUpdateMsg1();
    this.autoUpdateMsg2();
  }

  openMail = () => {
    
        window.open('mailto:?subject=Chat App Invitation!&body=Hi! Copy and paste this address to meet me in the Chat App! -> https://chat-app-v2.vercel.app/');
        
      
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

  navButtons = () => {
    if(this.state.chosenSection === false)
    {this.setState({chosenSection: true})}
    else{
      this.setState({chosenSection: false})
    }
  }
  
  render() {
    return (
      <div className="App">
      <h1 style={{fontFamily:"Varta"}}>
      Chat Study
      </h1>  


      <div style={{display:"flex",
                    flexDirection:"row", 
                    justifyContent:"center", 
                    height:"40px"}}>
          
          <div className={this.state.chosenSection ? "p-container" : "selected p-container"}
               onClick={this.navButtons}>
          <p>App</p>
          </div>
          
          <div className={this.state.chosenSection ? "selected p-container" : "p-container"}
               onClick={this.navButtons}>
          <p>
          About</p>
          </div>
        </div> 



      <br />
    
      <div className="app-section" 
           style={{display:this.state.chosenSection ? 'none' : 'block' }}>
      <div className='flex-container'>
        <div className='flex-child'>
          <h3 style={{fontFamily:"Varta"}}>User 1</h3>
            <form onSubmit={this.sendMsg1}>
              <label>  
                <input
                onChange={this.msg1Handler} 
                value={this.state.msg1} 
                placeholder='Enter message here' />
              </label>
                <input type="submit" 
                       value="Send" />
            </form>
        </div>

        <div className='flex-child'>
          <h3 style={{fontFamily:"Varta"}}>User 2</h3>
            <form onSubmit={this.sendMsg2}>
              <label>  
                <input onChange={this.msg2Handler} 
                       value={this.state.msg2} 
                       placeholder='Enter message here' />
              </label>
                <input type="submit" value="Send" />
            </form>
        </div>
      </div>
        

      <div className='flex-container'>
        <div className='flex-child'>
          <br />
            <p style={{fontFamily:"Varta",
                      color:"black",
                      paddingBottom:"20px"}}>Message from User 1:</p>
            
            <h3 style={{fontFamily:"Varta"}}>{this.state.msg3 ? this.state.msg3 :''}</h3>
      
        </div>

        <div className='flex-child'> 
          <br />      
            <p style={{fontFamily:"Varta",
                       color:"black",
                       paddingBottom:"20px"}}>Message from User 2:</p>
        
            <h3 style={{fontFamily:"Varta"}}>{this.state.msg4 ? this.state.msg4 : ''}</h3>
      
        </div>
      </div>
      
      <div style={{paddingBottom:"200px"}}>
      </div>
    </div>


    <div className="about-section" 
         style={{display:this.state.chosenSection ? 'block' : 'none' }}>
    <div className='flex-container about-style'>
      <div className='flex-child p-style'>
      <p style={{color:"black",
                 fontFamily:"Varta",
                 
                  textAlign:"left"}}>
      Welcome! This is a full stack chat application which facilitates communication between 2 remote users. Send a link to a friend and set up a time to chat! Or open a second tab in your browser and chat with yourself :) <br></br><span style={{cursor:"pointer",color:"blue"}}onClick={this.openMail}>Click here to send link</span>.</p>
      </div>
      <div className='flex-child p-style'>
      <p style={{color:"black",
                 fontFamily:"Varta",
                 
                  textAlign:"left"}}>
      This application is built using React. The front end is hosted on Vercel/Github, the server is built from scratch and hosted on Heroku, and a handmade PSQL database stores conversation info.
      </p>
    </div>
   </div>
   </div>




      </div>
      );
  }
}

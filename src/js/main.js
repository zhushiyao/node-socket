import React from 'react'
import 'css/main.less'
import socket from 'socket.io-client'
import Title from './title'
import People from './people'
import Round from './round'
class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      round: 0,
      people: 0
    }
    this.io = socket();
  }
  ready(){
    console.log('ready')
    
  }
  componentDidMount(){
    this.io.on('change', param => {
      console.log('client send', param);
      // this.state.message = msg.message;
      this.setState({
        round: param.round,
        people: param.people
      })
    })
  }
  render() {
    return ( 
      <div className="main">
        <Title/>
        <Round round={this.state.round}/>
        <People people={this.state.people}/>
      </div>
    );
  }
} 

export default Main;
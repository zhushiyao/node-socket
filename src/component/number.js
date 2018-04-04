import React from 'react'
import 'css/number.less'
export default class extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      number: props.number,
      className: 'change-animation'
    }
  }

  render(){
    let numberClassName = 'number-item_number';
    let stateNumber = this.state.number;
    let propsNumber = this.props.number;
    // console.log(stateNumber, propsNumber, this.state.number == this.props.number)
    console.log(this.state.number, this.props.number, this.state.number == this.props.number)
    if(this.state.number != this.props.number){
      numberClassName = 'change-animation';
      // console.log('change---number')

      // this.setState({
      //   className: 'change-animation'
      // });
      // console.log(number,this.props.number, this.state.number)

      setTimeout(() => {
        this.setState({
          number: this.props.number,
          // className: ''
        });
      }, 980);
      
    }

    let show = 0;

    // console.log(number,this.props.number, this.state.number)

    return (
      <div className="number-item">
        <div className={'props-number ' + numberClassName}>{propsNumber}</div>
        <div className={'state-number ' + numberClassName}>{stateNumber}</div>
      </div>
    )
  }
}
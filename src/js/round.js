import React from 'react'
import Number from 'component/number'
import 'css/round.less'

/**
 * 总场次
 */
export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    
    let array = this.props.round ? String(this.props.round).split('') : Array.from({length: 6});
    const numbers = array.map((v, i)=>{
      return (<Number number={v || 0} key={i}/>)
    });
    return (
      <div className="round-panel">
        <div className="sub_title">服务总场次</div>
        <div className="number-panel">
          {numbers}
        </div>
      </div>
    )
  }

}
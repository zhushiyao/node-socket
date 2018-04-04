import React from 'react'
import 'css/title.less'

export default class Title extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div className="title">
        <h1>全程网络2018</h1>
        <h2>责任 RESPONSIBILITY · 承诺 PROMISE · 实现 DELIVER</h2>
        <hr/>
      </div>
    );
  }
}
import React from 'react'
import 'css/people.less'
/**
 * 总人次
 */
export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  formatNumber(s, n=0) {
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + "";
    var q = s.indexOf('-') != -1 ? '-' : '';
    s = s.replace(/\-/g, '')
    var l = s.split(".")[0].split("").reverse(),
      r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return q + t.split("").reverse().join("");
  }
  render() {
    return ( 
    <div className="people-panel">
      <div className="sub_title">服务总人次</div> 
      <div className="number">{this.formatNumber(this.props.people || 0)}</div> 
    </div>
    )
  }

}
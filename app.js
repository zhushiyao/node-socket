import React from 'react'
import ReactDom from 'react-dom'
import Main from 'js/main'
import 'css/app.less'
const render = Component => {
  ReactDom.render( 
    <Component/> ,
    document.getElementById('app')
  );
}

render(Main);
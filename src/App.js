import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import Bg from './index/_index.js'
import SiderBar from './index/sidebar/sidebar.js'
import Gettime from './index/changeTool/changeTool.js'

class App extends Component {
  render() {
    return (
      <div className="app">
     <Bg></Bg>
     <SiderBar className="side-bar"> </SiderBar>
     <Gettime.Gettime/>
     <Gettime.Famous/>
     <Gettime.ThemeChange/>
     </div>
    );
  }
}

export default App;

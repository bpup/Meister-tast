import React, { Component } from 'react';
import './css/App.css';
import Bg from './index/_index.js'
import SiderBar from './index/sidebar/sidebar.js'
import Gettime from './index/changeTool/changeTool.js'
import Notifications from './index/signInTool/signInTool.js'
import RaisedButton from 'material-ui/RaisedButton';
import Sidemenu from './index/signInTool/signInTool.js'
import 'semantic-ui-css/semantic.min.css';


class App extends Component {
  constructor(props){
    super(props)
    this.handelThemeChange=this.handelThemeChange.bind(this)
    this.handelThemeChangeImg=this.handelThemeChangeImg.bind(this)
    this.state={
      themeIndex:'',
      themeImgIndex:''
    }
  
  }
  handelThemeChange(themeIndex){
    this.setState({themeIndex:themeIndex})
    
  }
  handelThemeChangeImg(themeImgIndex){
    this.setState({themeImgIndex:themeImgIndex})
    
  }
  render() {
    return (
      <div className="app">
     <Bg themeIndex={this.state.themeIndex}
         themeImgIndex={this.state.themeImgIndex}
     ></Bg>
     <SiderBar.SiderBar className="side-bar"> </SiderBar.SiderBar>
     <Gettime.Gettime/>
     <Gettime.Famous/>
     <Gettime.ThemeChange 
       themeIndex={this.handelThemeChange}
       themeImgIndex={this.handelThemeChangeImg}
       />
       <Sidemenu/>
  
     </div>
    );
  }
}

export default App;

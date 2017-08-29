import React, { Component } from 'react';
import './css/App.css';
import Bg from './index/_index.js'
import SiderBar from './index/sidebar/sidebar.js'
import Gettime from './index/changeTool/changeTool.js'
import Notifications from './index/signInTool/signInTool.js'
import RaisedButton from 'material-ui/RaisedButton';
import Sidemenu from './index/signInTool/signInTool.js'
import 'semantic-ui-css/semantic.min.css';
import createHistory from 'history/createHashHistory'
import AV from 'leancloud-storage'
import {Provider,connect} from 'react-redux'


const src=[
	'./avatar/1.svg',
	'./avatar/2.svg',
	'./avatar/3.svg',
	'./avatar/4.svg',
	'./avatar/5.svg',
	'./avatar/6.svg',
	'./avatar/7.svg',
	'./avatar/8.svg',
	'./avatar/9.svg',
	'./avatar/10.svg',
	'./avatar/11.svg',
	'./avatar/12.svg',
	'./avatar/13.svg',
	'./avatar/14.svg',
	'./avatar/15.svg',
	'./avatar/16.svg',
	'./avatar/17.svg',
]

const randomAvatar=()=>{
	return src[parseInt(Math.random()*src.length)]
}
const history = createHistory()
class App extends Component {
  constructor(props){
    super(props)
    this.handelThemeChange=this.handelThemeChange.bind(this)
    this.handelThemeChangeImg=this.handelThemeChangeImg.bind(this)
    this.state={
      themeIndex:'',
      themeImgIndex:'',
      UserName:"",
      email:'',
      avatar:'',
    }
  
  }
  handelThemeChange(themeIndex){
    this.setState({themeIndex:themeIndex})
    
  }
  handelThemeChangeImg(themeImgIndex){
    this.setState({themeImgIndex:themeImgIndex})
    
  }
  componentWillMount(){
    let randomAvatars=randomAvatar()
		this.setState({avatar:randomAvatars})
    const currentUser=AV.User.current();
    if(currentUser){
      const UserName=currentUser.attributes.username;
      const email=currentUser.attributes.email;
     this.setState({UserName:UserName})
     this.setState({email:email})
    }else{
      history.location('/')
    }
    
  }
  render() {
    return (
      // <Provider store={store}>
      <div className="app">
     <Bg themeIndex={this.state.themeIndex}
         themeImgIndex={this.state.themeImgIndex}
     ></Bg>
     <SiderBar.SiderBar className="side-bar" avatar={this.state.avatar} email={this.state.email} username={this.state.UserName}> </SiderBar.SiderBar>
     <Gettime.Gettime username={this.state.UserName}/>
     <Gettime.Famous/>
     <Gettime.ThemeChange 
       themeIndex={this.handelThemeChange}
       themeImgIndex={this.handelThemeChangeImg}
       />
       <Sidemenu username={this.state.UserName} avatar={this.state.avatar}/>
     </div>
    //  </Provider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { message, Spin} from 'antd'
import 'antd/dist/antd.min.css'
import AV from 'leancloud-storage'
import { Icon, Popup, Button,Card,Header } from 'semantic-ui-react'
import Log from './Log.css'
import {
	BrowserRouter,
	Switch,
	Route,
	Link
  } from 'react-router-dom'
  import createHistory from 'history/createHashHistory'
  const history = createHistory()
  const warn={outline:'1px solid red'};
  const visible={display:'block'};
  const normal={color:'#fff'};
  const hidden={color:'none'};
  const warning = (mes) => {
    message.error(mes,6);
  };
 
class Logup extends React.Component{
  constructor(props){
    super(props)
    this.receiveUserName=this.receiveUserName.bind(this)
    this.receivePassword=this.receivePassword.bind(this)
    this.receiveEmail=this.receiveEmail.bind(this)
    this.sendLenaCloud=this.sendLenaCloud.bind(this)
    this.textUserName=this.textUserName.bind(this)
    this.textPassWord=this.textPassWord.bind(this)
    this.textEmail=this.textEmail.bind(this)
    this.sendLogin=this.sendLogin.bind(this)
    this.state={
      username:'',
      password:'',
      email:'',
      userwarn:false,
      passwordwarn:false,
      emailwarn:false,
      loading: false, 
    }
  }
  textUserName(e){
    var re = /^[a-zA-Z0-9_\u4e00-\u9fa5]{4,10}$/g;
    if(e.target.value.search(re)==-1){
      this.setState({userwarn:true})
    }else{
      this.setState({userwarn:false})      
    }
  }
  textPassWord(e){
    var re = /^[a-zA-Z0-9_\u4e00-\u9fa5]{6,12}$/g;
    if(e.target.value.search(re)==-1){
      this.setState({passwordwarn:true})
    }else{
      this.setState({passwordwarn:false})      
    }
  }
  textEmail(e){
    var re = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/g;
    if(e.target.value.search(re)==-1){
      this.setState({emailwarn:true})
    }else{
      this.setState({emailwarn:false})      
    }
  }
  receiveUserName(e){
      this.setState({username:e.target.value})     
  }
  receivePassword(e){
     this.setState({password:e.target.value})
  }
  receiveEmail(e){
     this.setState({email:e.target.value})
  }
  sendLenaCloud(){
    var _this=this;
    var username = this.state.username;
    var password = this.state.password;
    var email = this.state.email;
    var user = new AV.User();
    user.setUsername(username);
    user.setPassword(password);
    user.setEmail(email);
    this.setState({loading:true})
    user.signUp().then(function (loginedUser) {
      history.push('/App')
      _this.setState({loading:false})      
    }, (function (error) {
      warning(JSON.stringify(error.message));    
      _this.setState({loading:false})      
    }));
  }
  sendLogin(){
    
    var _this=this;
    var username = this.state.username;
    var password = this.state.password;
    const location = {
      pathname: '/App',
      state: { username: username }
    }
    
    this.setState({loading:true})    
    AV.User.logIn(username, password).then(function (loginedUser) {
      history.push(location)
      _this.setState({loading:false})            
    }, function (error) {
      warning(JSON.stringify(error.message));
      _this.setState({loading:false})            
    });
  
  }

  render(){
    const userwarn=this.state.userwarn;
    const passwordwarn=this.state.passwordwarn;
    const emailwarn=this.state.emailwarn;
    const isloading=this.state.loading;
    console.log(isloading)
    const textFn=(warns)=>{if(warns){return warn};return hidden}
    const textLoading=(loading)=>{if(loading){return visible};return normal}
    return <div className="login-wrap">
          <span className="span" style={textLoading(isloading)}><Icon loading name='spinner' size="huge"/></span>
          <div className="login-html">
            <input type="radio" id="tab-1" name="tab" className="sign-in" defaultChecked /><label htmlFor="tab-1" className="tab">Sign In</label>
            <input type="radio" id="tab-2" name="tab" className="sign-up" /><label htmlFor="tab-2" className="tab">Sign Up</label>
            <div className="login-form">
              <div className="sign-in-htm">
                <div className="group">
                  <label htmlFor="user" className="label">Username</label>
                  <input id="user" type="text" className="input" onBlur={this.receiveUserName} />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">Password</label>
                  <input id="pass" type="password"  onBlur={this.receivePassword} className="input" data-type="password" />
                </div>
                <div className="group">
                  <input id="check" type="checkbox" className="check" defaultChecked />
                  <label htmlFor="check"><span className="icon" /> Keep me Signed in</label>
                </div>
                <div className="group">
                  <input type="submit" className="button" defaultValue="Sign In" onClick={this.sendLogin} />
                </div>
                <div className="hr" />
                <div className="foot-lnk">
                  <a href="#forgot">Forgot Password?</a>
                </div>
              </div>
              <div className="sign-up-htm">
                <div className="group">
                  <label htmlFor="user" className="label">Username {userwarn?<span style={{color:'#ff5b5b',float:'right'}}>用户名要求4-10任意数字和汉字</span>:null}</label>
                  <input id="user" required  type="text" className="input" style={textFn(userwarn)} onBlur={this.receiveUserName} onChange={this.textUserName}/>
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">Password {passwordwarn?<span style={{color:'#ff5b5b',float:'right'}}>密码要求6-12任意数字和汉字</span>:null}</label>
                  <input id="pass" required  type="password" className="input" style={textFn(passwordwarn)} data-type="password" onBlur={this.receivePassword} onChange={this.textPassWord} />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">Email Address{emailwarn?<span style={{color:'#ff5b5b',float:'right'}}>emial要求正常格式</span>:null}</label>
                  <input id="pass" required  type="text" className="input" style={textFn(emailwarn)} onBlur={this.receiveEmail} onChange={this.textEmail}/>
                </div>
                <div className="group group-bottom">
        
                  <input onClick={this.sendLenaCloud} type="submit" className="button" defaultValue="Sign Up"  />
                </div>
              </div>
            </div>
          </div>
          </div>        
          
}
          }
    
  
export default Logup


import React from 'react';
import {Route,Link ,BrowserRouter as Router, } from 'react-router-dom'
import './siderbar.css'
import App from '../../App.js'
import Projects from '../../projects/project.js'
import { Icon, Popup, Button,Card,Header , Modal , Input} from 'semantic-ui-react'
import AV from 'leancloud-storage'
import {createStore} from 'redux'

// let store=createStore()
const content=<section>
<Button fluid className='reset-button'>未完成的项目</Button>
<Button fluid className='reset-button'>已完成的项目</Button>
</section>
 let randomIcon=function (){
	const iceicon=[]
	for(var i=1;i<20;i++){
		let item='icon-icecream-'+i
		iceicon.push(item)
	}
	return iceicon[Math.floor(Math.random()*19)]
}
 class SiderBar extends React.Component{
	 constructor(props){
		 super(props)
		 this.receiveMessage=this.receiveMessage.bind(this)
		 this.state={
			 ProjectList:[],
			 DescriptionList:[],
			 todoFolderid:'',
			 result:null,
			 avatar:null
			} 
	 }
	
	  receiveMessage(idname,descript){
		this.setState(
			()=>{
				this.state.ProjectList.push(idname)		
				this.state.DescriptionList.push(descript)		
			}
		)
	}
	componentWillMount(){
		this.setState({
			avatar:this.props.avatar
		})
		var _this=this;
		let query=(username)=>{
			var query = new AV.Query('TodoFolder');
			   query.equalTo('username', username);
			   query.find().then(function (results) {
				_this.setState({result:results})		
		}, function (error) {
		})
		}
		query(this.props.username)
		
	 }
	
	

	   
		 render(){
			const username=this.props.username; 
			const email=this.props.email; 
			const projectlist=this.state.Projectlist;
			// 第一个参数是 className，第二个参数是 objectId
			
			 return <div className='sidebar-bg'>
				 <section>
				 <Logo/>
				 <Project/>
				 <List avatar={this.state.avatar} list={this.state.ProjectList} 
				 comelist={this.state.result} 
				 username={this.props.username}
				 />
				 </section>
				 <AddProject username={username} receiveMessage={this.receiveMessage}/>
			 </div>	
		 }
 }
 class Logo extends React.Component{
	 constructor(props){
		 super(props)

	 }
		 render(){
			 return <div className='logo'>Meister<i>Todo</i></div>		 
		 }
 }
 class Project extends React.Component{
	 constructor(props){
		 super(props)
		 this.state={
			 list:null
		 }	
	 }
		 render(){
			 return <div className='projects'>
						<div>Projects </div>
						
						<Popup
						position="bottom center"
						trigger={<Icon className="arrow" name='caret down' />}
						content={content}
						on='click'
						hideOnScroll
						/>
			 		</div>		 
		 }
 }
 class List extends React.Component{
	 constructor(props){
		 super(props)
		 this.state={
			 list:[]
		 }
	 }
	 componentWillReceiveProps(props,state){
		   let arr=[];
		   props.comelist.forEach(item =>{
			 arr.push(item.attributes.project.arr[0].busName)
		   } )
		   let list=arr.concat(props.list)
		 
		   this.setState({list:list})
		   
	 }

		 render(){
			 let avatar=this.props.avatar
			 let list=this.state.list;
		
			 return <ol className='list'>

						{list.map(
						(e)=>{
							let url="/project/"+e							
							let location = {
								pathname: url,
								state: { 
									avatar: avatar,
									username: this.props.username}
							}
							return <li className="project-item" key={e}> 
									<Link className="link" to={location}> 								   
								   <Icon name='selected radio' className="selected-icon" size='large' />
									<div className="project-name">{e}</div>
									<svg className="icon icon2" aria-hidden="true">
										<use href={'#'+randomIcon()}></use>
									</svg>
									</Link>
								</li>
						}
					)}
						
			 		</ol>		 
		 }
 }
 class AddProject extends React.Component{
	 constructor(props){
		 super(props)
		 this.postMessage=this.postMessage.bind(this)
		 this.posName=this.posName.bind(this)
		 this.sendMessage=this.sendMessage.bind(this)
		 this.state = { 
			 open: false ,
			 busMesage:'',
			 busName:'',
			 isdone:false,
			 results:''
			}
		 
		   
	 }
	 show = (dimmer) => () => this.setState({ dimmer, open: true })
	 close = () =>{ 
		 this.setState({ open: false })	
		 this.setState({ isdone: true })	
		}
	 postMessage=(e)=>{
		 this.setState({busMesage:e.target.value})}
	 posName=(e)=>{
		 this.setState({busName:e.target.value})}
	 sendMessage=()=>{
		 this.props.receiveMessage(this.state.busName,this.state.busMesage)
	 } 
	 componentDidUpdate(nextProps, nextState){
		 let _this=this
		 let arr=[]
		 arr.push({busName:nextState.busName,busMesage:nextState.busMesage,todocount:0})
         let objarr={'arr':arr}
		 if(this.state.isdone){
			this.setState({isdone:false})	 			
			var Todo = AV.Object.extend('Todo');
			var TodoFolder = AV.Object.extend('TodoFolder');
			// 新建对象
			var todoFolder = new TodoFolder();
			// 设置名称
			todoFolder.set('project',objarr);
			todoFolder.set('username',_this.props.username);
			// 设置优先级
			todoFolder.set('priority',1);
			todoFolder.save().then(function (todo) {
			
			
			}, function (error) {
			  console.log(error);
			});
						 						 
		 }
	
	 }

		 render(){
			 const { open, dimmer } = this.state
			 return <div className='add'>
				
					<svg className="icon icon-add" aria-hidden="true" onClick={this.show()}>
    							<use href='#icon-jia-copy'></use>
							</svg>
					 <span>New Project</span>
						<Modal dimmer={dimmer} open={open} onClose={this.close}
								size="mini" onUnmount={this.sendMessage}
						>
					<Modal.Header className='modal-header'>
						New Project 🙋
					</Modal.Header>
					<Modal.Content >
					<Modal.Description className="modal-descript">
					请输入项目名称
					</Modal.Description>
					<Input placeholder='Project Name' onBlur={this.posName}
					
					 fluid className="input-description"/>
					
					<Modal.Description className="modal-descript">
					请输入项目描述
					</Modal.Description>
					<Input placeholder='Project Description' fluid onBlur={this.postMessage} />
					</Modal.Content>
					<Modal.Actions>
					<Button color='black' onClick={this.close}>
						Nope
					</Button>
					<Button color='green' onClick={this.close}>
						creat new project
					</Button>
					
					</Modal.Actions>
					</Modal>
			 		</div>		 
		 }
 }


export default {SiderBar,Logo}


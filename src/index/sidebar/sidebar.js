import React from 'react';
import {Route,Link ,BrowserRouter as Router, } from 'react-router-dom'
import './siderbar.css'
import App from '../../App.js'
import Projects from '../../projects/project.js'
import { Icon, Popup, Button,Card,Header , Modal , Input} from 'semantic-ui-react'

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
	
	
		 render(){
			 return <div className='sidebar-bg'>
				 <section>
				 <Logo/>
				 <Project/>
				 <List list={this.state.ProjectList}/>
				 </section>
				 <AddProject receiveMessage={this.receiveMessage}/>
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
		 
	 }
	
		 render(){
			 return <ol className='list'>

						{this.props.list.map(
						(e)=>{
							return <li className="project-item" key={e}> 
									<Link className="link" to="/project"> 								   
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
			 busName:''
		
			
			}
		 
		   
	 }
	 show = (dimmer) => () => this.setState({ dimmer, open: true })
	 close = () => this.setState({ open: false })
	 postMessage=(e)=>{
		 this.setState({busMesage:e.target.value})}
	 posName=(e)=>{
		 this.setState({busName:e.target.value})}
	 sendMessage=()=>{
		 this.props.receiveMessage(this.state.busName,this.state.busMesage)
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


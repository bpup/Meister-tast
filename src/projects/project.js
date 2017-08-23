import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import {Container,Image,Popup,Icon,Card,Button,Search,Label,Confirm} from 'semantic-ui-react'
import SiderBar from './../index/sidebar/sidebar.js'
import './project.css'
import {
	BrowserRouter as Router,
	Route,
	Link
  } from 'react-router-dom'
import AV from 'leancloud-storage'
import createHistory from 'history/createHashHistory'
const history = createHistory()

const headerColor=[
	'#00AAFF',
	'#8F7EE6',
	'#47CC8A',
	'#30BFBF',
	'#8ACC47',
	'#34495e',
	'#d35400',
	'#3F51B5',
	'#E91E63',
]
const headerIcon=[
	'dashboard',
	'ticket',
	'find',
	'birthday',
	'lesbian',
	'heterosexual',
	'asl',
	'assistive listening systems',
	'block layout',
	'maximize',
	'flag',
	'fire',
	'sun',
	'bullseye',
	'snowflake outline',
	'cube',
	'film',
	'game',
	'motorcycle',
	'map outline',
	'reddit',
	'empire',
	'twitch',
	'detective',
]
const src=[
	'/avatar/project1.svg',
	'/avatar/project2.svg',
	'/avatar/project3.svg',
	'/avatar/project4.svg',
	'/avatar/project5.svg',
	'/avatar/project6.svg',
	'/avatar/project7.svg',
	'/avatar/project8.svg',
	'/avatar/project9.svg',
	'/avatar/project10.svg',
	'/avatar/project11.svg',
	'/avatar/project12.svg',
	'/avatar/project13.svg',
	'/avatar/project14.svg',
]
const randomAvatarP=()=>{
	return src[parseInt(Math.random()*src.length)]
}
const randomIcon=()=>{
	return headerIcon[parseInt(Math.random()*headerIcon.length)]
}
const randomColor=()=>{
	return headerColor[parseInt(Math.random()*9)]
}
const usename=(projectname)=>{return <div>
				<span className='username'>{projectname}</span>
				<Icon className="arrow" color="grey" name='caret down' />
				</div>}
const content=<Card className="clear-border">
      <Card.Content>
        <Card.Header>
          Ptojects
        </Card.Header>
        <div className='ui two buttons'>
      
        </div>
      </Card.Content>
    </Card>


class Project extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		let avatar=this.props.location.state?this.props.location.state.avatar:'/avatar/12.svg'
		let username=this.props.location.state?this.props.location.state.username:'dear'
		return <div style={{height:'100%'}}>
			     <Header projectname={this.props.match.params.id} avatar={avatar} username={username}/>
		         <main className="tastwarp">
					 <Tastbar headerText='Open' tagColor="teal" tagText='🙋'/>
					 <Tastbar headerText='in Progress' bgmodal='true' tagColor="pink" tagText='🏃🏃'/>
					 <Tastbar headerText='Done' tagColor="grey"  tagText='👍'/>
				  </main>
		</div>
	}
}
class Header extends React.Component{
	constructor(props){
		super(props)
		this.handelLogOut=this.handelLogOut.bind(this)
	}
	handelLogOut(){
		AV.User.logOut();
		var currentUser = AV.User.current();
		history.push('/')
	}
	render(){
		return <Container fluid className="header">
			  <section>
				 <Link to="/App"> 
				<SiderBar.Logo>
				</SiderBar.Logo>
				</Link>
                <div className="vertical-line"></div>
			    <Image className="avatar" avatar src={randomAvatarP()}/>
				<Popup
				        className="project-search"
						position="bottom center"
						trigger={usename(this.props.projectname)}
						content={content}
						on='click'
						hideOnScroll
						/>
				<div className="vertical-line"></div>
				<Icon className="github" color="teal" name='github alternate' />
				</section>
			 	 <section className="righr-part">
			
				  <svg className="icon icon-jia" aria-hidden="true">
					<use href='#icon-jia'></use>
					</svg>
					<div className="vertical-line"></div>
					<svg className="icon icon-search" aria-hidden="true">
					<use href='#icon-search'></use>
					</svg>
					<div className="vertical-line"></div>		
				  <svg className="icon icon-text" aria-hidden="true">
					<use href='#icon-test-copy'></use>
					</svg>
					<Label as='a' className="logout" color='blue' image>
						<img src={this.props.avatar} />
                        {this.props.username}
					<Label.Detail onClick={this.handelLogOut}>退出</Label.Detail>
					</Label>
				</section>

	    	</Container>
	}
}
class TodoADD extends React.Component{
   constructor(props){
	   super(props)
	   this.handleAdd=this.handleAdd.bind(this)
   }
   handleAdd(e){
	   this.props.addList()
}
   render(){
	return <div className="circle-add" onClick={this.handleAdd}></div>	
   }
}
class TastHeader extends React.Component{
	constructor(props){
		super(props)
	}
	shouldComponentUpdate(nextProps, nextState) {
		return false
	}
	
	render(){
		return <header className="tastbar-header" style={{background:randomColor()}}>
		<Icon name={randomIcon()} size="big" className="icon-color" color="white"></Icon>
		<p>{this.props.headerText}</p>
		<Icon className="arrow1" color="grey" name='caret down' />
	</header>
	}
}
class Tastbar extends React.Component{
	constructor(props){
		super(props)
		this.addList=this.addList.bind(this)
		this.handelEdit=this.handelEdit.bind(this)
		this.handelEditChange=this.handelEditChange.bind(this)
		this.show=this.show.bind(this)
		this.handleCancel=this.handleCancel.bind(this)
        this.state={
			count:0,
			inputarr:[],
			bgnotice:false,
			open: false, 
			result: 'show the modal to capture a result'
		}
	}
	  show = () => this.setState({ open: true })
	  handleConfirm = () => this.setState({ result: 'confirmed', open: false,isdone:true })
	  handleCancel = () => this.setState({ result: 'cancelled', open: false })
   addList(){
		let count=++this.state.count
		this.setState({
			count:count,
			inputarr:Array(count),
			bgnotice:true,
			isdone:false
		})

	
	}
	handelEdit(e){
			e.target.setAttribute('disabled',true)
			e.target.style.backgroundColor='#fff'
			e.target.style.border='none'
			e.target.style.cursor='pointer'
			
	}
	handelEditChange(e){
		e.preventDefault();
		e.target.removeAttribute('disabled')
		e.target.style.border='1px solid #00AAFF'
		e.target.style.cursor='auto'
		
	}		

	render(){
		const { open, result } = this.state
		let arr=this.state.inputarr;
		let newarr=[]
		const done=(state)=>{
			if(this.state.isdone){
				return 'background:"url("./done.svg") right 38%  no-repeat", backgroundSize:"84px 84px"'
			}
		}
		let bgdone=done(this.state.isdone)
		for(var i=0;i<arr.length;i++){
			newarr.push(<div><input type="text" onDoubleClick={this.handelEditChange} key={i} onBlur={this.handelEdit} className="animate-input" 
			placeholder="请输入这个项目准备的todo name"
			style={{animation: "inputainmate  .2s linear 0s 1 normal forwards",top:i*60+110+'px',border:'1px solid #00AAFF',bgdone}}/>
			{!this.state.isdone&&<Label as='a' size='mini' onClick={this.show} style={{top:i*60+116+'px',left:'318px'}} color={this.props.tagColor} 
			className='ribbon' ribbon='right'>{this.props.tagText}</Label>} 
					<Confirm 
					content="您确定这个任务认真完成了吗？"
				open={open}
				onCancel={this.handleCancel}
				onConfirm={this.handleConfirm}
				/>}
   </div>
		)

		}
	  
		return <section className="tastbar" style={this.props.bgmodal&&{background:"rgba(0,0,0,0.1)"}}>
				<TastHeader headerText={this.props.headerText}/>
				<TodoADD addList={this.addList}/>	
				{newarr} 
				{!this.state.bgnotice&&<section className="tips">
				<svg className="icon icon-kong2-copy" aria-hidden="true">
					<use href='#icon-kong2-copy'></use>
				</svg>
				<p>No tasks</p>
				<p className='notice'>
					Darg tasks here or click to add new task 😁

				</p>
				</section>
				}
			</section>
				
		      
	}
}

export default Project
import React, { Component } from 'react';
import {createStore} from 'redux'
import 'semantic-ui-css/semantic.min.css';
import {Container,Image,Popup,Icon,Card,Button,Search,Label,Confirm} from 'semantic-ui-react'
import SiderBar from './../index/sidebar/sidebar.js'
import './project.css'
import {
	withRouter,
	BrowserRouter as Router,
	Route,
	Link
  } from 'react-router-dom'
import PropTypes from 'prop-types'
import AV from 'leancloud-storage'
import createHistory from 'history/createHashHistory'
const history = createHistory()
const themerandomarr=[
    'tastwarp1',
    'tastwarp2',
    'tastwarp3',
    'tastwarp4',
    'tastwarp5',
    'tastwarp6',
    'tastwarp7',
    'tastwarp8',
    'tastwarpimg1',
    'tastwarpimg2',
    'tastwarpimg3',
    'tastwarpimg4',
    'tastwarpimg5',
    'tastwarpimg6',
    'tastwarpimg7',
    'tastwarpimg8',
    'tastwarp9',
    'tastwarp10',
    'tastwarp11',
    'tastwarp12',

]
const randomtheme=()=>{
	return themerandomarr[parseInt(Math.random()*themerandomarr.length)]
  
}
let actions=(active,pay)=>{
	return {
		type:active,
		payload:pay
	}
}
let initLength=document.getElementsByClassName('animate-input').length;	
let todoSave=(state=[],action)=>{
     switch (action.type) {
		 case 'Open':
			if(action.payload.isdone==true){
				state.unshift(action.payload)
				return state
				
			}else{
				return state.concat(action.payload)
			}

		 case 'in Progress':
		 if(action.payload.isdone==true){
			state.unshift(action.payload)
			return state
			
		}else{
			return state.concat(action.payload)
		}

		 case 'Done':
		 if(action.payload.isdone==true){
			state.unshift(action.payload)
			return state
			
		}else{
			return state.concat(action.payload)
		}
		 case 'TODO1':
		 if(action.payload.isdone==true){
			state.unshift(action.payload)
			return state
			
		}else{
			return state.concat(action.payload)
		}
		 case 'TODO2':
		 if(action.payload.isdone==true){
			state.unshift(action.payload)
			return state
			
		}else{
			return state.concat(action.payload)
		}
		 case 'TODO3':
		 if(action.payload.isdone==true){
			state.unshift(action.payload)
			return state
			
		}else{
			return state.concat(action.payload)
		}
	
		 default:
			 break;
	 }
}

let store=createStore(todoSave)
let uniqueObject= (arr)=> {
	const seen = new Map()
	return arr.filter((a) =>!seen.has(a.value)&& seen.set(a.value, 1))
  }
// let uniqueObject2= (arr)=> {
	
// 	 let arrsisdone=arr.filter((a) => a.isdone )
// 	 if(arrsisdone.length>0){
// 	 let repeatValue=arrsisdone[0].value
// 	 let removerepeat=arr.filter((a) => a.isdone&&a.value==repeatValue )
//   }
let unsubscribe=store.subscribe(()=>{
		var state=store.getState()
		let username=state[0].username;
		let projectname=state[0].projectname;
		var query = new AV.Query('TodoFolder');
		query.equalTo('username', username);
		query.equalTo('projectname', projectname)
		query.find().then(function (todos) {
			var uniqustate=uniqueObject(state)
			todos.forEach(function(todo) {	
				if(todo.attributes.todolist) {
					var beforestate=todo.attributes.todolist.uniqustate
					uniqustate=uniqueObject(uniqustate.concat(beforestate))
					todo.set('todolist', {uniqustate});
				}else{
					todo.set('todolist', {uniqustate});	
				}
				
			  });
			
			return AV.Object.saveAll(todos)
		}).then(function(todos) {
			
		  }, function (error) {
			console.log(error)
			// 异常处理
		  });
	
		
})


  
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
// const Usename=(projectname)=>{return <div>
// 				<span className='username'>{projectname}</span>
// 				<Icon className="arrow" color="grey" name='caret down' />
// 				</div>}
// const content=(list,username)=>{return <Card className="clear-border">
//       <Card.Content>
//         <Card.Header>
//           Ptojects
//         </Card.Header>
// 		{list.map((item)=>{return <Button name={item} key={item} fluid className='list-button'>
// 			<Link to={{
// 				pathname:'/project/'+item,
// 				state:{username:username}
// 			}}>{item}</Link></Button>})}
//       </Card.Content>
//     </Card>
// }
class Project extends React.Component{
	constructor(props){
		super(props)
		this.addList=this.addList.bind(this)
		this.state={
			projectlist:null,
			projectitem:[],
			count:3,
			postarr:[]

		}
	}
	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	  }
	 componentWillReceiveProps = (nextProps) => {
		console.log(this.props,nextProps,'ll')
	 }
	
	componentDidMount(){
		// console.log(this.props,'ddd')
		var _this=this
		let username=this.props.location.state?this.props.location.state.username:'dear'
		let projectname=this.props.match.params.id
		var query = new AV.Query('TodoFolder');
		query.equalTo('username', username);
		query.equalTo('projectname', projectname)
		let qu=query.find().then(function (results) {
			
				let receive=results[0].attributes.todolist.uniqustate;
				let receives=uniqueObject(receive)
				let arr=receives.map((item)=>{
				  return item
				})	
				_this.setState({
					postarr:arr
				})
			
		})
		
	}
	
	addList(e){
		this.setState({
			count:++this.state.count
		})
     
	}

	// changeHash(locations){
	// 		console.log(match, location, history)
    // 	this.props.history.replace(locations.url)
	// }
	render(){
		const { match, locations, history } = this.props		
		let avatar=this.props.location.state?this.props.location.state.avatar:'/avatar/12.svg'
		let username=this.props.location.state?this.props.location.state.username:'dear'
		let location=this.props.location
		let projectitem=this.state.projectitem;
		let postarr=this.state.postarr;	
		let inopen=[]	
		let inprogress=[]	
		let indone=[]
		let intodo1=[]
		let intodo2=[]
		let intodo3=[]
	
		postarr.map((item)=>{
			if(item.title=='Open'){
				let descript={
					value:item.value,
					isdone:item.isdone
				}
				inopen=inopen.concat(descript)
			}else if(item.title=='in Progress'){
				let descript={
					value:item.value,
					isdone:item.isdone
				}
				inprogress=inprogress.concat(descript)
			}else if(item.title=='Done'){
				let descript={
					value:item.value,
					isdone:item.isdone
				}
				indone=indone.concat(descript)
			}else{
				if(item.title=='TODO1'){
					let descript={
						value:item.value,
						isdone:item.isdone
					}
					intodo1=intodo1.concat(descript)
			}else if(item.title=='TODO2'){
					let descript={
						value:item.value,
						isdone:item.isdone
					}
					intodo2=intodo2.concat(descript)
			}else if(item.title=='TODO3'){
				let descript={
					value:item.value,
					isdone:item.isdone
				}
				intodo3=intodo3.concat(descript)
		}
		}
		})
	
	
		   
		return <div style={{height:'100%'}}>
			     <Header projectname={this.props.match.params.id}
				  location={location}
				  history={history}
				  avatar={avatar} username={username}
				  changeHash={this.changeHash}/>
		         <main className="tastwarpimg4">
					 <Tastbar username={username} in={inopen}   projectname={this.props.match.params.id} headerText='Open' tagColor="teal" tagText='🙋'/>
					 <Tastbar  username={username} in={inprogress}   projectname={this.props.match.params.id} headerText='in Progress' bgmodal='true' tagColor="pink" tagText='🏃🏃'/>
					 <Tastbar username={username}  in={indone} projectname={this.props.match.params.id} headerText='Done' tagColor="grey"  tagText='👍'/>
					 <ExtarBar
					 intodo1={intodo1}
					 intodo2={intodo2}
					 intodo3={intodo3}
					 username={username}
					 projectname={this.props.match.params.id}
					 count={this.state.count}
					 />					 
					 <TodoADD className='fixadd' update='updated' count={this.state.count} addList={this.addList}/>
				  </main>
		</div>
	}
}
class ExtarBar extends React.Component{
	constructor(props) {
		super(props)
		this.state={
		projectitem:[],
		}
	}
	componentWillReceiveProps(nextProps) {
		let count=nextProps.count;
		let projectname=nextProps.projectname;
		if(count%2==0&&count!=6){
			var tastbar=<Tastbar bgmodal='true' 
			update='updated' headerText='TODO1'
			 tagText='🤾' tagColor="olive"
			 in={this.props.intodo1}
			 username={this.props.username}  projectname={this.props.projectname}
			 key='updated1'
			 count={this.props.count}/>
		  }else{
			  if(count==5){
			var tastbar=<Tastbar tagText='🚴'
			key={'updated2'+projectname}
			in={this.props.intodo2}			
			 update={'updated'+projectname} tagColor="pink"		   
			 username={this.props.username} projectname={this.props.projectname}
			  headerText='TODO2' count={this.props.count}/>
			  }else if(count==6){
				  var tastbar=<Tastbar tagText='🚴'
				   bgmodal='true' update='updated'
			 		in={this.props.intodo3}
				   key={'updated3'+projectname}
				   username={this.props.username} projectname={this.props.projectname}
				   tagColor="violet" headerText='TODO3' count={this.props.count}/>
				  
			  }
			  
		  }
		  this.setState({
			count:count,
			projectitem:this.state.projectitem.concat(tastbar)
		  })
	}
	

	render(){
		let projectname=this.props.projectname;
		let username=this.props.username;
		let count=this.props.count;
		let projectitem=this.state.projectitem
		let Newgroup=()=>{let newgroup=projectitem.map((item)=>{
			return item
	})
	return <div className="addwarp" >{newgroup}</div>
	}	
		return Newgroup()
	}

}


class Header extends React.Component{
	constructor(props){
		super(props)
		this.handelLogOut=this.handelLogOut.bind(this)
		this.changetheme=this.changetheme.bind(this)
	}
	handelLogOut(){
		AV.User.logOut();
		var currentUser = AV.User.current();
		history.push('/')
	}

		
	componentWillMount(){
	
		   let list=this.props.location.state?this.props.location.state.list:[]
		   this.setState({
			   projectlist:list
		   })
	}
     changetheme(){
		let calssname=randomtheme();
		let prevclass=document.querySelector('main').className
		document.querySelector('main').classList.remove(prevclass)
		document.querySelector('main').classList.add(calssname)
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
				<span className='username'>{this.props.projectname}</span>
				<div className="vertical-line"></div>
				<Icon className="github" onClick={this.changetheme} color="teal" name='github alternate' />
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
	   this.state={
		   count:0
	   }
   }
   handleAdd(e){
	   let counts=this.props.count;
	   counts=++counts
       this.setState({
		   count:counts
	   })
	   if(counts==6&&this.props.update=='updated'){
		   e.target.style.display='none'
	   }
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
		if(this.props.caneidt=='updated'){
		return true
		}else{
			return false
		}
}
	render(){
		return <header className="tastbar-header" style={{background:randomColor()}}>
		<Icon name={randomIcon()} size="big" className="icon-color" color="white"></Icon>
		<p>{this.props.headerText}</p>
		<Icon className="arrow1" color="grey" name='caret down' />
	</header>
	}
}

class TaskInput extends React.Component{
	constructor(props){
		super(props)
		this.handelEditChange=this.handelEditChange.bind(this)
		this.handelEdit=this.handelEdit.bind(this)
		this.show=this.show.bind(this)
		this.handleConfirm=this.handleConfirm.bind(this)
		this.handleCancel=this.handleCancel.bind(this)
		this.state={
			count:0,
			bgnotice:false,
			open: false, 
			hasdone:false,
			value:null,
			result:false,
					
		}
	}


	componentDidUpdate(prevProps, prevState) {
		if(this.state.value==null||this.state.value==''||this.state.value==' '){
			return 
		}
		
	if(prevState.value==this.state.value&&this.state.result=='confirmed'){
		var action=actions(this.props.headerText,{
			value:this.state.value,
			isdone:true,
			title:this.props.headerText,
			projectname:this.props.projectname,
			username:this.props.username
		})
		let dispatch=store.dispatch(action)
		

	}
	
	if(prevState.value!==this.state.value){
		var action=actions(this.props.headerText,{
			value:this.state.value,
			isdone:false,
			title:this.props.headerText,
			projectname:this.props.projectname,
			username:this.props.username
		})
		let dispatch=store.dispatch(action)		
	}

	
}
	
	

			
			
		
				
	
	handelEditChange(e){
		e.preventDefault();
		e.target.removeAttribute('disabled')
		e.target.style.border='1px solid #00AAFF'
		e.target.style.cursor='auto'
		let inputarr=document.getElementsByClassName('animate-input')	
		let inputarrval=Array.prototype.map.call(inputarr,(item)=>{
			return item.value
		})
		  
		let newinputarrval=inputarrval.filter((ele,i)=>{
		   return ele==e.target.value
		})
		console.log(newinputarrval,'inputarrval')	

		if(newinputarrval.length>=2){
			e.target.value='todo name不能重复哦'
			e.target.style.border='1px solid red'
		}else{
		
	   if(e.target.value=='todo name不能重复哦5	'){
			 return
			}else{
				this.setState({
					value:e.target.value
				})
			}
		
		}	
	
		
	}	
	handelEdit(e){
		// console.log(this.state.len,'len')
		e.target.setAttribute('disabled',true)
		e.target.style.backgroundColor='#fff'
		e.target.style.border='none'
		e.target.style.cursor='pointer'
			let inputarr=document.getElementsByClassName('animate-input')	
			let inputarrval=Array.prototype.map.call(inputarr,(item)=>{
				return item.value
			})
			  
			let newinputarrval=inputarrval.filter((ele,i)=>{
               return ele==e.target.value
			})
			console.log(newinputarrval,'inputarrval')	
	
			if(newinputarrval.length>=2){
				e.target.value='todo name不能重复哦'
				e.target.style.border='1px solid red'
			}else{
			
	       if(e.target.value=='todo name不能重复哦5	'){
				 return
				}else{
					this.setState({
						value:e.target.value
					})
				}
			
			}	
		
		
	}

	show = () =>{ 
		this.setState({ open: true })
	     return false
	}

	handleConfirm = (e) => {
		this.setState({ 
		result: 'confirmed',
		open: false,
		hasdone:true,
	})
	}

	handleCancel = () =>{
		this.setState(
		{ result: 'cancelled', open: false }	
	)}
	render(){
		let hasdone=this.state.hasdone
		let isdone=this.props.isdone
		// console.log(isdone,'ff')
		let donestyle=hasdone||!!this.props.isdone?'animate-input modalsure':'animate-input'
		const { open, result } = this.state
		return <div style={{width:'100%'}}><input type="text" 
		onDoubleClick={this.handelEditChange}
		onBlur={this.handelEdit} 
		className={donestyle}
		defaultValue={this.props.val||''}
		placeholder="请输入这个项目准备的todo name"
		style={{animation: "inputainmate  .2s linear 0s 1 normal forwards",
		top:this.props.index*60+110+'px',border:'1px solid #00AAFF',
		}} />
		{<div>{(!hasdone&&!isdone)&&<Label as='a'  size='mini' onClick={this.show} style={{top:this.props.index*60+116+'px',left:'318px'}} color={this.props.tagColor} 
		className='ribbon' ribbon='right'>{this.props.tagText}</Label>}
		<Confirm content="您确定这个任务认真完成了吗？" open={open} onCancel={this.handleCancel}
		onConfirm={this.handleConfirm}/></div>}
		</div>

}}



class Tastbar extends React.Component{
	constructor(props){
		super(props)
		this.addList=this.addList.bind(this)
		this.handelEdit=this.handelEdit.bind(this)
        this.state={
			count:0,
			inputarr:[],
			bgnotice:false,
			result: 'show the modal to capture a result',
		}
	}
	
   addList(){
		let count=++this.state.count
		this.setState({
			count:count,
			bgnotice:true,
			inputarr:this.state.inputarr.concat(['']),
		})
	}

	
	handelEdit(e){
		this.props.handelEdit(e)
	}
	render(){
		let inputarr=this.state.inputarr;
		// console.log(inputarr,'inputarr')
		let bgmodal=this.props.bgmodal
		let count=this.props.count
		let lefts=0
		let classNames=bgmodal?'tastbar bg':'tastbar'
		return <section className={classNames}  style={{left:0}}>
				<TastHeader 
				headerText={this.props.headerText}
				caneidt={this.props.update}
				/>
				<TodoADD addList={this.addList}
				count={this.state.count}
				/>	
	            <InputList 
			    in={this.props.in}
				handelEdit={this.handelEdit}
				username={this.props.username}
				projectname={this.props.projectname}
				inputarr={inputarr}
				headerText={this.props.headerText}
				tagColor={this.props.tagColor}
				tagText={this.props.tagText}
				/>
				{this.props.in.length==0&&!this.state.bgnotice&&<section className="tips">
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

class InputList extends React.Component{
		constructor(props){
			super(props)
			this.state={
				val:null,
				todolistarr:[],
				isdone:null,
				count:0,
				instate:null
			}
		}
	 componentWillReceiveProps = (nextProps) => {
	   let ins=nextProps.in;
	   this.setState({
		 instate:ins
	   })
	 }
	 
	 
	   
	
	  
		render(){
			var inputarr=this.props.inputarr;
			let instate=this.state.instate;
			if(instate!=null){
				inputarr=instate.concat(inputarr)
				// console.log(inputarr[0],'demo')
			}	
			
			
			let vals=this.props.val
			let inputlist=inputarr.map((item,index)=>{
				return <TaskInput
			   key={index}
			   isdone={item.isdone||null}
			   username={this.props.username}
			   projectname={this.props.projectname}
			   headerText={this.props.headerText}
			   index={index}
			   tagColor={this.props.tagColor}
			   tagText={this.props.tagText}
			   val={item.value||null}
			/>})
			return <div style={{width:'100%'}}>{inputlist}</div>	
		}

		}



	
			 	



export default withRouter(Project)
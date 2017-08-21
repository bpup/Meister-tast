import React from 'react';
import {
	HashRouter,
	Switch,
	Route,
	Link
  } from 'react-router-dom'
import './signInTool.css'
import { Icon ,Tab,Button,Label, Statistic,Popup,Card, Image} from 'semantic-ui-react'
import AV from '../../index.js'
import createHistory from 'history/createHashHistory'

const history = createHistory()
const src=[
	'/avatar/1.svg',
	'/avatar/2.svg',
	'/avatar/3.svg',
	'/avatar/4.svg',
	'/avatar/5.svg',
	'/avatar/6.svg',
	'/avatar/7.svg',
	'/avatar/8.svg',
	'/avatar/9.svg',
	'/avatar/10.svg',
	'/avatar/11.svg',
	'/avatar/12.svg',
	'/avatar/13.svg',
	'/avatar/14.svg',
	'/avatar/15.svg',
	'/avatar/16.svg',
	'/avatar/17.svg',
]
const randomAvatar=()=>{
	return src[parseInt(Math.random()*src.length)]
}


class Notifications extends React.Component{
	constructor(props){
		super(props)
	}
	render(){

	return <div className="notifications">
								<p className="header">Notifications</p>
			<svg className="icon icon-lingdang" aria-hidden="true">
			<use href='#icon-lingdang'></use>
			</svg>
			<p className="notify">You have no new notifications</p>
			</div>
	
	}

}

const tab=<section className='section-tab'>
				<Link to="/App/notify">		
		 <section className='icon-menu'><div className="overflow">
		 <svg className="icon lingdang icon-tab" aria-hidden="true">
					<use href='#icon-redoufu-copy'></use>
					</svg>
			 </div></section>
			 </Link>			 
		 <section className='icon-menu'>
		 <svg className="icon icon-add icon-tab" aria-hidden="true">
					<use href='#icon-test-copy-copy'></use>
					</svg>
		 </section>
		 <section className='icon-menu'><div className="overflow1">
		 <svg className="icon icon-add icon-tab" aria-hidden="true">
					<use href='#icon-shizhong'></use>
					</svg>
			 
			 </div></section>
         </section>
const label=(props,state)=> {return <Label name="aa" as='a' color='blue' image className='user-entry'>
<img src={state.avatar} className="img-user"/>
    {props.username}
  <Label.Detail>Friend</Label.Detail>
</Label>}
	  
const content=(props,state,handellogout)=>{ return <Card className='clear-border'>
<Card.Content>
  <Image floated='center' size='large' avatar src={state.avatar} />
  <Card.Header className="header-name">
	{props.username}		
  </Card.Header>
  <Card.Meta>
	you are alone
  </Card.Meta>
  <Card.Description>
	<strong>欢迎来到Mesiter TODO🏃你可以计划一些有趣的项目😄</strong>
  </Card.Description>
</Card.Content>
<Card.Content extra>
  <div className='ui two buttons'>
	<Button basic color='green'><a href="http://www.ailsa.top">Contact me</a></Button>
	<Button basic color='red' onClick={handellogout}>Log Out</Button>
  </div>
</Card.Content>
</Card>
}
class Sidemenu extends React.Component{
		constructor(props){
			super(props)	
			this.state={
				avatar:randomAvatar()
			}
			this.handelLogOut=this.handelLogOut.bind(this)
		}
    componentWillMount(){
		this.setState({avatar:randomAvatar()})
		}
		handelLogOut(){
			AV.User.logOut();
			var currentUser = AV.User.current();
			history.push('/')
		}
		render(){
			return <div className="side-menu">
				<div className="flexlist">
					<svg className="icon icon-add" aria-hidden="true">
					<use href='#icon-jia-copy'></use>
					</svg>
					<svg className="icon icon-fengexian" aria-hidden="true">
					<use href='#icon-fengexian'></use>
					</svg>
					<svg className="icon icon-search" aria-hidden="true">
					<use href='#icon-search1'></use>
					</svg>

					{tab}
					
					<Popup 
					className='card-sigin'
					trigger={label(this.props,this.state)}
					content={content(this.props,this.state,this.handelLogOut)}
					on='click'
					position='top right'
				/>
				<main>
				<Route className="notifications" path="/App/notify" exact component={Notifications} />
			</main>		
					</div>	
			</div>			
		}

}

const Sidemenus=(props)=>{
	return <HashRouter>
	<Sidemenu username={props.username}/>
	</HashRouter>
}

export default Sidemenus
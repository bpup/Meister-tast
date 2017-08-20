import React from 'react';
import {Route,Link , BrowserRouter} from 'react-router-dom'
import './signInTool.css'
import { Icon ,Tab,Button,Label, Statistic,Popup,Card, Image} from 'semantic-ui-react'
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
const NAME='JOE'

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
				<Link to="/notify">		
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
const label= <Label as='a' color='blue' image className='user-entry'>
<img src={src[0]} className="img-user"/>
{NAME}
  <Label.Detail>Friend</Label.Detail>
</Label>
	  
const content= <Card className='clear-border'>
<Card.Content>
  <Image floated='center' size='large' avatar src={src[0]} />
  <Card.Header className="header-name">
	{NAME}
  </Card.Header>
  <Card.Meta>
	you are alone
  </Card.Meta>
  <Card.Description>
	<strong>欢迎来到Mesiter你可以计划一些有趣的项目😄</strong>
  </Card.Description>
</Card.Content>
<Card.Content extra>
  <div className='ui two buttons'>
	<Button basic color='green'><a href="http://www.ailsa.top">Contact me</a></Button>
	<Button basic color='red'>Log Out</Button>
  </div>
</Card.Content>
</Card>

class Sidemenu extends React.Component{
		constructor(props){
			super(props)			
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
					trigger={label}
					content={content}
					on='click'
					position='top right'
				/>
				<main>
				<Route className="notifications" path="/notify" exact component={Notifications} />
			</main>		
					</div>	
			</div>			
		}

}

const Sidemenus = () =>
<BrowserRouter>
	<Sidemenu/>
</BrowserRouter>;

export default Sidemenus
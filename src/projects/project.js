import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import {Container,Image,Popup,Icon,Card,Button,Search,Label} from 'semantic-ui-react'
import SiderBar from './../index/sidebar/sidebar.js'
import './project.css'
import {Route,Link , BrowserRouter} from 'react-router-dom'

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
const randomColor=()=>{
	return headerColor[parseInt(Math.random()*9)]
}
const usename=<div>
				<span className='username'>oop</span>
				<Icon className="arrow" color="grey" name='caret down' />
				</div>
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
		return <div style={{height:'100%'}}><Header/>
		         <main className="tastwarp">
					 <Tastbar headerText='Open'/>
					 <Tastbar headerText='in Progress' bgmodal='true'/>
					 <Tastbar headerText='Done'/>
				  </main>
		</div>
	}
}
class Header extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return <Container fluid className="header">
			  <section>
				 <Link to="/"> 
				<SiderBar.Logo>
				</SiderBar.Logo>
				</Link>
                <div className="vertical-line"></div>
			    <Image className="avatar" avatar src='/avatar/1.svg'/>
				<Popup
				        className="project-search"
						position="bottom center"
						trigger={usename}
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
						<img src='/avatar/1.svg' />
					Veronika
					<Label.Detail>退出</Label.Detail>
					</Label>
				</section>

	    	</Container>
	}
}
class Tastbar extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return <section className="tastbar" style={this.props.bgmodal&&{background:"rgba(0,0,0,0.18)"}}>
                <header className="tastbar-header" style={{background:randomColor()}}>
					<Icon name="life ring" size="big" className="icon-color" color="white"></Icon>
					<p>{this.props.headerText}</p>
					<Icon className="arrow1" color="grey" name='caret down' />
				</header>
				<div className="circle-add"></div>
				{!this.props.bgmodal&&<section className="tips">

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
import React from 'react';
import ReactDOM from 'react-dom';
import './siderbar.css'



 class SiderBar extends React.Component{
	 constructor(props){
		 super(props)

	 }
		 render(){
			 return <div className='sidebar-bg'>
				 <section>
				 <Logo/>
				 <Project/>
				 <List/>
				 </section>
				 <AddProject/>
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
						<i className='iconfont icon-jiantou-copy'>
						</i>
			 		</div>		 
		 }
 }
 class List extends React.Component{
	 constructor(props){
		 super(props)

	 }
		 render(){
			 return <ol className='list'>
						<li>
							<svg className="icon" aria-hidden="true">
    							<use href="#icon-12"></use>
							</svg>
							<div>name</div>
							<svg className="icon icon2" aria-hidden="true">
    							<use href={'#'+randomIcon()}></use>
							</svg>
						</li>
			 		</ol>		 
		 }
 }
 class AddProject extends React.Component{
	 constructor(props){
		 super(props)

	 }
		 render(){
			 return <div className='add'>
				
					<svg className="icon icon-add" aria-hidden="true">
    							<use href='#icon-jia-copy'></use>
							</svg>
					 <span>New Project</span>
				
			 		</div>		 
		 }
 }




 var randomIcon=function (){
	const iceicon=[]
	for(var i=1;i<20;i++){
		let item='icon-icecream-'+i
		iceicon.push(item)
	}
	return iceicon[Math.floor(Math.random()*19)]
}
export default SiderBar


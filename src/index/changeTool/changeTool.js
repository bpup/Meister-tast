import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import './changeTool.css'
import { Icon, Popup, Button,Card,Header } from 'semantic-ui-react'
const famous=[
	'理想是指路明灯。没有理想，就没有坚定的方向；而没有方向，就没有生活。——列夫·托尔斯泰',
	'世界上最快乐的事，莫过于为理想而奋斗。——苏格拉底',
	'男儿不展风云志，空负天生八尺躯。——冯梦龙',
	'苦难有如乌云，远望去但见墨黑一片，然而身临其下时不过是灰色而已。——里希特',
	'生命，那是自然付给人类去雕琢的宝石。——诺贝尔',
	'你的心灵常常是战场。在这个战场上，你的理性与判断和你的热情与嗜欲开战。——纪伯伦',
	'等到自私的幸福变成了人生唯一的目标之后，不久人生就变得没有目标。——罗曼.罗兰',
	'What you want to do, and what you can do, is limited only by what you can dream. – Mike Melville, Astronaut',
	'Being in love is not a choice we make once; it’s a choice we make multiple times. – Bruce Feiler, Writer',
	'Always do right. This will gratify some people and astonish the rest.– Mark Twain, Writer',
	'If you don’t know where you’re going, you might not get there.– Yogi Berra, Baseball Manager',
	'If you are not willing to risk the unusual, you will have to settle for the ordinary.– Jim Rohn, Author',
	'The greatest pleasure I know is to do a good action by stealth, and to have it found out by accident.– Charles Lamb, Writer',
	'There exists in the world a single path along which no one can go except you: whither does it lead? Do not ask, go along it.— Friedrich Nietzsche, Philosophe',
	'I have nothing to offer but blood, toil tears and sweat. – Winston Churchill',
	'I have nothing to offer but blood, toil tears and sweat. – Winston Churchill',
	'Patience is bitter, but its fruit is sweet. –Jean Jacques Rousseau',
]

const visitor='Visitor';
class Gettime extends React.Component{
	constructor(props){
		super(props)
		this.state={
			nowtime:moment().format("h:mm:ss"),
			nowloacl:'',
		}
		this.tick = this.tick.bind(this);
		this.local = this.local.bind(this);
	}
	 componentDidMount() {
		this.local()
		setInterval(()=>{
			this.tick()
		   },1000)
	 }
	 tick(){
		this.setState({nowtime:moment().format("HH:mm:ss")})
	 }
	 local() {
		let local=parseInt(moment().format("HH"))
		if (local< 12) {
						this.setState({nowloacl:"Good Morning"});
		} else if (local>= 12 && local < 18) {
						this.setState({nowloacl:"Good Afternoon "});
		} else {
	
						this.setState({nowloacl: "Good Evening "});
		}}
    render(){
		return <div className="clock">
			<h1>
			{this.state.nowtime}
			</h1>
			<h2>{this.state.nowloacl}, {visitor}!</h2>
			</div>
	}
}

   class Famous extends React.Component{
	   constructor(props){
		   super(props)
		   
	   }
	   render(){
		   return <div className="famous">{famous[parseInt(Math.random()*famous.length)]}</div>
	   }
   }
   class ThemeChange extends React.Component{
	   constructor(props){
		   super(props)
		   this.changeVisible=this.changeVisible.bind(this)
		   this.handleClick = this.handleClick.bind(this)
		   this.handleClickImg = this.handleClickImg.bind(this)
		   this.state={
			visible:false,
		}
	   }
	  
	   changeVisible(){
			this.setState((state,props)=>{return {visible:!state.visible}})   //立即更新state
					
			
	   }
	   handleClick(e){
		   let re=/\d{1,2}$/g
           this.props.themeIndex(parseInt(e.target.classList.toString().match(re)))

	   }
	   handleClickImg(e){
		   this.props.themeImgIndex(parseInt(e.target.classList.toString().split(' ')[4].substr(-1,1)))		
	   }
			
		   
		   
	   render(){
		   const len=[1,2,3,4,5,6,7,8,9,10,11,12];
		   const len1=[1,2,3,4,5,6,7,8]
		   const visible=this.state.visible;
		   return <div className="theme-change" onClick={this.changeVisible}>
					 <Popup on="click"
					       className="popup-warp"
						   offset="0"
						   position="top center"
				   trigger={ <Icon size="large" className="icon" name='setting' color="#fff" />}
				   content={<div className="card-warp">
							<Header as='h3' dividing>Background</Header>
							<Header as='h5' color="grey">Colors</Header>
							<Card.Group className="card-group" itemsPerRow={3}>
							{len.map((e)=>{
								const classCarts='card'+e
								const key=e.toString()
								return <Card raised link className={classCarts} onClick={this.handleClick} key={key}/>
								})}
							</Card.Group>
							<Header as='h5' color="grey">Photos</Header>
							<Card.Group className="card-group1" itemsPerRow={2}>
							{len1.map((e)=>{
								const classCarts='cardimg'+e
								const key=e.toString()
								return <Card raised link className={classCarts} onClick={this.handleClickImg} key={key}/>
								})}
							</Card.Group>	
							</div>}
			/>
						
					
						<span>Minty</span>

		   </div>
	   }
   }

   
	   
	   


export default {Gettime,Famous,ThemeChange}

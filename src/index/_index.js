import React from 'react';
import ReactDOM from 'react-dom';
import './bgcss.css'
const bgarr=['default'];
const bgbox='bgbox'
class Bg extends React.Component{
	constructor(props){
		super(props)
		this.state={
			bg:bgarr[0]
		}
	}

	render(){
		return <div className={this.state.bg+" "+bgbox}>
					
				</div>
				
	}

}
export default Bg
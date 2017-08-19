import React from 'react';
import './bgcss.css'
let bgclass=null
class Bg extends React.Component{
	constructor(props){
		super(props)
	
	}
	componentWillReceiveProps(nextProps){
		if(this.props.themeIndex!=nextProps.themeIndex){
			bgclass='bgbox  '+'theme'+nextProps.themeIndex			
		}
		if(this.props.themeImgIndex!=nextProps.themeImgIndex){
			bgclass='bgbox '+'themeimg'+nextProps.themeImgIndex			
		}
	}
	
	render(){
	
	    const bgclass1='bgbox '+bgclass
		return <div className={bgclass1}>
					
				</div>
				
	}

}
export default Bg
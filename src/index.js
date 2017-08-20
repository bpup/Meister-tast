import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import App from './App';
import BasicExample from './demo';
import Project from './projects/project.js'
import registerServiceWorker from './registerServiceWorker';
import {
	BrowserRouter,
	Switch,
	Route,
	Link
  } from 'react-router-dom'

class IndexList extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return <div style={{height:'100%'}} className="tastbg">	
		<Switch>
          <Route exact path='/' component={App}/>
          <Route path='/project' component={Project}/>
        </Switch>
		</div>
	}
}

const IndexListChange=()=>{
	return <BrowserRouter>
	<IndexList/>
	</BrowserRouter>
}

ReactDOM.render(<IndexListChange/>, document.getElementById('root'));
registerServiceWorker();

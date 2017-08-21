import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import App from './App';
import Project from './projects/project.js'
import registerServiceWorker from './registerServiceWorker';
import Log from './Logup/Log.js'
import AV from 'leancloud-storage'
import {
	HashRouter,
	Switch,
	Route,
	Link
  } from 'react-router-dom'



  var APP_ID = 'rx1QtNPGceqqeBglOC7gKgDM-gzGzoHsz';
  var APP_KEY = 'cIhizex8a8iqhuxuv4COG7nV';
  
  AV.init({
	appId: APP_ID,
	appKey: APP_KEY
  });


class IndexList extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return <div style={{height:'100%'}} className="tastbg">	
		<Switch>
          <Route exact path='/' component={Log}/>
          <Route path='/App' component={App}/>
          <Route path='/project' component={Project}/>
        </Switch>
		</div>
	}
}

const IndexListChange=()=>{
	return <HashRouter>
	<IndexList/>
	</HashRouter>
}

ReactDOM.render(<IndexListChange/>, document.getElementById('root'));
registerServiceWorker();
export default AV
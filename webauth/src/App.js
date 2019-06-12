import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios'
import {Route,NavLink} from 'react-router-dom'
import GetUsers from './components/GetUsers'

axios.defaults.withCredentials = true;

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      users:[]
    }
  }

  componentDidMount(){
    axios.get('http://localhost:4000/api/users')
    .then(res => {
      console.log('get users ',res)
      this.setState({
        users:res.data
      })
      
    })
    .catch(err => {
      console.log(err)
    })
  }

  render()
  {
    return (
    <div className="App">
      <ul>
      <li><NavLink to='/register'>Register</NavLink></li>
      <li><NavLink to='/login'>Sign In</NavLink></li>
      </ul>
      {/* <h1>its working</h1> */}
      <Route exact path = '/users'
      
      render={props => (
        <GetUsers {...props}
        users={this.state.users} />
      )}
      />

      <Route path = '/login'
      
      component = {Login}
      />

      <Route path = '/register'
      
      component = {Register}
      />
      {/* <Login /> */}
      {/* <Register /> */}
    </div>
  );
}
}

export default App;

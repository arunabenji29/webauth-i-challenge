import React from 'react';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';

class Register extends React.Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  userHandle = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  pwdHandle = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  registerSubmit = (event) => {
    event.preventDefault()
    const creds = { username: this.state.username, password: this.state.password }
    axios.post('http://localhost:4000/api/auth/register', creds)
      .then(res => {
        console.log(res)
        this.props.history.push('/login')
      })
      .catch(err => {
        console.log(err)
      })
      this.setState({
        username:'',
        password:''
      })
  }

  render() {
    return (
      <div className='page'>
        <form className='login-Form'>
          <input className="user"
            placeholder='username'
            value={this.state.username}
            onChange={this.userHandle}

          />

          <input className="user"
            type='password'
            placeholder='password'
            value={this.state.password}
            onChange={this.pwdHandle}
          />

          <button className="submit"
            onClick={this.registerSubmit}>
            Register </button>
        </form>
      </div>
    )
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     modal: false
  //   };

  //   this.toggle = this.toggle.bind(this);
  // }

  // toggle() {
  //   this.setState(prevState => ({
  //     modal: !prevState.modal
  //   }));
  // }

  // render() {
  //   return (
  //     <div>
  //       <Button color="danger" onClick={this.toggle}>Register</Button>
  //       <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
  //         <ModalHeader toggle={this.toggle}>Sign In</ModalHeader>
  //         {/* <ModalBody> */}
  //         <Form>
  //       <FormGroup>
  //         <Label for="exampleText">Username</Label>
  //         <Input type="text" name="text" id="exampleText" placeholder='...enter your username'/>
  //       </FormGroup>
  //       <FormGroup>
  //         <Label for="examplePassword">Password</Label>
  //         <Input type="password" name="password" id="examplePassword" placeholder="...enter your password" />
  //       </FormGroup>

  //         {/* </ModalBody> */}
  //         <ModalFooter>
  //           <Button color="primary" onClick={this.toggle}>Submit</Button>
  //         </ModalFooter>
  //         </Form>
  //       </Modal>
  //     </div>
  //   );
  // }
}

export default Register;
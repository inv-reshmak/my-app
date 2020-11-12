import React,{Component} from 'react';


import {Button} from 'react-bootstrap';
import {Input, Form, FormGroup, Label} from 'reactstrap';
import {Redirect} from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';


import './Login.css';
import { Link } from 'react-router-dom';
import { PostData } from '../PostData';

const validEmailRegex = RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
const validPasswordRegex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%^&*])(?=.{8,})");
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

export class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
    
          email: null,
          password: null,
          redirect: false,
         
          errors: {
           
            email: '',
            password: '',
           
          }
        };
        this.login=this.login.bind(this);
        this.handleChange=this.handleChange.bind(this);
      }

      login(){
        if(this.state.email && this.state.password){
          PostData('login',this.state).then((result)=>{
            let response =result;
            console.log(response);
            localStorage.setItem('accessToken.value', response.accessToken.value);
            this.setState({redirect: true});
          })
        }
        else{
          alert("Enter a valid email and password");
        }
      
      }
    
      handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
    
        switch (name) {
          
          case 'email': 
            errors.email = 
                validEmailRegex.test(value)
                ? ''
                : 'Email is not valid!';
                break;
          case 'password': 
            errors.password = 
                validPasswordRegex.test(value)
                 ? ''
                : 'Password must have uppercase,number and special character';
                break;
          
                default:
                break;
              }
          
              this.setState({errors, [name]: value});
              this.setState({[event.target.name]: event.target.value});
           
            }
          
            handleSubmit = (event) => {
              event.preventDefault();
              if(validateForm(this.state.errors) ) {
                console.info('Valid Form')
              }else{
                console.error('Invalid Form')
            }
          }
    render(){
      if(this.state.redirect){
        return(<Redirect to={'/itemview'} />)
      }
        const {errors} = this.state;
        return(
            <div className="wrapper">
                <div className="form-wrapper">
                <h1 className="text-primary">Login</h1>
                    <Form className="login-form" onSubmit={this.handleSubmit} noValidate>
                        <FormGroup>
                            <Label for="email">Email:</Label>
                            <Input type="email" placeholder="Email" name="email" className="form-control" onChange={this.handleChange} noValidate></Input>
                            {errors.email.length > 0 && 
                            <span className='error'>{errors.email}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password:</Label>
                            <Input type="password" placeholder="Password" name="password" className="form-control" onChange={this.handleChange} noValidate></Input>
                            {errors.password.length > 0 && 
                            <span className='error'>{errors.password}</span>}
                        </FormGroup>
                        <div className='info'>
                        <small>Password must be eight characters in length.</small>
                        </div>
                        <Link to='/registeration'>Are you a new User?</Link>
                        <Button type="submit" className="btn-block" onClick={this.login}>Submit</Button>
                    </Form>
                </div>
            </div>
        )
    }
}
export default Login;
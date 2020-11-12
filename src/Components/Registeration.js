import React,{Component} from 'react';

import {Button} from 'react-bootstrap';
import {Input, Form, FormGroup, Label} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import { PostData } from '../PostData';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Login.css';

const validEmailRegex = RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
const validPasswordRegex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%^&*])(?=.{8,})");
const validNameRegex = RegExp("^[a-zA-Z]+$");
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

export class Registeration extends Component{
    constructor(props) {
        super(props);
        this.state = {
          name: null,
          email: null,
          password: null,
          Cpassword: null,
          redirect: false,

          errors: {
            name: '',
            email: '',
            password: '',
            Cpassword: '',
          }
        };
        this.register=this.register.bind(this);
        this.handleChange=this.handleChange.bind(this);
      }
    
      handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
    
        switch (name) {
          case 'name': 
            errors.name = 
                validNameRegex.test(value)
                ? ''
                : 'Name should only contain letters!';
                break;
          case 'email': 
            errors.email = 
                validEmailRegex.test(value)
                ? ''
                : 'Email is not valid!';
                break;
          case 'password': 
            errors.pssword = 
                validPasswordRegex.test(value)
                 ? ''
                : 'Password must have uppercase,number and special character';
                break;
          case 'Cpassword': 
            errors.Cpassword = 
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


           register(){
             if(this.state.password === this.state.Cpassword){
              PostData('users',this.state).then((result)=>{
                let response =result;
                console.log(response);
                alert("Successfullt registered");
                this.setState({redirect: true});
              })
             }
             else{
                alert("password and confirm password should be same");
             }
            }
          
            handleSubmit = (event) => {
              event.preventDefault();
              if(validateForm(this.state.errors)) {
                console.info('Valid Form')
              }else{
                console.error('Invalid Form')
            }
          }
    render(){
      if(this.state.redirect){
        return(<Redirect to={'/'} />)
      }
        const {errors} = this.state;
        return(
            <div className="wrapper">
                <div className="form-wrapper">
                <h1 className="text-primary">Register</h1>
                    <Form className="login-form" onSubmit={this.handleSubmit} noValidate>
                    <FormGroup>
                            <Label for="name">Name:</Label>
                            <Input type="text" placeholder="Name" className="form-control" name="name" onChange={this.handleChange} noValidate></Input>
                            {errors.name.length > 0 && 
                            <span className='error'>{errors.name}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email:</Label>
                            <Input type="email" placeholder="Email" className="form-control" name="email" onChange={this.handleChange} noValidate></Input>
                            {errors.email.length > 0 && 
                            <span className='error'>{errors.email}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password:</Label>
                            <Input type="password" placeholder="Password" className="form-control"  name="password" onChange={this.handleChange} noValidate></Input>
                            {errors.password.length > 0 && 
                            <span className='error'>{errors.password}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="cpassword">Confirm Password:</Label>
                            <Input type="password" placeholder="Confirm Password" className="form-control" name="Cpassword" onChange={this.handleChange} noValidate></Input>
                            {errors.Cpassword.length > 0 && 
                            <span className='error'>{errors.Cpassword}</span>}
                        </FormGroup>
                        <div className='info'>
                        <small>Password must be eight characters in length.</small>
                        </div>
                        <Button type="submit" className="btn-block" onClick={this.register}>Register</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Registeration;
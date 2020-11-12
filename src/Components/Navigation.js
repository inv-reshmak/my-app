import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';




export class Navigation extends Component{

  
    constructor(props){
        super(props);
        this.state = {
    
            redirect: false,
        };
           
        this.logout=this.logout.bind(this);
    }

    logout(){
        localStorage.removeItem('accessToken.value');
        this.setState({redirect: true});
    }
    render(){
        if(this.state.redirect){
            return(<Redirect to={'/'} />)
          }
        return(
            <div>
                <Navbar expand="lg" bg="primary" variant="dark">
                        <Navbar.Brand onClick={this.logout}> Logout
                            </Navbar.Brand>
                    </Navbar>
                
            </div>
        )
    }
}
export default Navigation;
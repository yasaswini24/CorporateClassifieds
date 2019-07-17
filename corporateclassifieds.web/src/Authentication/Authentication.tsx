import React from 'react';
import { connect } from 'react-redux';
import { ValidateCredentials, ValidateUserBegin, UserSignUpBegin } from '../Actions/UserActions';
import './Authentication.sass';
import logo from "../Images/logo.png";
import { Card } from 'react-bootstrap';
import { Icon, initializeIcons, TextField, PrimaryButton } from 'office-ui-fabric-react';
import App from '../App';
import ServerError from '../ErrorPages/ServerError';
import TechnovertLogo from '../Images/TechnovertLogo.png';
var Background = require('../Images/background.jfif');

initializeIcons();
class Authentication extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      Username: '',
      Password: ''
    }
    this.props.dispatch(ValidateUserBegin());
  }
  handleSignUp() {
    this.props.dispatch(UserSignUpBegin());
  }
  handleChange(e: any) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleClick() {
    let credentials = this.state;
    this.props.dispatch(ValidateCredentials(credentials));
    console.log(credentials);
    this.setState({ Username: '', Password: '' });
  }
  handlePress(e: any) {
    if (e.keyCode == 13) {
      let credentials = this.state;
      this.props.dispatch(ValidateCredentials(credentials));
      this.setState({ Username: '', Password: '' });
    }
  }
  render() {
    return (
      <div  >
        {this.props.Login ?
          <div className="Authentication" onKeyDown={this.handlePress.bind(this)}>

            <div className="Image">

              <img src={Background} className="Background" />

            </div>

            <div className="Login">

              <img src={TechnovertLogo} className="TechnovertLogo" />

              <Card className="AuthenticationCard" border="light" style={{ width: '18rem' }}>

                <Card.Header>

                  <Card.Title>
                    Corporate Classifieds
                  </Card.Title>

                </Card.Header>

                <Card.Body>

                  <Card.Img src={logo} />

                  {this.props.UserLogInError &&
                    <Card.Text className="WrongCredentials">Enter valid credentials</Card.Text>}
                  <Card.Text>

                    <TextField label="Username" name="Username" value={this.state.Username} required onChange={this.handleChange.bind(this)} />

                    <TextField type="Password" label="Password" name="Password" value={this.state.Password} required onChange={this.handleChange.bind(this)} />

                  </Card.Text>

                  <Card.Text className="Buttons">

                    <PrimaryButton text="Login" onClick={this.handleClick.bind(this)} />

                    <PrimaryButton text="SignUp" onClick={this.handleSignUp.bind(this)} />

                  </Card.Text>

                </Card.Body>
              </Card>
            </div>
          </div>
          :
          <App />}
      </div>



    );
  }
}

function mapStateToProps(state: any) {
  debugger;
  return {
    User: state.UserReducer.User,
    Login: state.UserReducer.Login,
    UserLoggedIn: state.UserReducer.UserLoggedIn,
    UserLogInError: state.UserReducer.UserLogInError
  }
}

export default connect(mapStateToProps)(Authentication);
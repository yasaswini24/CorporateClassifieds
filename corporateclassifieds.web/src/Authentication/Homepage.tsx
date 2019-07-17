import React from 'react';
import { connect } from 'react-redux';
import './Authentication.sass';
var Background = require('../Images/background.jfif');

class Homepage extends React.Component<any, any> {

    render() {
        return (
            <div>
                {/* <div className="Authentication" onKeyDown={this.handlePress.bind(this)}>
                    <div className="Image">
                        <img src={Background} className="Background" />
                    </div>
                    <div className="Login">
                        <img src={TechnovertLogo} className="TechnovertLogo" />
                    </div>
                </div> */}
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

export default connect(mapStateToProps)(Homepage);
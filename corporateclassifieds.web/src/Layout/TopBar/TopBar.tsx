import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'office-ui-fabric-react/dist/css/fabric.css';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { initializeIcons } from '@uifabric/icons';
import './TopBar.sass';
import { connect } from "react-redux";

initializeIcons();
class TopBar extends Component<any, any>
{
    constructor(props: any) {
        super(props);
        this.state = { viewProfile: false };
    }
    ViewProfile() {
        this.setState({ viewProfile: true });
    }
    render() {
        return (

            <div className="TopBar">
                <Link to="/Classifieds/SaleRent">
                    <div className="Logo">
                        <Icon iconName="ShoppingCart" />
                    </div>

                    <div className="Title">
                        Corporate Classifieds
                    </div>
                </Link>

                <div className="UserOptions" onClick={this.ViewProfile.bind(this)}>
                    <div className="username">
                        {this.props.User.name}
                        {/* Surya */}
                    </div>
                    <img src={"data:image/jpeg;base64," + this.props.User.picture} alt={this.props.User.name} />
                </div>

                {/* {this.state.viewProfile&&<ViewProfile/>} */}
            </div>


        );
    }
}
function mapStateToProps(state: any) {
    debugger;
    console.log(state.UserReducer.User.picture);
    return {
        User: state.UserReducer.User
    }
}
export default connect(mapStateToProps)(TopBar);
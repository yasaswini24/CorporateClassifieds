import React, { Component } from 'react';
import { Link, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import 'office-ui-fabric-react/dist/css/fabric.css';
// import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { initializeIcons } from '@uifabric/icons';
import { connect } from "react-redux";
import Categories from './Categories/Categories';
import ReportedAds from "./ReportedAds/ReportedAds";
import "./Admin.sass";
import Users from './Users/Users';


initializeIcons();
class MyClassifieds extends Component<any, any>
{
    render() {
        return (

            <div className="Admin">
                <nav className="top-menu">
                    <ul className="nav">

                        <li className="nav-item" >
                            <Link to="/Admin/ReportedAds" className="nav-link active">
                                Reported Ads
                                </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/Admin/Categories" className="nav-link" >
                                Categories
                                </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Admin/Users" className="nav-link" >
                                Users
                            </Link>
                        </li>

                    </ul>
                </nav>
                <div>
                    <Route path="/Admin/ReportedAds" component={ReportedAds} />
                    <Route path="/Admin/Categories" component={Categories} />
                    <Route path="/Admin/Users" component={Users} />
                    <Redirect to="/Admin/ReportedAds" />
                </div>
            </div>


        );
    }
}
function mapStateToProps(state: any) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(MyClassifieds);














import React, { Component } from 'react';
import { Link, Route, Redirect } from "react-router-dom";
import 'office-ui-fabric-react/dist/css/fabric.css';
import { initializeIcons } from '@uifabric/icons';
import { connect } from "react-redux";
import History from './History/History';
import ActiveClassifieds from "./ActiveClassifieds/ActiveClassifieds";
import "./MyClassifieds.sass";
import CreateAd from "./CreateAd/CreateAd";
import PostAdd from './CreateAd/PostAdd';
import ViewAd from '../Classifieds/SaleRent/ViewAd/ViewAd';
// import PostAdd from './CreateAd/PostAdd';

initializeIcons();
class MyClassifieds extends Component<any, any>
{
    render() {
        return (
            <div className="MyClassifieds">
                <nav className="top-menu">
                    <ul className="nav">

                        <li className="nav-item" >
                            <Link to="/MyClassifieds/ActiveClassifieds" className="nav-link active">
                                Active Classifieds
                                </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/MyClassifieds/History" className="nav-link" >
                                History
                                </Link>
                        </li>

                    </ul>
                </nav>
                {
                    this.props.DisplayAd ?
                        <ViewAd path={window.location.pathname + "#"} /> :

                        <div>
                            <Route path="/MyClassifieds/ActiveClassifieds" component={ActiveClassifieds} />
                            <Route path="/MyClassifieds/History" component={History} />
                            <Route exact path="/MyClassifieds/CreateAd" component={PostAdd} />
                            <Redirect to="/MyClassifieds/ActiveClassifieds" />
                        </div>
                }
            </div>

        );
    }
}
function mapStateToProps(state: any) {
    return {
        user: state.user,
        DisplayAd: state.AdReducer.viewAd
    }
}
export default connect(mapStateToProps)(MyClassifieds);














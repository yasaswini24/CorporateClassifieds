import React, { Component } from 'react';
import { Link, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import 'office-ui-fabric-react/dist/css/fabric.css';
import { initializeIcons } from '@uifabric/icons';
import { connect } from "react-redux";
import './Classifieds.sass';
import SaleRent from "./SaleRent/SaleRent";
import Required from "./Required/Required";
import { fetchAds, changeDisplayAd, clear, getFilterList } from '../Actions/AdActions';
import { CategoriesFetch } from '../Actions/CategoryActions';
import ViewAd from './SaleRent/ViewAd/ViewAd';



initializeIcons();
class Classifieds extends Component<any, any>{
    componentDidMount() {
        const FilterList:any = { AdType: [], Category: [], Posted: [], Location: [],Search: "",start: 0};
        console.log("component mounted");
        this.props.dispatch(getFilterList(FilterList));
        this.props.dispatch(fetchAds(FilterList));
        this.props.dispatch(CategoriesFetch());
    }
    componentWillMount() {
        this.props.dispatch(changeDisplayAd(0));
    }

    componentWillUnmount() {
        this.props.dispatch(clear("Classifieds"));
    }
    render() {
        return (
            <div className="Classifieds" >
                <nav className="top-menu">
                    <ul className="nav">
                        <li className="nav-item" >
                            <Link to="/Classifieds/SaleRent" className="nav-link active">
                                For Sale/Rent
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Classifieds/Required" className="nav-link" >
                                Required
                            </Link>
                        </li>
                    </ul>
                </nav>
                {
                    this.props.DisplayAd ?
                        <ViewAd path={window.location.pathname + "#"} /> :

                        <div>
                            <Route path="/Classifieds/SaleRent" component={SaleRent} />
                            <Route path="/Classifieds/Required" component={Required} />
                            {/* <Redirect to="/Classifieds/SaleRent" /> */}
                        </div>
                }
            </div>

        );
    }
}
function mapStateToProps(state: any) {
    return {
        user: state.user,
        Ads: state.AdReducer.Ads,
        DisplayAd: state.AdReducer.viewAd
    }
}
export default connect(mapStateToProps)(Classifieds);














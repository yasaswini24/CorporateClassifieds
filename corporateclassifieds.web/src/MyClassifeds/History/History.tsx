import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";
import 'office-ui-fabric-react/dist/css/fabric.css';
import { initializeIcons } from '@uifabric/icons';
import { connect } from "react-redux";
import FiltersBar from '../../Classifieds/FilterBar/FiltersBar';
import Gridview from '../../Classifieds/SaleRent/GridView/Gridview';
import ListView from '../../Classifieds/SaleRent/ListView/ListView';
import ActiveClassifiedsImage from "../activeclassifieds1.png";
import './History.sass';
import { fetchUserAds, changeview, clear } from '../../Actions/AdActions';


initializeIcons();
class History extends Component<any, any>
{
    componentDidMount() {
        this.props.dispatch(fetchUserAds(3, "History", this.props.HistoryAds.length));    /////////user id need to be given in the first field  when authentication is added
    }
    componentWillUnmount() {
        this.props.dispatch(changeview(1));
        this.props.dispatch(clear("History"));
    }
    render() {
        return (
            <div className="DescriptionBar">

                <main className="content-wrapper">
                    <div className="header">
                        <h1>History</h1>
                        <p>here you can manage the way you capture things</p>

                        <div className="cta-button-panel">
                            <Link to="/MyClassifieds/CreateAd">
                                <div className="btn btn-primary">
                                    Create Ad
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="History">
                        <FiltersBar />
                        {
                            this.props.ClassifiedsHistoryAvailable ?
                                <div>

                                    {
                                        this.props.ListView ?
                                            <ListView AdListItem={this.props.HistoryAds} /> :
                                            <Gridview AdGridItem={this.props.HistoryAds} AdStatusDisplay={true} />

                                    }
                                </div>
                                : <img className="ActiveClassifiedsImage" src={ActiveClassifiedsImage} alt="ActiveClassifiedsImage" />
                        }
                    </div>
                </main>
            </div>

        );
    }
}
function mapStateToProps(state: any) {
    debugger;
    return {
        loading: state.AdReducer.loading,
        HistoryAds: state.AdReducer.HistoryAds,
        ClassifiedsHistoryAvailable: state.AdReducer.HistoryAdsAvailable,
        ListView: state.AdReducer.ListView
    }
}
export default connect(mapStateToProps)(History);














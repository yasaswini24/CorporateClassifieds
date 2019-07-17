import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'office-ui-fabric-react/dist/css/fabric.css';
import { initializeIcons } from '@uifabric/icons';
import { connect } from "react-redux";
import ActiveClassifiedsImage from '../activeclassifieds1.png';
import "./ActiveClassifieds.sass";
import { fetchUserAds, changeview, clear } from '../../Actions/AdActions';
import FiltersBar from '../../Classifieds/FilterBar/FiltersBar';
import ListView from '../../Classifieds/SaleRent/ListView/ListView';
import Gridview from '../../Classifieds/SaleRent/GridView/Gridview';


initializeIcons();
class ActiveClassifieds extends Component<any, any>
{
    componentDidMount() {
        debugger;
        this.props.dispatch(fetchUserAds(3, "Active", this.props.ActiveAds.length));    /////////user id need to be given in the first field when authentication is added
    }
    componentWillUnmount() {
        this.props.dispatch(changeview(1));
        this.props.dispatch(clear("ActiveClassifieds"));
    }
    render() {
        return (
            <div className="DescriptionBar">
                <main className="content-wrapper">
                    <div className="header">
                        <h1>ActiveClassifieds</h1>
                        <p>here you can manage the way you capture things</p>

                        <div className="cta-button-panel">
                            <Link to="/MyClassifieds/CreateAd">
                                <div className="btn btn-primary">
                                    Create Ad
                                </div>
                            </Link>
                        </div>
                    </div>


                    <div className="ActiveClassifieds">
                        <FiltersBar />
                        {
                            this.props.ClassifiedsAvailable ?
                                <div>
                                    {
                                        this.props.ListView ?
                                            <ListView AdListItem={this.props.ActiveAds} /> :
                                            <Gridview AdGridItem={this.props.ActiveAds} AdStatusDisplay={false} />
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
        ActiveAds: state.AdReducer.ActiveAds,
        ClassifiedsAvailable: state.AdReducer.ActiveAdsAvailable,
        ListView: state.AdReducer.ListView

    }
}
export default connect(mapStateToProps)(ActiveClassifieds);














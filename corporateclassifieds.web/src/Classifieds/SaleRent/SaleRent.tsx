import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import 'office-ui-fabric-react/dist/css/fabric.css';
import { initializeIcons } from '@uifabric/icons';
import { connect } from "react-redux";
import './../SaleRent/SaleRent.sass';
import ListView from "./ListView/ListView";
import GridView from "./GridView/Gridview";
import FiltersBar from '../FilterBar/FiltersBar';
import { changeview, changeDisplayAd } from '../../Actions/AdActions';


initializeIcons();
class SaleRent extends Component<any, any>
{

    componentWillUnmount() {
        this.props.dispatch(changeview(1));
    }
    render() {
        return (
            <div>
                <main className="content-wrapper">
                    <div className="header">
                        <h1>For Sale/Rent</h1>
                        <p>Here you can manage categories.</p>
                    </div>

                    <div className="SaleRent">
                        <FiltersBar />


                        {
                            this.props.ListView ?
                                <ListView AdListItem={this.props.Ads} /> :
                                <GridView AdGridItem={this.props.Ads} />
                        }

                    </div>
                </main>
            </div>

        );
    }
}
function mapStateToProps(state: any) {
    return {
        user: state.user,
        Ads: state.AdReducer.Ads,
        ListView: state.AdReducer.ListView
    }
}
export default connect(mapStateToProps)(SaleRent);














import React, { Component } from 'react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { initializeIcons } from '@uifabric/icons';
import { connect } from "react-redux";
import './ReportedAds.sass';
import ReportedLists from './ReportedLists';
import { FetchReports } from '../../Actions/ReportActions';
initializeIcons();
class ReportedAds extends Component<any, any>
{
    componentDidMount(){
        this.props.dispatch(FetchReports());
    }
    render() {
        return (
            <div className="ReportedAds">
                <main className="content-wrapper">
                    <div className="header">
                        <h1>ReportedAds</h1>
                        <p>Here you can manage categories.</p>
                    </div>
                </main>
                <ReportedLists />
            </div>

        );
    }
}
function mapStateToProps(state: any) {
    return {

    }
}
export default connect(mapStateToProps)(ReportedAds);














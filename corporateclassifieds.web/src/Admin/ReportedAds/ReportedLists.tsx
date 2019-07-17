import React, { Component } from 'react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { initializeIcons } from '@uifabric/icons';
import { connect } from "react-redux";
import './ReportedAds.sass';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import NothingHere from '../Images/NothingHere.png';
import { DeleteAd, fetchAdByID, changeDisplayAd } from '../../Actions/AdActions';
import { FetchReports } from '../../Actions/ReportActions';
import { Modal, Button } from 'react-bootstrap';

initializeIcons();
class ReportedLists extends Component<any, any>
{
    RemoveAd(AdID: number) {
        // alert(AdID);
        this.props.dispatch(DeleteAd(AdID, 3)); ///////Mention the login user id in place of 3
    }

    DisplayAd = (AdID: number) => {
        alert(window.location.pathname);
        let path="/Classifieds/SaleRent#"+AdID;
        alert(path);
        window.location.href=path;
        //     this.props.dispatch(changeDisplayAd())
        //     this.props.dispatch(fetchAdByID(AdID));
    }
    render() {
        return (
            <div>
                {this.props.ReportedAds.length ?
                    <div className="ReportedAds">

                        <div className="ms-Grid-row ReportedAdsHeader">
                            <div className="ms-Grid-col ms-sm7">
                                ITEM
                            </div>
                            <div className="ms-Grid-col ms-sm2">
                                POSTED BY
                                </div>
                            <div className="ms-Grid-col ms-sm2">
                                REPORTED BY
                                </div>
                            <div className="ms-Grid-col ms-sm1">
                                ACTIONS
                                </div>
                        </div>


                        <div>
                            {this.props.ReportedAds.map((ReportedAd: any, index: number) =>
                                <div className="ms-Grid-row ReportedAdsList" onClick={this.DisplayAd.bind(this, ReportedAd.id)}>
                                    <div className="ms-Grid-col ms-sm7">
                                        <div className="ms-Grid-col ms-sm1.8">
                                            {ReportedAd.images.length ?
                                                <img className="ListProductImage" src={`data:image/jpeg;base64,${ReportedAd.images[0].image}`} alt="Ad" /> :
                                                <img className="ListProductImage" src="https://capitant.be/wp-content/themes/capitant/assets/images/no-image.png" alt="Ad" />
                                            }
                                        </div>
                                        <div className="ms-Grid-col ms-sm7 AdInfo">
                                            <div className="AdName">
                                                <Icon iconName="CellPhone" className="AdIcon" />
                                                <span className="Name">{ReportedAd.name}</span>
                                            </div>
                                            <div className="AdDescription">
                                                {ReportedAd.description}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ms-Grid-col ms-sm2 PostedBy">

                                        <div className="PostedByName">
                                            {ReportedAd.createdByUser.name}
                                        </div>

                                        <div className="PostedOn">
                                            {
                                                new Intl.DateTimeFormat('en-GB', {
                                                    month: 'short',
                                                    day: '2-digit',

                                                }).format(new Date(ReportedAd.created))
                                            } ,
                                    {
                                                new Intl.DateTimeFormat('en-GB', {
                                                    year: 'numeric'

                                                }).format(new Date(ReportedAd.created))
                                            }
                                        </div>

                                    </div>

                                    <div className="ms-Grid-col ms-sm2 ReportedBy">

                                        <div className="ReportedUser">
                                            {ReportedAd.reportedAds[0].reportedBy.name}
                                        </div>

                                        <div className="ReportedUsersCount">
                                            {ReportedAd.reportedAds.length > 1 ? `+${ReportedAd.reportedAds.length - 1} more` : null}
                                        </div>

                                    </div>

                                    <div className="ms-Grid-col ms-sm1 RemoveAd">

                                        <div className="btn btn-primary" onClick={this.RemoveAd.bind(this, ReportedAd.id)}>
                                            Remove Ad
                                            </div>

                                    </div>
                                </div>

                            )}
                        </div>



                    </div>


                    :

                    <img className="NothingHere" src={NothingHere} alt="NothingHere" />
                }

                {/* {this.props.Updated && <Modal className="UpsertCategoryModal" show={true} onHide={this.handleClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Category Updation Successful</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose.bind(this)}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>} */}

            </div>




        );
    }
}
function mapStateToProps(state: any) {
    debugger;
    return {
        ReportedAds: state.ReportReducer.ReportedAds,
        ReportedAdsError: state.ReportReducer.ReportError
    }
}
export default connect(mapStateToProps)(ReportedLists);














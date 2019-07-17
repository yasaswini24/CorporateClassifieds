import React from 'react';
import { Card, ListGroup, InputGroup, FormControl } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import MessageList from '../MessageList';
import Icon from 'react-icons-kit';
import './Reported.sass';
import { connect } from 'react-redux';
import { fetchUserAds } from '../../Actions/AdActions';

class Reports extends React.Component<any, any>{
    componentWillMount() {
        debugger;
        this.props.dispatch(fetchUserAds(2, "Reported", this.props.ReportedAds.length));    /////////user id need to be given in the first field when authentication is added
    }
    render() {
        return (
            <Card className="Reported" >
                <Card className="Left">
                    <Card.Header>
                        Reports
                    </Card.Header>
                    {
                        this.props.ReportedAdsAvailable ?
                            <Card.Body>
                                <ListGroup >
                                    {
                                        this.props.ReportedAds.map((ReportedAd: any) =>
                                            <Link to={"/Inbox/ReportedAds/" + ReportedAd.name.trim()}>
                                                <ListGroup.Item className="ReportedItem">
                                                    <Card.Img className="ReportedImage" variant="top" src="https://capitant.be/wp-content/themes/capitant/assets/images/no-image.png" />
                                                    <Card.Body className="ReportedDescription">
                                                        <div className="Description">
                                                            <Card.Header className="ReportedName">{ReportedAd.name}</Card.Header>
                                                            <Card.Text className="ReportedAmount">Reported</Card.Text>
                                                        </div>
                                                        <div className="Timestamp">
                                                            <Card.Text className="ReportedTime">Timestamp</Card.Text>
                                                        </div>
                                                    </Card.Body>
                                                </ListGroup.Item>
                                            </Link>)
                                    }
                                </ListGroup>
                            </Card.Body> :

                            <Card.Body>Sorry no Reported ads available</Card.Body>
                    }

                </Card>
                {
                    this.props.ReportedAds.map((ReportedAd: any, index: number) =>

                        <Route exact path={"/Inbox/ReportedAds/" + ReportedAd.name.trim()} component={() =>
                            <Card className="Right">
                                <Card.Title>
                                    <div className="ChatHeader">
                                        <Card.Img className="Profile" variant="top" src="https://capitant.be/wp-content/themes/capitant/assets/images/no-image.png" />
                                        <div className="AdDetails">
                                            <Card.Text className="UserName">Admin</Card.Text>
                                            <Card.Text className="Reported">Removed Ad by Admin</Card.Text>
                                        </div>
                                        <div className="MoreOptions"></div>
                                    </div>
                                </Card.Title>
                                <Card.Body className="ChatBody">
                                    <Card.Text className="StatusText">This Ad is Reported.Below is the reason provided by the admin</Card.Text>
                                    <Card.Text className="Reason">This is Reported.If you are interested in reposting the Ad.Please Update the Ad and post that again</Card.Text>
                                </Card.Body>

                            </Card>} />
                    )
                }

            </Card>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        ReportedAds: state.AdReducer.ReportedAds,
        ReportedAdsAvailable: state.AdReducer.ReportedAdsAvailable
    }
}
export default connect(mapStateToProps)(Reports);
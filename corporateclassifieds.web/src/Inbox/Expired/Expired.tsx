import React from 'react';
import { Card, ListGroup, InputGroup, FormControl } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import { fetchUserAds, clear } from '../../Actions/AdActions';
import { connect } from 'react-redux';
import './Expired.sass';

class Expired extends React.Component<any, any>{
    componentWillMount() {
        debugger;
        this.props.dispatch(fetchUserAds(2, "Expired", this.props.ExpiredAds.length));    /////////user id need to be given in the first field when authentication is added
    }
    componentWillUnmount() {
        this.props.dispatch(clear("Expired"));
    }
    render() {
        return (
            <Card className="Expired" >
                <Card className="Left">
                    <Card.Header>
                        Expired({this.props.ExpiredAds.length})
                    </Card.Header>
                    {
                        this.props.ExpiredAdsAvailable ?
                            <Card.Body>
                                <ListGroup >
                                    {
                                        this.props.ExpiredAds.map((ExpiredAd: any) =>
                                            <Link to={"/Inbox/Expired/" + ExpiredAd.name.trim()}>
                                                <ListGroup.Item className="ExpiredItem">
                                                    <Card.Img className="ExpiredImage" variant="top" src="https://capitant.be/wp-content/themes/capitant/assets/images/no-image.png" />
                                                    <Card.Body className="ExpiredDescription">
                                                        <div className="Description">
                                                            <Card.Header className="ExpiredName">{ExpiredAd.name}</Card.Header>
                                                            <Card.Text className="ExpiredAmount">Expired</Card.Text>
                                                        </div>
                                                        <div className="Timestamp">
                                                            <Card.Text className="ExpiredTime">Timestamp</Card.Text>
                                                        </div>
                                                    </Card.Body>
                                                </ListGroup.Item>
                                            </Link>)
                                    }
                                </ListGroup>
                            </Card.Body> :

                            <Card.Body>Sorry no Expired ads available</Card.Body>
                    }
                </Card>
                {
                    this.props.ExpiredAds.map((ExpiredAd: any, index: number) =>

                        <Route exact path={"/Inbox/Expired/" + ExpiredAd.name.trim()} component={() =>
                            <Card className="Right">
                                <Card.Title>
                                    <div className="ChatHeader">
                                        <Card.Img className="Profile" variant="top" src="https://capitant.be/wp-content/themes/capitant/assets/images/no-image.png" />
                                        <div className="AdDetails">
                                            <Card.Text className="UserName">{ExpiredAd.createdByUser.name}</Card.Text>
                                            <Card.Text className="Expired">Expired</Card.Text>
                                        </div>
                                        <div className="MoreOptions"></div>
                                    </div>
                                </Card.Title>
                                <Card.Body className="ChatBody">
                                    <Card.Text className="StatusText">This Ad is Expired.Below is the reason provided by the admin</Card.Text>
                                    <Card.Text className="Reason">This is Expired.If you are interested in reposting the Ad.Please Update the Ad and post that again</Card.Text>
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
        ExpiredAds: state.AdReducer.ExpiredAds,
        ExpiredAdsAvailable: state.AdReducer.ExpiredAdsAvailable
    }
}
export default connect(mapStateToProps)(Expired);
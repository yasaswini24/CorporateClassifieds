import React from 'react';
import { Card, ListGroup, InputGroup, FormControl } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import MessageList from '../MessageList';
import Icon from 'react-icons-kit';
import { fetchUserAds } from '../../Actions/AdActions';
import { connect } from 'react-redux';
import './Deleted.sass';


class Deleted extends React.Component<any, any>{
    componentDidMount() {
        this.props.dispatch(fetchUserAds(2, "Removed by You", this.props.DeletedAds.length));    /////////user id need to be given in the first field when authentication is added
    }
    render() {
        return (
            <Card className="Deleted" >
                <Card className="Left">
                    <Card.Header>
                        Deleted({this.props.DeletedAds.length})
                    </Card.Header>
                    {
                        this.props.DeletedAdsAvailable ?
                            <Card.Body>
                                <ListGroup >
                                    {
                                        this.props.DeletedAds.map((DeletedAd: any) =>
                                            <Link to={"/Inbox/Deleted/" + DeletedAd.name.trim()}>
                                                <ListGroup.Item className="DeletedAdItem">
                                                    {DeletedAd.images[0] != null ? <Card.Img className="DeletedAdImage" variant="top" src={"data:image/jpeg;base64," + DeletedAd.images[0].image} /> :
                                                        <Card.Img className="DeletedAdImage" variant="top" src="https://capitant.be/wp-content/themes/capitant/assets/images/no-image.png" />}
                                                    <Card.Body className="DeletedAdDescription">
                                                        <div className="Description">
                                                            <Card.Header className="DeletedAdName">{DeletedAd.name}</Card.Header>
                                                            <Card.Text className="DeletedAdAmount">Removed by you</Card.Text>
                                                        </div>
                                                        <div>
                                                            <Card.Text className="DeletedAdTime">Timestamp</Card.Text>
                                                        </div>
                                                    </Card.Body>
                                                </ListGroup.Item>
                                            </Link>

                                        )}

                                </ListGroup>
                            </Card.Body>

                            :
                            <Card.Body>No Ads are Deleted by you</Card.Body>
                    }
                </Card>
                {
                    this.props.DeletedAds.map((DeletedAd: any, index: number) =>

                        <Route path={"/Inbox/Deleted/" + DeletedAd.name.trim()} component={() =>
                            <Card className="Right">
                                <Card.Title>
                                <div className="ChatHeader">
                                        <Card.Img className="Profile" variant="top" src="https://capitant.be/wp-content/themes/capitant/assets/images/no-image.png" />
                                        <div className="AdDetails">
                                            <Card.Text className="UserName">{DeletedAd.modifiedByUser.name}</Card.Text>
                                            <Card.Text className="Expired">Expired</Card.Text>
                                        </div>
                                        <div className="MoreOptions"></div>
                                    </div>
                                    {/* <div>
                                        <Card.Img className="Profile" variant="top" src="https://capitant.be/wp-content/themes/capitant/assets/images/no-image.png" />
                                        <div className="AdDetails">
                                            <Card.Text className="UserName"></Card.Text>
                                            <Card.Text className="Expired">Expired</Card.Text>
                                        </div>
                                        <div className="MoreOptions"></div>

                                        {/* <div className="UserName">{this.props.DeletedAds}</div>
                                        <div className="MoreOptions"></div> 
                                    </div> */}
                                </Card.Title>
                                <Card.Body className="ChatBody">
                                    <Card.Text className="StatusText">This Ad is Deleted by you.</Card.Text>
                                    <Card.Text className="Reason">This is Deleted by you.If you are interested in reposting the Ad.Please Update the Ad and post that again</Card.Text>
                                </Card.Body>


                            </Card>} />
                    )}
            </Card>
        );
    }
}
function mapStateToProps(state: any) {
    debugger;
    return {
        DeletedAds: state.AdReducer.DeletedAds,
        DeletedAdsAvailable: state.AdReducer.DeletedAdsAvailable
    }
}
export default connect(mapStateToProps)(Deleted);
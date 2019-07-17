import React, { Component } from "react";
import { Card, ListGroup, InputGroup, FormControl } from "react-bootstrap";
import MessageList from "../MessageList";
import './Offers.sass';
import { Icon, Button } from "office-ui-fabric-react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Chat from './Chat';
class Offers extends Component<any, any>{
    render() {
        return (
            <Card className="Offers" >
                <Card className="Left">
                    <Card.Header>
                        Offers({this.props.Offers.length})
                    </Card.Header>
                    <Card.Body>
                        <ListGroup >
                            {
                                this.props.Offers.map((Offer: any) =>
                                    <Link to={"/Inbox/Offers/" + Offer.ad.id}>
                                        <ListGroup.Item className="OfferItem">
                                            {Offer.ad.images[0] != null ? <Card.Img className="OfferImage" variant="top" src={"data:image/jpeg;base64," + Offer.ad.images[0].image} /> :
                                                <Card.Img className="OfferImage" variant="top" src="https://capitant.be/wp-content/themes/capitant/assets/images/no-image.png" />}
                                            <Card.Body className="OfferDescription">
                                                <div className="Description">
                                                    <Card.Header className="OfferName">{Offer.ad.name}</Card.Header>
                                                    <Card.Text className="OfferAmount">{"Offered Amount : "+Offer.offerAmount}</Card.Text>
                                                </div>
                                                <div>
                                                    <Card.Text className="OfferTime">Timestamp</Card.Text>
                                                </div>
                                            </Card.Body>
                                        </ListGroup.Item>
                                    </Link>

                                )}
                        </ListGroup>
                    </Card.Body>
                </Card>
                {this.props.Offers.map((Offer: any, index: number) =>
                    <Route path={"/Inbox/Offers/" + Offer.ad.id} component={() => <Chat id={index} Offers={this.props.Offers} OfferID={Offer.id} />} />
                )
                }
            </Card>
        );
    }
}
function mapStateToProps(state: any) {
    return {
        OffersAvailable: state.OffersReducer.OffersAvailable,
        Offers: state.OffersReducer.Offers
    }
}
export default connect(mapStateToProps)(Offers);
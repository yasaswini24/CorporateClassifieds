import React from 'react';
import { Card, ListGroup, InputGroup, FormControl } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import MessageList from '../MessageList';
import Icon from 'react-icons-kit';
class Reports extends React.Component<any,any>{
    render(){
        return(
            <Card className="Offers" >
                <Card className="Left">
                    <Card.Header>
                        Reports
                    </Card.Header>
                    <Card.Body>
                        <ListGroup >
                            <Link to="/Inbox/Reports/Yamaha">
                                <ListGroup.Item className="OfferItem">
                                    <Card.Img className="OfferImage" variant="top" src="https://capitant.be/wp-content/themes/capitant/assets/images/no-image.png" />
                                    <Card.Body className="OfferDescription">
                                        <Card.Header className="OfferName">Yamaha R15</Card.Header>
                                        <Card.Text className="OfferTime">Timestamp</Card.Text>
                                        <Card.Text className="OfferAmount">Removed by Admin</Card.Text>
                                    </Card.Body>
                                </ListGroup.Item>
                            </Link>
                            <Link to="/Inbox/Reports/Avengers">
                                <ListGroup.Item className="OfferItem">
                                    <Card.Img className="OfferImage" variant="top" src="https://capitant.be/wp-content/themes/capitant/assets/images/no-image.png" />
                                    <Card.Body className="OfferDescription">
                                        <Card.Header className="OfferName">Avengers Tickets</Card.Header>
                                        <Card.Text className="OfferTime">Timestamp</Card.Text>
                                        <Card.Text className="OfferAmount">Removed by Admin</Card.Text>
                                    </Card.Body>
                                </ListGroup.Item>
                            </Link>
                        </ListGroup>
                    </Card.Body>
                </Card>
                <Route exact path="/Inbox/Reports/Yamaha" component={() =>
                    <Card className="Right">
                    <Card.Title>
                        <div>
                            <Card.Img className="Profile" variant="top" src="https://capitant.be/wp-content/themes/capitant/assets/images/no-image.png" />
                            <Card.Body className="OfferDescription1">
                            <Card.Text className="MoreOptions"></Card.Text>
                                <Card.Text className="OfferName">Admin</Card.Text>
                                <Card.Text className="OfferAmount">Removed Ad By Admin</Card.Text>
                            </Card.Body>

                        </div>
                    </Card.Title>
                    <Card.Body>
                        <Card.Text>{"This Ad id removed by Admin.Below is the reason provided by him"}</Card.Text>
                        <Card.Text>{"Provided Ad is not suitable for our portal.Think twice before you post an Ad in our Classified Portal"}</Card.Text>
                    </Card.Body>
                </Card>
            } />
            </Card>
        );
    }
}
export default Reports;
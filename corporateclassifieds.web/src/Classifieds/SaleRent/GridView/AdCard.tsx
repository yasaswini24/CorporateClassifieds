import React from 'react';
import { Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import './AdCard.sass';
import { ic_location_city } from 'react-icons-kit/md/ic_location_city';
import { Icon } from 'react-icons-kit';
import { Route } from 'react-router';
import { fetchAdByID } from '../../../Actions/AdActions';


export class AdCard extends React.Component<any, any>{
    DisplayAd = (AdID: number) => {
        // alert(AdID);
        this.props.dispatch(fetchAdByID(AdID));
    }

    render() {
        return (
            <div className="Test" onClick={this.DisplayAd.bind(this, this.props.item.id)}>

                <Card>
                    <Card.Title>
                        <div>
                            {
                                this.props.item.images[0] == null ?
                                    <Card.Img className="Profile" variant="top" src="https://capitant.be/wp-content/themes/capitant/assets/images/no-image.png" /> :
                                    <Card.Img className="Profile" variant="top" src={"data:image/jpeg;base64," + this.props.item.images[0].image} />
                            }

                            <div className="UserName">{this.props.item.createdByUser.name}</div>
                            <div className="CreatedOn">
                                {
                                    new Intl.DateTimeFormat('en-GB', {
                                        month: 'short',
                                        day: '2-digit',

                                    }).format(new Date(this.props.item.created))
                                } ,
                                {
                                    new Intl.DateTimeFormat('en-GB', {
                                        year: 'numeric'

                                    }).format(new Date(this.props.item.created))
                                }
                            </div>
                        </div>
                    </Card.Title>
                    {
                        this.props.item.images[0] == null ?
                            <Card.Img className="AdImage" variant="top" src="https://capitant.be/wp-content/themes/capitant/assets/images/no-image.png" /> :
                            <Card.Img className="AdImage" variant="top" src={"data:image/jpeg;base64," + this.props.item.images[0].image} />


                    }
                    <Card.Text className="AdTag">
                        <div className="AdName">
                            <Icon size={25} icon={ic_location_city} />
                            <span>{this.props.item.name}</span>
                        </div>
                        <div className="AdPrice">
                            <span><span>&#x20b9;</span> {this.props.item.price}</span>
                        </div>
                    </Card.Text>

                    <Card.Body>
                        <Card.Text className="AdDescription">
                            {this.props.item.description}
                        </Card.Text>
                        <Card.Footer>
                            <div className="Offers">
                                <Icon size={25} icon={ic_location_city} />
                                <span>{this.props.item.offersCount}</span>

                            </div>
                            <div className="Comments">
                                <Icon size={25} icon={ic_location_city} />
                                <span>{this.props.item.commentsCount}</span>

                            </div>
                            <Route path="/MyClassifieds" component=
                                {() =>
                                    this.props.AdStatusDisplay &&
                                    <div className="AdStatus">
                                        <span className={this.props.item.status.name.trim()}>{this.props.item.status.name}</span>
                                    </div>

                                } />

                        </Card.Footer>

                    </Card.Body>
                </Card>
            </div>
        );
    }
}
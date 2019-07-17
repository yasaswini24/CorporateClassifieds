import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import { TextField } from 'office-ui-fabric-react';
import { connect } from 'react-redux';
import { postOffer } from '../../../Actions/OffersActions';
interface IofferDetails{
    OfferAmount: number,
    OfferDesc: string,
    OfferBy : IUser,
    AdId : number
}
interface IUser{
    ID: number
}
class MakeAnOffer extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { OfferAmount: 0, Description : "", User: {Id: 4}};
    }
    change(e: any) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        );
    }
    submit = () =>{
        let offerDetails: IofferDetails = {OfferAmount: 0, OfferDesc: "", OfferBy: {ID: 4}, AdId: 0 };
        offerDetails.OfferAmount = this.state.OfferAmount;
        offerDetails.OfferDesc = this.state.Description;
        offerDetails.OfferBy.ID = this.state.User.Id;
        offerDetails.AdId = this.props.Adid;
        debugger;
        this.props.dispatch(postOffer(offerDetails));    
        this.props.viewOffer();
        this.setState({
            OfferAmount: 0, Description : "", User: {Id: 4}
        })
    }
    render() {
        return (
            <div className="MakeAnOfferMainDiv">
                <div className="MakeAnOfferInnerDiv">
                    <Card>
                        <CardHeader>
                            <h5 className="title">Make an Offer</h5>
                            <i className="fas fa-times closeIcon" onClick={() => { this.props.viewOffer() }}></i>
                        </CardHeader>
                        <CardBody>
                            <div className="inputFieldsWrapper">
                                <TextField label="Selling Amount" value="1234567890" className='OfferAdSP' type="number" disabled={true} />
                                <TextField label="Offer Amount" className='OfferAdOA' type="number" value = {this.state.OfferAmount} name = "OfferAmount" onChange = {this.change.bind(this)}/>
                            </div>
                            <TextField label="Description" className='OfferAdDesc' multiline rows={3} type="textarea" placeholder="provide your message..." name = "Description" onChange = {this.change.bind(this)} value = {this.state.Description}/>
                            <Button className="offerButton" onClick = {() => {this.submit()}}>Offer</Button>
                            <Button className="cancelButton" onClick={() => { this.props.viewOffer() }}>cancel</Button>
                        </CardBody>
                    </Card>

                </div>
            </div>
        );
    }
}


export default connect(undefined)(MakeAnOffer);
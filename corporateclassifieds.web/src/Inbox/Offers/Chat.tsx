import React, { Component } from "react";
import { Card, InputGroup, FormControl } from "react-bootstrap";
import MessageList from "../MessageList";
import './Offers.sass';
import './Chat.sass';
import { Icon } from "office-ui-fabric-react";
import { postMessage, fetchOfferChat } from '../../Actions/ChatActions'
import { connect } from "react-redux";
class Chat extends Component<any, any>{
    // componentDidMount(){
    //     this.props.dispatch(fetchChat(this.props.ChatListID));
    // }
    constructor(props: any) {
        super(props);
        this.state = { OfferID: (this.props.Offers[this.props.id].id), Message: "", SenderDetails: { ID: 3 }, ReceiverDetails: { ID: this.props.Offers[this.props.id].offerByDetails.id } };
        this.props.dispatch(fetchOfferChat(props.OfferID));
    }
    getChat() {
        debugger;
        // setInterval(this.props.dispatch(fetchOfferChat(this.state.OfferID)), 100000);
    }

    SendMessage = (event: any) => {
        let chat:any = this.state;
        chat.Message=chat.Message.trim();
        if (event.key === "Enter"&&chat.Message!="") {
            // alert(JSON.stringify(chat));
            this.props.dispatch(postMessage(chat));
            // this.props.dispatch(fetchOfferChat(this.props.OfferID));
            this.setState({ Message: "" });
        }
    }
    handleChange = (event: any) => {
        this.setState(
            {
                Message: event.target.value

            }
        );
    }
    render() {
        debugger;
        return (

            <Card className="Right">
                <Card.Title>
                    <div>
                        <Card.Img className="Profile" variant="top" src="https://vignette.wikia.nocookie.net/harrypotterfanon/images/7/7f/Harry_Potterbop.jpg/revision/latest?cb=20130117044202" />
                        <Card.Body className="OfferDescription1">
                            <Card.Text className="MoreOptions"></Card.Text>
                            <Card.Text className="OfferName">{this.props.Offers[this.props.id].offerByDetails.name}</Card.Text>
                            <Card.Text className="OfferAmount">Offered amount:{this.props.Offers[this.props.id].offerAmount}</Card.Text>
                        </Card.Body>

                    </div>
                </Card.Title>
                <Card.Body className="ChatBody" onLoad={this.getChat.bind(this)}>
                    {this.props.ChatAvailable && this.props.Chat.map((item: any) =>
                        <MessageList message={item} />)}
                </Card.Body>
                <Card.Footer>
                    {/* <InputGroup size="lg"> */}
                    {/* <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" /> */}
                    {/* <InputGroup.Append> */}
                    {/* <InputGroup.Text id="inputGroup-sizing-lg" onKeyPress={this.SendMessage.bind(this)} onClick={() => alert("send message")}><Icon iconName="send" /></InputGroup.Text> */}
                    {/* <input type="text field" onKeyPress={this.SendMessage.bind(this)} /> */}
                    {/* </InputGroup.Append> */}
                    {/* </InputGroup> */}
                    <textarea className="SendBox" name="Message" onChange={this.handleChange.bind(this)} value={this.state.Message} onKeyPress={this.SendMessage.bind(this)} />
                    <Icon iconName="Send" className="SendIcon" onClick={this.SendMessage.bind(this)} />
                    {/* <input type="submit" name="submit" /> */}
                </Card.Footer>
            </Card>


        );
    }
}

function mapStateToProps(state: any) {
    return {
        Chat: state.ChatReducer.Messages,
        ChatAvailable: state.ChatReducer.MessagesAvailable
    }
}
export default connect(mapStateToProps)(Chat);
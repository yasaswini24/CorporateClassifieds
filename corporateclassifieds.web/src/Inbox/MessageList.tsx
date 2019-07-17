import React from 'react';
import { Card } from 'react-bootstrap';
import './MessageList.sass';
class MessageList extends React.Component<any, any>{
    render() {
        return (
            <div className="Messages">
                {this.props.message.receiverDetails.id == 3 ?
                    <div className="MessageLeft">
                        <div>
                            <Card.Img className="Profile1" variant="top" src="https://vignette.wikia.nocookie.net/harrypotterfanon/images/7/7f/Harry_Potterbop.jpg/revision/latest?cb=20130117044202" />
                            <Card.Text className="Profile1Name">{this.props.message.senderDetails.name.trim()}</Card.Text>
                        </div>
                        <Card className="Message">

                            <Card.Text>
                                {this.props.message.message}
                            </Card.Text>
                        </Card>
                    </div> :
                    <div className="MessageRight">
                        <Card.Img className="Profile2" variant="top" src="https://vignette.wikia.nocookie.net/harrypotterfanon/images/7/7f/Harry_Potterbop.jpg/revision/latest?cb=20130117044202" />
                        <Card.Text className="Profile2Name">{this.props.message.senderDetails.name.trim()}</Card.Text>
                        <Card className="Message">

                            <Card.Text>
                                {this.props.message.message}
                            </Card.Text>
                        </Card>
                    </div>
                }
            </div>
        );
    }
}
export default MessageList;
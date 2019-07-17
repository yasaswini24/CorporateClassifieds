import React, { Component } from 'react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { initializeIcons } from '@uifabric/icons';
import { connect } from "react-redux";
import { Card, Table, ListGroup, ListGroupItem, Modal, Button } from 'react-bootstrap';
import { Checkbox } from 'office-ui-fabric-react';
import { FetchUsers, UpsertUser, ChangeUsersModalStatus } from '../../Actions/UserActions';
import './Users.sass';

initializeIcons();
class Users extends Component<any, any>
{
    constructor(props: any) {
        super(props);
        this.state = {
            UsersList: []
        }
    }
    componentWillMount() {
        debugger;
        this.props.dispatch(FetchUsers());
    }

    handleChange(index: number, e: any) {
        debugger;
        let users = this.state.UsersList;
        let user = users[index];
        // let a=e.target.name;
        user[e.target.name] = !user[e.target.name];
        this.setState({ UsersList: users });
    }

    SaveChanges() {
        console.log(this.state);
        let UsersList = this.state.UsersList;
        this.props.dispatch(UpsertUser(UsersList));
    }
    componentWillReceiveProps(nextProps: any) {
        debugger;
        this.setState({ UsersList: nextProps.Users});
    }

    handleClose(){
        this.props.dispatch(ChangeUsersModalStatus());
        // this.setState({ShowPopUp:false});
    }

    render() {
        return (
            <div className="Users">
                <main className="content-wrapper">
                    <div className="header">
                        <h1>Users</h1>
                        <p>Here you can manage users.</p>
                        <div className="cta-button-panel" onClick={this.SaveChanges.bind(this)}>

                            <div className="btn btn-primary">
                                Save
                                </div>

                        </div>
                    </div>

                    <div className="Users">
                        <Card className="UsersList">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th className="Profile">Profile</th>
                                        <th className="Name" >Name</th>
                                        <th className="Email">Email</th>
                                        <th className="Phone">Phone</th>
                                        <th className="Location">Location</th>
                                        <th className="IsActive">IsActive</th>
                                        <th className="Permission">Act as Admin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.Users.map((User: any, index: number) =>

                                        <tr>
                                            <td className="Profile">
                                                {User.picture != null ?
                                                    <img className="ListProductImage" src={`data:image/jpeg;base64,${User.picture}`} alt="Ad" /> :
                                                    <img className="ListProductImage" src="https://capitant.be/wp-content/themes/capitant/assets/images/no-image.png" alt="Ad" />
                                                }</td>
                                            <td className="Name">{User.name.trim()}</td>
                                            <td className="Email">{User.email.trim()}</td>
                                            <td className="Phone">{User.phone}</td>
                                            <td className="Location">{User.location}</td>
                                            <td className="IsActive">
                                                <Checkbox name="isActive" styles={{ root: { width: 150 } }} checked={User.isActive} onChange={this.handleChange.bind(this, index)} />
                                            </td>
                                            <td className="Permission">
                                                <Checkbox name="permission" styles={{ root: { width: 150 } }} checked={User.permission} onChange={this.handleChange.bind(this, index)} />
                                            </td>


                                        </tr>

                                    )}

                                </tbody>
                            </Table>
                            
                            
                            {this.props.Updated && <Modal className="UsersModal" show={true} onHide={this.handleClose.bind(this)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Success</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Users Info Updation Successful</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={this.handleClose.bind(this)}>
                                        Ok
                                    </Button>
                                </Modal.Footer>
                            </Modal>}
                        </Card>
                    </div>


                </main>
            </div>

        );
    }
}
function mapStateToProps(state: any) {
    debugger;
    return {
        Users: state.UserReducer.Users,
        Updated:state.UserReducer.UpsertUserSuccess
    }
}
export default connect(mapStateToProps)(Users);














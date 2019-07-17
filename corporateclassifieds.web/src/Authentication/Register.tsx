import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { DefaultButton, Label, TextField, PrimaryButton } from 'office-ui-fabric-react';
import { Card } from 'react-bootstrap';
import './Register.sass';
import DefaultProfilePic from '../Images/DefaultProfilePic.png';
import Authentication from './Authentication';
import { RegisterUser, UserSignUpBegin, ValidateUserBegin, CheckUserName } from '../Actions/UserActions';
import TechnovertLogo from '../Images/TechnovertLogo.png';
const imageMaxSize = 10000000 // bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
var Background = require('../Images/background.jfif');

const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => { return item.trim() })
var sortedImgFiles = new Array();
class Register extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            UserName: '',
            password: '', User: { name: "", email: "", phone: "", location: "", Picture: [] }
        }
        this.props.dispatch(UserSignUpBegin());
    }
    handlePress(e: any) {
        if (e.keyCode == 13) {
            let UserDetails = this.state;
            console.log(UserDetails.User.Picture);
            this.props.dispatch(RegisterUser(UserDetails));
            this.setState({
                UserName: '', password: '', User: { name: "", email: "", phone: "", location: "", Picture: [] }
            });
        }
    }
    handleClick() {
        let UserDetails = this.state;
        // console.log(this.state);
        this.props.dispatch(RegisterUser(UserDetails));
        console.log(UserDetails.User.Picture);
        this.setState({
            UserName: '', password: '', User: { name: "", email: "", phone: "", location: "", Picture: [] }
        });
    }

    handleBack() {
        this.props.dispatch(ValidateUserBegin());
    }

    verifyFile = (files: any) => {
        if (files && files.length > 0) {

            files.map((item: any) => {
                const currentFile = item
                const currentFileType = currentFile.type
                const currentFileSize = currentFile.size
                if (currentFileSize > imageMaxSize) {
                    alert("This file is not allowed. " + currentFileSize + " bytes are too large")
                    return false
                }
                if (!acceptedFileTypesArray.includes(currentFileType)) {
                    alert("This file is not allowed. Only images are allowed.")
                    return false
                }
                else {
                    sortedImgFiles.push(item);
                    return true
                }
            })

            return true;
        }
    }

    handleOnDrop = (file: any, rejectedFile: any) => {
        debugger;
        if (rejectedFile && rejectedFile.length > 0) {
            this.verifyFile(rejectedFile)
        }

        if (file) {
            const isVerified = this.verifyFile(file)
            if (isVerified === true) {
                let currentFile: any = file[0];
                let myFileItemReader = new FileReader();
                let myResult: any;
                myFileItemReader.addEventListener("load", () => {
                    myResult = myFileItemReader.result;
                    let image = myResult.split("data:image/jpeg;base64,")[1];
                    // console.log(image);
                    this.setState({
                        User: { ...this.state.User, Picture: image }
                    })
                }, false);
                // console.log(this.state);
                myFileItemReader.readAsDataURL(currentFile);
            }
        }
    }
    render() {
        return (
            <div className="Registration">
                {this.props.UserSignUp ?
                    <div className="Authentication" onKeyDown={this.handlePress.bind(this)}>
                        <div className="Image">
                            <img src={Background} className="Background" />
                        </div>
                        <div className="Login">
                            <img src={TechnovertLogo} className="TechnovertLogo" />



                            <Card className="RegisterCard" border="light" style={{ width: '18rem' }}>
                                <Card.Header>
                                    <Card.Title>
                                        Corporate Classifieds
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>

                                    <Dropzone onDrop={this.handleOnDrop} accept={acceptedFileTypesArray} maxSize={imageMaxSize}>
                                        {({ getRootProps, getInputProps }) => (
                                            <section>
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <div className="ms-Grid-row PostAdImage">
                                                        <div className="ms-Grid-row pos">
                                                            <div className="ms-Grid-col ms-sm12 profilePic">
                                                                {this.state.User.Picture.length == 0 ? <div>
                                                                    <img className="ProfilePic" width={128} height={128} src={DefaultProfilePic} alt="ad" />

                                                                    <i className="fas fa-plus"></i>
                                                                    {/* <DefaultButton text="+Add images" allowDisabledFocus={true} /> */}
                                                                </div>
                                                                    : <img className="ProfilePic" width={128} height={128} src={`data:image/jpeg;base64,${this.state.User.Picture}`} alt="ad" />}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </section>
                                        )}
                                    </Dropzone>

                                    {this.props.UserExists && <Card.Text className="UserExists">UserName already Exists</Card.Text>}

                                    <TextField label="User Name" name="UserName" value={this.state.UserName} placeholder="enter your username" 
                                    onChange={(event, newValue) => this.setState({ UserName: newValue })} onBlur={()=>this.props.dispatch(CheckUserName(this.state.UserName))}/>

                                    <br />

                                    <TextField type="password" label="Password" name="Password" value={this.state.password} placeholder="enter your password"
                                        onChange={(event, newValue) => {
                                            this.setState({ password: newValue })
                                        }}
                                         />

                                    <br />

                                    <TextField label="Name" name="Name" placeholder="enter your name" value={this.state.User.name}
                                        onChange={(event, newValue) => this.setState({ User: { ...this.state.User, name: newValue } })} />


                                    <br />

                                    <TextField label="Email" type="email" name="Email" value={this.state.User.email} placeholder="enter your email"
                                        onChange={(event, newValue) => this.setState({ User: { ...this.state.User, email: newValue } })} />

                                    <br />

                                    <TextField type="number" label="Phone" name="Phone" value={this.state.User.phone} placeholder="enter your phone number"
                                        onChange={(event, newValue) => this.setState({ User: { ...this.state.User, phone: newValue } })} />


                                    <br />

                                    <TextField type="text" label="Location" name="Location" value={this.state.User.location} placeholder="enter your location"
                                        onChange={(event, newValue) => this.setState({ User: { ...this.state.User, location: newValue } })} />

                                    <br />

                                    <Card.Text className="Buttons">
                                        <PrimaryButton text="Back" primary={true} style={style} onClick={this.handleBack.bind(this)} />
                                        <PrimaryButton text="Signup" primary={true} style={style} onClick={this.handleClick.bind(this)} />
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                        </div>
                    </div> :

                    <Authentication />
                }
            </div>
        );
    }
}
const style = {
    margin: 15,
};

function mapStateToProps(state: any) {
    return {
        UserSignnedIn: state.UserReducer.SignIn,
        UserSignError: state.UserReducer.SignUpError,
        UserSignUp: state.UserReducer.SignUp,
        UserExists: state.UserReducer.UserExists
    }
}

export default connect(mapStateToProps)(Register);
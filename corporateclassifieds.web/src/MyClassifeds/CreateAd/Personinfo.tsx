import React, { Component } from 'react';
import './Personinfo.css';
import { connect } from 'react-redux';
// import './Imageslide.css';
import { PrimaryButton, Icon } from 'office-ui-fabric-react';
import Icons from 'react-icons-kit';
import { ic_phone_android } from 'react-icons-kit/md/ic_phone_android';
import { Checkbox, TextField } from 'office-ui-fabric-react/lib';

export interface ICheckboxBasicExampleState {
    isChecked: boolean;
}

class Personinfo extends Component<any, ICheckboxBasicExampleState, {}> {
    constructor(props: any) {
        super(props);
        const PostAdPersonInfo = this.props.PostAdPersonInfo;

    }

    render() {
        return (
            <div className="ms-Grid-row">
                <div className="card PersoninfoMainDiv">
                    <div className="card-header">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
                                <h3 className='publish'>Published by</h3>
                            </div>
                            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2"></div>
                            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                                {!this.props.PostAdPersonInfo == true &&
                                    <h4 className="text-muted postdate">18 April,2019</h4>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                                <img width={32} height={32}  alt="propic" className="img-circle propic" />
                            </div>
                            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg8 PersonInfoPronameCol">
                                <p className="proname">Vamsea</p>
                            </div>
                        </div>
                        <div className="ms-Grid-row PersonInfoContactDetails">
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                                    <i className="fas fa-map-marker-alt locicon">
                                    </i>
                                </div>
                                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                                    <p className="postownlocation">KPHB, Hyderbad</p>
                                </div>
                                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                                    <i className="fas fa-envelope mailicon"></i>
                                </div>
                                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                                    <p className="postownmail">abcdef@gh.com</p>
                                </div>

                            </div>
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                                    <Icons icon={ic_phone_android} className='phoneicon'></Icons>
                                </div>
                                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                                    <p className="postownnumber">1234567890</p>
                                </div>

                                {!this.props.PostAdPersonInfo == true &&
                                    <div>
                                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                                            <i className="far fa-clock expireicon"></i>
                                        </div>
                                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4"   >
                                            <p className="postexpiredate">878258/4537</p>
                                        </div>
                                    </div>
                                }

                                {this.props.PostAdPersonInfo == true &&
                                    <div>

                                        <div className="ms-Grid-col ms-sm6">
                                            <Checkbox label="Show contact number" />
                                        </div>

                                    </div>
                                }
                            </div>
                            {this.props.PostAdPersonInfo == true &&
                                <div className="ms-Grid-row">
                                    <div className="ms-Grid-col ms-sm7">
                                        <TextField label="Ad expires in" suffix="days" ariaLabel="Example text field with https:// prefix" />
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm4"></div>
                            <div className="ms-Grid-col ms-sm8">
                                <div className="ms-Grid-col ms-sm1"></div>
                                <div className="ms-Grid-col ms-sm4">
                                    {!this.props.PostAdPersonInfo == true &&
                                        <PrimaryButton className="Reportbutton" text="Report" allowDisabledFocus={true} />
                                    }
                                    {this.props.PostAdPersonInfo == true &&
                                        <PrimaryButton className="Reportbutton" text="Cancel" allowDisabledFocus={true} />
                                    }
                                </div>
                                <div className="ms-Grid-col ms-sm6">
                                    {this.props.PostAdPersonInfo == true &&
                                        <PrimaryButton className="Offeradbutton" text="Post Ad" allowDisabledFocus={true} onClick={()=>this.props.submission()} />
                                    }
                                    {!this.props.PostAdPersonInfo == true &&
                                        <PrimaryButton className="Offeradbutton" text="Post Ad" allowDisabledFocus={true} />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="ms-Grid-row"></div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        AdListItem: state.AdList
    };
}

export default connect(mapStateToProps, undefined)(Personinfo);
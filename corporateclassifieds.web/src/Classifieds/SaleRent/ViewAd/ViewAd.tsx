import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { Icon } from 'react-icons-kit';
import { ic_arrow_back } from 'react-icons-kit/md/ic_arrow_back';
import { PrimaryButton } from 'office-ui-fabric-react';
import Icons from 'react-icons-kit';
import { ic_phone_android } from 'react-icons-kit/md/ic_phone_android';
import '../../../MyClassifeds/CreateAd/Personinfo.sass';
import '../../../MyClassifeds/CreateAd/Imageslide.sass';
import './ViewAd.sass';
import { changeDisplayAd } from '../../../Actions/AdActions';
import ReportAd from './ReportAd';
import MakeAnOffer from './MakeAnOffer';
import './ReportAd.sass';
import './MakeAnOffer.sass';


class ViewAd extends Component<any, any> {

    constructor(props: any) {
        super(props);
        props.AdItem.images[0] == null ?
            this.state = {
                StartIndex: 0
            } :
            this.state = {
                imgsrc: props.AdItem.images[0].image,
                StartIndex: 0,
                viewReport: false,
                viewOffer: false
            };
        var url: string = this.props.path + props.AdItem.id;
        debugger;
        window.location.href = url;
    }

    componentWillUnmount = () => {
        this.props.dispatch(changeDisplayAd(0));
    }

    Back = () => {
        this.props.dispatch(changeDisplayAd(0));
    }


    public DisplayImage(details: any) {
        this.setState(
            this.state = { imgsrc: details.image }
        );
        console.log(this.state);
    }
    OnclickLeft() {
        if (this.state.StartIndex == 0) {
            this.setState(
                {
                    StartIndex: 4 * (Math.floor(this.props.AdItem.images.length / 4))
                }
            )
        }
        else {
            this.setState(
                {
                    StartIndex: this.state.StartIndex - 4
                }
            )
        }
    }
    OnclickRigth() {

        if (this.state.StartIndex >= 4 * (Math.floor(this.props.AdItem.images.length / 4))) {
            this.setState(
                {
                    StartIndex: 0
                }
            )
        }
        else {
            this.setState({
                StartIndex: this.state.StartIndex + 4
            }
            )
        }
    }
    viewReport = () => {
        this.setState({
            viewReport: !this.state.viewReport
        })
    }
    viewOffer = () => {
        this.setState({
            viewOffer: !this.state.viewOffer
        })
    }

    render() {
        debugger;
        return (
            <div className="ms-Grid-row ViewAdMainDiv">
                {
                    this.state.viewReport == true &&
                    <ReportAd viewReport={this.viewReport} Adid={this.props.AdItem.id} />
                }
                {
                    this.state.viewOffer == true &&
                    <MakeAnOffer viewOffer={this.viewOffer} Adid={this.props.AdItem.id} />
                }
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-lg12 PostAdBackToList" onClick={this.Back.bind(this)}>
                        <p>
                            <Icon icon={ic_arrow_back} size={32} className="BackArrow" />
                            Back to List
                        </p>
                    </div>
                </div>
                <div className="Details">
                    <div className="ms-Grid-col  ms-lg7">

                        <div className="ms-Grid-row ViewAdDetailsMainDiv">
                            <Card>
                                <div className='ProdImgView'>
                                    {

                                        this.props.AdItem.images[0] == null ?
                                            <img className='prodimg' src="https://capitant.be/wp-content/themes/capitant/assets/images/no-image.png" alt="Ad" /> :
                                            <img src={"data:image/jpeg;base64," + this.state.imgsrc} alt="avengers" className='prodimg' />
                                    }
                                    {/* <img src={"data:image/jpeg;base64," + this.state.imgsrc} alt="avengers" className='prodimg' /> */}

                                    <div className="prodprice">
                                        <p className="prodpriceP"><i className="fas fa-rupee-sign"></i>{this.props.AdItem.price}</p>
                                    </div>
                                </div>
                            </Card>

                            <div className="ms-Grid-row asd">
                                <Card>
                                    <div className="ImageslideMainDiv"
                                        style={{
                                            transform: `translate(-${100 * (this.state.StartIndex / 4)}%)`,
                                            gridTemplateColumns: `repeat(${this.props.AdItem.images.length},${100 / 4}%)`,
                                        }}>
                                        {this.props.AdItem.images.map((item: any, index: number) => <div className="item ">
                                            <div><img src={"data:image/jpeg;base64," + item.image} className="img-responsive" height={128} width={128} onClick={() => { this.DisplayImage(item) }} /></div>
                                        </div>)}

                                    </div>
                                    <a href="#theCarousel" className="left carousel-control left" onClick={() => this.OnclickLeft()}>
                                        <i className="fas fa-chevron-left ChevronIcon"></i>
                                    </a>
                                    <a href="#theCarousel" className="right carousel-control right" onClick={() => this.OnclickRigth()}>
                                        <i className="fas fa-chevron-right ChevronIcon"></i>
                                    </a>
                                </Card>
                            </div>
                            <Card>
                                <div className="CarddescMaindiv">
                                    <div className="ms-Grid-row">
                                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4 ">
                                            <h3 className="productNameInAdView">{this.props.AdItem.name}</h3>
                                        </div>
                                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg5">

                                        </div>
                                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
                                            <i className="fas fa-share-alt ShareIconInAdView text-muted"></i>
                                        </div>
                                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
                                            <p className="offersCount text-muted"><i className="fas fa-hand-holding-usd OfferIconInAdView text-muted"></i>{this.props.AdItem.offersCount}</p>
                                        </div>
                                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg1">
                                            <p className="offersCount text-muted"><i className="fas fa-eye ViewIconInAdView text-muted"></i>{this.props.AdItem.views}</p>
                                        </div>
                                    </div>
                                    <div className="ms-Grid-row">
                                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
                                            <p className='text-muted productCatInAdView'><i className="fas fa-rupee-sign"></i>{this.props.AdItem.price}</p>
                                        </div>
                                    </div>
                                    <div className="ms-Grid-row">
                                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg12">
                                            <p className="productdescInAdView">
                                                {this.props.AdItem.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </Card>
                        </div>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg5">
                        <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg12 PersonInfoDiv">
                            <div className="card PersoninfoMainDiv">
                                <Card>
                                    <CardHeader className="cardHeader">
                                        <h5 className='publish'>Published by</h5>
                                        <h6 className="text-muted postdate">{this.props.AdItem.createdByUser.created}</h6>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="cardBodyRow1">
                                            <img width={32} height={32} alt="propic" className="img-circle propic" src="https://capitant.be/wp-content/themes/capitant/assets/images/no-image.png" />
                                            <p className="proname">{this.props.AdItem.createdByUser.name}</p>
                                        </div>
                                        <div className="cardBodyRow2">
                                            <div className="placeDetails">
                                                <i className="fas fa-map-marker-alt locicon"></i>
                                                <p className="postownlocation">{this.props.AdItem.createdByUser.location}</p>
                                            </div>
                                            <div className="mailDetails">
                                                <i className="fas fa-envelope mailicon"></i>
                                                <p className="postownmail">{this.props.AdItem.createdByUser.email}</p>
                                            </div>
                                        </div>
                                        <div className="cardBodyRow3">
                                            <div className="numberDetails">
                                                <i className="fas fa-phone phoneicon"></i>
                                                <p className="postownnumber">{this.props.AdItem.createdByUser.phone}</p>
                                            </div>
                                            <div className="expiryDetails">
                                                <i className="far fa-clock expireicon"></i>
                                                <p className="postexpiredate">{this.props.AdItem.expiry} days</p>
                                            </div>
                                        </div>
                                        <div className="cardBodyRow4">
                                            {
                                                window.location.href.includes("Classifieds/SaleRent") == true &&
                                                <div>
                                                    < PrimaryButton className="Reportbutton" text="Report" allowDisabledFocus={true} onClick={() => { this.viewReport() }} />
                                                    <PrimaryButton className="Offeradbutton" text="Make an Offer" allowDisabledFocus={true} onClick={() => { this.viewOffer() }} />
                                                </div>
                                            }
                                            {
                                                window.location.href.includes("MyClassifieds/ActiveClassifieds") == true &&
                                                <div>
                                                    < PrimaryButton className="Reportbutton" text="Edit" allowDisabledFocus={true} />
                                                    <PrimaryButton className="Offeradbutton" text="Remove Ad" allowDisabledFocus={true} />
                                                </div>
                                            }
                                            {
                                                window.location.href.includes("MyClassifieds/History") == true && this.props.AdItem.status.id != 4 &&
                                                <div>
                                                    < PrimaryButton className="Reportbutton" text="Edit" allowDisabledFocus={true} />
                                                    <PrimaryButton className="Offeradbutton" text="Re-Post" allowDisabledFocus={true} />
                                                </div>
                                            }
                                            {
                                                window.location.href.includes("MyClassifieds/History") == true && this.props.AdItem.status.id == 4 &&
                                                <div>
                                                    < PrimaryButton className="Reportbutton" text="Edit" allowDisabledFocus={true} />
                                                    <PrimaryButton className="Offeradbutton" text="Send for Approval" allowDisabledFocus={true} />
                                                </div>
                                            }
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </div>
                    {this.props.AdItem.status.id == 4 && window.location.href.includes("MyClassifieds/History") &&
                        <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg5 RemovedByAdmin">
                            <Card>
                                <CardHeader>
                                    <h5>{this.props.AdItem.status.name.trim()}</h5>
                                </CardHeader>
                                <CardBody>
                                    <p>" {this.props.AdItem.status.description.trim()} "</p>
                                </CardBody>
                            </Card>
                        </div>
                    }
                </div>
            </div >
        );
    }
}

function mapStateToProps(state: any) {
    debugger;
    return {
        AdItem: state.AdReducer.Ad[0],


    };
}

export default connect(mapStateToProps, undefined)(ViewAd);
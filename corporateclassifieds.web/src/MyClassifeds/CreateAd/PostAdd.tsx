import React from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'react-icons-kit';
import { connect } from 'react-redux';
import { postAd } from '../../Actions/AdActions';
import { AttributesFetch, AttributeFetchBegin } from "../../Actions/AttributesActions";
import { CategoriesFetch, CategoryFetchBegin } from '../../Actions/CategoryActions';
import { ic_arrow_back } from 'react-icons-kit/md/ic_arrow_back';
import Card from '../../../node_modules/react-bootstrap/Card';
import { TextField, Checkbox, initializeIcons, DefaultButton, Label, PrimaryButton } from 'office-ui-fabric-react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import './images.png';
import './PostAdd.sass';
import './Personinfo.sass';
import './Imageslide.sass';
import { Link } from 'react-router-dom';
import { fetchCategoryByID } from '../../Actions/CategoryActions';

initializeIcons();
const imageMaxSize = 10000000 // bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => { return item.trim() })
var sortedImgFiles = new Array();

interface IUser {
    ID: number
}
interface ICategory {
    ID: number
}
interface IStatus {
    ID: number
}
interface IAds {
    Name: string,
    Type: string,
    Expiry: number,
    Price: number,
    Description: string,
    CreatedByUser: IUser,
    ModifiedByUser: IUser,
    Status: IStatus,
    CategoryDetails: ICategory,
    Images: [],
    ExtraAttributes: string
}

class PostAdd extends React.Component<any, any>
{
    constructor(props: any) {
        super(props);
        this.state = {
            StartIndex: 0, ExtraAttributes: [],
            Type: "Select", CategoryDetails: { id: 1 }, Price: 0, Name: "", Description: "", CreatedByUser: { id: 3 }, ModifiedByUser: { id: 3 }, Status: { id: 1 }, Expiry: 0, imgToBeUploaded: [], Images: []
        };
    }
    componentWillMount() {
        debugger;
        this.props.dispatch(CategoriesFetch());
        this.props.dispatch(CategoryFetchBegin());
    }
    submit() {
        let Ad: IAds = { Type: "", CategoryDetails: { ID: 1 }, Price: 0, Name: "", Description: "", CreatedByUser: { ID: 1 }, ModifiedByUser: { ID: 1 }, Status: { ID: 1 }, Expiry: 0, Images: [], ExtraAttributes: "" };
        Ad.Name = this.state.Name;
        Ad.Type = this.state.Type;
        Ad.CategoryDetails.ID = this.state.CategoryDetails.id;
        Ad.Price = this.state.Price;
        Ad.Description = this.state.Description;
        Ad.CreatedByUser.ID = this.state.CreatedByUser.id;
        Ad.ModifiedByUser.ID = this.state.ModifiedByUser.id;
        Ad.Status = this.state.Status;
        Ad.Expiry = this.state.Expiry;
        Ad.Images = this.state.Images;
        var ExtraAttributes: any = [];
        {
            this.props.Attributes.map((item: any) => {
                var Attribute = { name: "" };
                Attribute.name = item.name;
                ExtraAttributes.push(Attribute);
            }
            )
        }

        console.log(ExtraAttributes);

        Ad.ExtraAttributes = JSON.stringify(ExtraAttributes);

        console.log(Ad.ExtraAttributes + "==============");
        console.log(this.state);

        this.props.dispatch(postAd(Ad));
        this.setState({ Type: "", CategoryDetails: { id: 1 }, Price: 0, Name: "", Description: "", CreatedByUser: { id: 1 }, ModifiedByUser: { id: 1 }, Status: { id: 1 }, Expiry: 0 });

        this.props.history.push("/MyClassifieds/ActiveClassifieds");
    }
    change(e: any) {
        debugger;
        this.setState(
            {
                [e.target.name]: e.target.value

            }
        );
    }
    getAttributes(e: any) {
        // debugger;
        if (e.target.selectedIndex != 0) {
            var categoryID = e.target.options[e.target.selectedIndex].id;
            this.props.dispatch(fetchCategoryByID(categoryID));
            var ExtraAttributesList: any = [];
            {
                this.props.Attributes.map((item: any) => {
                    var Attribute = { [item.name]: "" };
                    // Attribute.name = item.name;
                    ExtraAttributesList.push(Attribute);
                }
                )
            }
            this.setState({ CategoryDetails: { id: categoryID }, ExtraAttributes: ExtraAttributesList });
        }
    }
    verifyFile = (files: any) => {
        if (files && files.length > 0) {

            files.map((item: any) => {
                // debugger;
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

    handleOnDrop = (files: any, rejectedFiles: any) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            this.verifyFile(rejectedFiles)
        }

        if (files && files.length > 0) {
            const isVerified = this.verifyFile(files)
            if (isVerified === true) {
                // imageBase64Data 
                files.map((item: any) => {
                    let currentFile: any = item
                    let myFileItemReader = new FileReader()
                    let myResult: any
                    myFileItemReader.addEventListener("load", () => {
                        // console.log(myFileItemReader.result)
                        myResult = myFileItemReader.result;
                        let a = myResult.split(',')[1];
                        // var bytes=this._base64ToArrayBuffer(a);
                        // debugger;
                        // console.log(byte);
                        this.setState({
                            imgToBeUploaded: [...this.state.imgToBeUploaded, myResult],
                            Images: [...this.state.Images, { image: a }],
                            //Images:[...this.state.Images,bytes],
                            imgsrc: myResult
                        })

                    }, false)

                    myFileItemReader.readAsDataURL(currentFile)

                })

            }
        }
    }
    DisplayImage(details: any) {

        this.setState(
            this.state = { imgsrc: details }
        );
        console.log(this.state);
    }
    DeleteImage = (details: any) => {
        let index = this.state.imgToBeUploaded.indexOf(details)
        debugger;
        let images = this.state.Images;
        images.splice(index, 1);
        this.setState({
            deleted: this.state.imgToBeUploaded.splice(index, 1),
            imgsrc: this.state.imgToBeUploaded[0],
            Images: images

        })
    }
    OnclickLeft() {
        if (this.state.StartIndex == 0) {
            this.setState(
                {
                    StartIndex: 4 * (Math.floor(this.state.imgToBeUploaded.length / 4))
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

        if (this.state.StartIndex >= 4 * (Math.floor(this.state.imgToBeUploaded.length / 4))) {
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
    render() {
        return (
            <div className="PostAddMainDiv">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-lg12 PostAdBackToList">
                        <Link to="/MyClassifieds/ActiveClassifieds">
                            <p> <Icon icon={ic_arrow_back} size={32} className="BackArrow" /> Back to List</p>
                        </Link>
                    </div>
                </div>
                <div className="PostDetails">
                    {/* Left side*/}
                    <div className="ms-Grid-col ms-lg8 ItemDetailsMainCol">

                        <div className="ms-Grid-row adDetails">
                            <div className="ms-Grid-row ItemDetailsMainRow">
                                <div className="ms-Grid-row">
                                    <div className="ms-Grid-col ms-sm4">
                                        <h3>Item Details</h3>
                                    </div>
                                </div>

                                <div className="ms-Grid-row">

                                    <div className="ms-Grid-col ms-sm4">
                                        <p className="AdTitlePtag text-muted">Ad Type</p>
                                        <select className="ms-Dropdown-select" name="Type" onChange={this.change.bind(this)}>
                                            <option>select</option>
                                            <option>For Sale</option>
                                            <option>For Rent</option>
                                            <option>Required</option>



                                        </select>
                                    </div>

                                    <div className="ms-Grid-col ms-sm4">
                                        <p className="CategoryPtag text-muted">Category</p>
                                        <select className="ms-Dropdown-select" name="CategoryDetails" onChange={this.getAttributes.bind(this)}>
                                            <option key="0">select</option>
                                            {
                                                this.props.Categories.map((category: any) =>
                                                    <option key={category.id} id={category.id} >{category.name}</option>
                                                )
                                            }

                                        </select>
                                    </div>

                                    <div className="ms-Grid-col ms-sm4 ">
                                        <TextField label="Price" className='PostAdPrice' prefix='$' type="number" onChange={this.change.bind(this)} value={this.state.Price} name="Price" />
                                    </div>
                                    <div className="ms-Grid-col ms-sm12 ">
                                        <TextField label="Ad Title" value={this.state.Name} className='PostAdTitle' placeholder="Ad Title" type="textfield" onChange={this.change.bind(this)} name="Name" />
                                    </div>
                                    <div className="ms-Grid-col ms-sm12 ">
                                        <TextField label="Description" value={this.state.Description} placeholder="Provide the Ad Description" className='PostAdDesc' type="textarea" multiline rows={5} onChange={this.change.bind(this)} name="Description" />
                                    </div>

                                    {this.props.Attributes != null && this.props.Attributes.map((item: any) =>
                                        <div className="ms-Grid-col ms-sm12">
                                            <TextField label={item.name} className='PostAdTitle' key={item.ID} type={item.type.toLowerCase().trim()} name={item.name} onChange={this.change.bind(this)} />
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>

                        <div className="ms-Grid-row">

                            {this.state.imgToBeUploaded.length === 0 ?
                                <div className="ms-Grid-col ms-sm12 DragDropCol" >
                                    <Dropzone onDrop={this.handleOnDrop} accept={acceptedFileTypesArray} maxSize={imageMaxSize}>
                                        {({ getRootProps, getInputProps }) => (
                                            <section>
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <div className="ms-Grid-row PostAdImage">
                                                        <div className="ms-Grid-row pos">
                                                            <div className="ms-Grid-col ms-sm12">
                                                                <img src={require('./images.png')} width={128} height={128} alt="ad" />
                                                                <div>
                                                                    <DefaultButton text="+Add images" allowDisabledFocus={true} />
                                                                    <Label>(optional)</Label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </section>
                                        )}
                                    </Dropzone>
                                    <div className="ms-Grid-row PostAdImageCarsol">
                                        <div className="ms-Grid-col ms-sm12">
                                            <div className="Carasol text-muted">
                                                <h3 className=" text-muted">No images added...</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="ms-Grid-col ms-sm12 DragDropCol" >
                                    <Dropzone onDrop={this.handleOnDrop} accept={acceptedFileTypesArray} maxSize={imageMaxSize}>
                                        {({ getRootProps, getInputProps }) => (
                                            <section>
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <div className="ms-Grid-row PostAdImage">
                                                        <div className="ms-Grid-col ms-sm12 DragDropCol" >
                                                            <Card>
                                                                <div className='ProdImgView'>
                                                                    <img src={this.state.imgsrc} alt="avengers" className='prodimg' />
                                                                    <i className="fas fa-plus"></i>
                                                                </div>
                                                            </Card>
                                                        </div>
                                                    </div>
                                                </div>

                                            </section>
                                        )}
                                    </Dropzone>
                                    <div className="ms-Grid-row Carousel-inner asd">
                                        <div className="ImageslideMainDiv"
                                            style={{
                                                transform: `translate(-${100 * (this.state.StartIndex / 4)}%)`,
                                                gridTemplateColumns: `repeat(${this.state.imgToBeUploaded.length},${100 / 5}%)`,
                                            }}>
                                            {this.state.imgToBeUploaded.map((item: any) => <div className="item ">
                                                <div className="">
                                                    <img src={item} className="img-responsive" width={128} height={128} onClick={() => { this.DisplayImage(item) }} />
                                                    <i className="far fa-trash-alt" onClick={() => { this.DeleteImage(item) }}></i>
                                                </div>
                                            </div>)}
                                        </div>
                                        <a href="#theCarousel" className="left carousel-control left" onClick={() => this.OnclickLeft()}>
                                            <i className="fas fa-chevron-left ChevronIcon"></i>
                                        </a>
                                        <a href="#theCarousel" className="right carousel-control right" onClick={() => this.OnclickRigth()}>
                                            <i className="fas fa-chevron-right ChevronIcon"></i>
                                        </a>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    {/* Right side */}
                    < div className="ms-Grid-col ms-lg4 ownerInfo" >

                        <div className="ms-Grid-row">
                            <div className="card PersoninfoMainDiv">
                                <div>
                                    <div className="ms-Grid-row">
                                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg12">
                                            <h5 className='publish'>Publishing Details</h5>
                                        </div>
                                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2"></div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="ms-Grid-row">
                                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                                            <img width={32} height={32} src={require('./images.png')} alt="propic" className="img-circle propic" />
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
                                                <i className="fas fa-envelope mailicon text-muted"></i>
                                            </div>
                                            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                                                <p className="postownmail text-muted">abcdef@gh.com</p>
                                            </div>
                                        </div>
                                        <div className="ms-Grid-row">
                                            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                                                <i className="fas fa-phone phoneicon"></i>
                                            </div>
                                            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                                                <p className="postownnumber">1234567890</p>
                                            </div>
                                            <div>
                                                <div className="ms-Grid-col ms-sm6">
                                                    <Checkbox label="Show contact number" name="ViewContact" onChange={this.change.bind(this)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ms-Grid-row">
                                            <div className="ms-Grid-col ms-sm7">
                                                <TextField label="Ad expires in" suffix="days" ariaLabel="Example text field with https:// prefix" value={this.state.Expiry} onChange={this.change.bind(this)} type="number" name="Expiry" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ms-Grid-row">
                                        <div className="ms-Grid-col ms-sm4"></div>
                                        <div className="ms-Grid-col ms-sm8">
                                            <div className="ms-Grid-col ms-sm1"></div>
                                            <div className="ms-Grid-col ms-sm4">
                                                <Link to="/MyClassifieds/ActiveClassifieds">
                                                    <PrimaryButton className="Reportbutton" text="Cancel" allowDisabledFocus={true} />
                                                </Link>
                                            </div>
                                            <div className="ms-Grid-col ms-sm6">
                                                <PrimaryButton className="Offeradbutton" text="Post Ad" allowDisabledFocus={true} type="button" value="Add" onClick={this.submit.bind(this)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ms-Grid-row"></div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </div >
        );
    }
}

function mapStateToProps(state: any) {
    debugger;
    return {
        Attributes: state.CategoriesReducer.Attributes,
        Categories: state.CategoriesReducer.Categories
    };
}

export default connect(mapStateToProps, undefined)(PostAdd);
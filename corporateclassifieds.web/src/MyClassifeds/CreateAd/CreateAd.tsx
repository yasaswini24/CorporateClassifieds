import React from 'react';
import './CreateAd.sass';
import { connect } from 'react-redux';
import { AttributesFetch } from "../../Actions/AttributesActions";
import { CategoriesFetch } from '../../Actions/CategoryActions';
import { postAd } from '../../Actions/AdActions';



// interface IState {
//     Type: string,
//     Category: { id: number },
//     Price: number,
//     Name: string,
//     Description: string,
//     CreatedByUser: { id: number },
//     ModifiedByUser: { id: number },
//     Status: { id: number },
//     Expiry: number
// }



class CreateAd extends React.Component<any, any> {


    componentDidMount() {
        this.props.dispatch(CategoriesFetch());
    }

    constructor(props: any) {
        super(props);
        this.state = { Type: "", CategoryDetails: { id: 1 }, Price: 0, Name: "", Description: "", CreatedByUser: { id: 1 }, ModifiedByUser: { id: 1 }, Status: { id: 1 }, Expiry: 0, Images: [] };
    }

    submit() {

        let Ad = this.state;
       
        console.log(JSON.stringify(Ad));
        this.props.dispatch(postAd(JSON.stringify(Ad)));
        this.setState({ Type: "", CategoryDetails: { id: 1 }, Price: 0, Name: "", Description: "", CreatedByUser: { id: 1 }, ModifiedByUser: { id: 1 }, Status: { id: 1 }, Expiry: 0 });



    }
    change(e: any) {
        this.setState(
            {
                [e.target.name]: e.target.value

            }
        );
    }

    getAttributes(e:any)
    {
        debugger;
        var categoryID=e.target.options[e.target.selectedIndex].id;
        this.setState({CategoryDetails:{id:categoryID}});
        this.props.dispatch(AttributesFetch(categoryID));
    }

    // ImagesUpload(e: any) {

    //     this.setState({ Images: [...this.state.Images, e.target.value] });
    // }

    GetUploadedPhoto(e: any) {
        debugger;
        // var base64Img=require('base64-img');
        // console.log(e.target.value);
        // var data=base64Img.base64(e.target.value, function(err:any, data:any) {});
        // var data2=base64Img.base64Sync(e.target.value);
        // this.setState({ Images: data });
        debugger;
    }

    render() {
        debugger;
        return (
            <div className="container">
                <table className="table">

                    <tbody>
                        <tr>
                            <td><label className="ms-Label">Ad Type</label></td>
                        </tr>
                        <tr className="Field">
                            <div className="ms-Dropdown">

                                <select className="ms-Dropdown-select" name="Type" onChange={this.change.bind(this)}>
                                    <option>--select--</option>
                                    <option>For Sale</option>
                                    <option>For Rent</option>



                                </select>
                            </div>
                        </tr>
                        <tr>
                            <td><label className="ms-Label">Category</label></td>
                        </tr>
                        <tr className="Field">
                            <div className="ms-Dropdown">

                                <select className="ms-Dropdown-select" name="CategoryDetails" onChange={this.getAttributes.bind(this)}>
                                    <option key="0">--select--</option>
                                    {
                                        this.props.Categories.map((category: any) =>
                                            <option key={category.id} id={category.id} >{category.name}</option>
                                        )
                                    }

                                </select>
                            </div>
                        </tr>
                        <tr>
                            <td><label>Price</label></td>
                        </tr>
                        <tr className="Field">

                            <input key="Price" type="number" name="Price" value={this.state.Price} onChange={this.change.bind(this)} />


                        </tr>
                        <tr>
                            <td> <label>Ad Name</label></td>
                        </tr>
                        <tr className="Field">

                            <input key="Name" type="textfield" name="Name" value={this.state.Name} onChange={this.change.bind(this)} />

                        </tr>
                        <tr>
                            <td><label>Description</label></td>
                        </tr>
                        <tr className="Field">
                            <input key="Description" type="textarea" name="Description" value={this.state.Description} onChange={this.change.bind(this)} />
                        </tr>
                        <tr>
                            <td><label>Expiry</label></td>
                        </tr>
                        <tr className="Field">
                            <input key="Expiry" type="number" name="Expiry" value={this.state.Expiry} onChange={this.change.bind(this)} />
                        </tr>

                        {
                            this.props.Attributes.map((Attribute: any) =>
                                <tr>
                                    <tr>
                                        <td><label>{Attribute.name}</label></td>
                                    </tr>
                                    <tr className="Field">
                                        <input key={Attribute.ID} type={Attribute.type.toLowerCase().trim()} name={Attribute.name} onChange={this.change.bind(this)} />
                                    </tr>
                                </tr>
                            )
                        }
 
                    </tbody>
                </table>
                <input type="file" multiple name="Images" accept="image/gif, image/jpeg"
                onChange={this.GetUploadedPhoto.bind(this)}
                />
                <input className="button" type="button" value="Add" onClick={this.submit.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        Attributes: state.AttributesReducer.Attributes,
        Categories: state.CategoriesReducer.Categories
    }
}

export default connect(mapStateToProps)(CreateAd);
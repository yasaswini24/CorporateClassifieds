import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'office-ui-fabric-react/dist/css/fabric.css';
import { initializeIcons } from '@uifabric/icons';
import { connect } from "react-redux";
import { Card, Table, ButtonToolbar, Overlay, Popover, Button, ListGroup, ListGroupItem, Modal } from 'react-bootstrap';
import { CategoriesFetch, RemoveCategoryByID, fetchCategoryByID, CategoryFetchBegin, UpsertCategoryByID, ChangeCategoryModalStatus } from '../../Actions/CategoryActions';
import './UpsertCategory.sass';
import { TextField, Dropdown, Checkbox, Label, Icon } from 'office-ui-fabric-react';
import { isTypeParameter } from '@babel/types';
initializeIcons();
interface IAttribute {
    Name?: string,
    Type?: string,
    Value?: string,
    Mandatory?: string,
    Description?: string
}
class UpsertCategory extends Component<any, any>
{
    constructor(props: any) {
        super(props);
        this.state = {
            UpsertCategory: { ID: 0, name: "", description: "", mandatory: false, Attributes: [], CreatedBy: 3, ModifiedBy: 3 }
        };
        this.props.CategoryID && this.props.dispatch(fetchCategoryByID(this.props.CategoryID));
    }
    componentWillReceiveProps(nextprops: any) {
        let upsertCategory = this.state.UpsertCategory;
        let attributes: any = [];
        nextprops.Attributes.map((Attribute: any) => {
            attributes = [...attributes, { Attribute, display: true }];
        });
        upsertCategory.Attributes = attributes;
        upsertCategory.name = nextprops.Category.name;
        upsertCategory.description = nextprops.Category.description;
        debugger;
        upsertCategory.ID = nextprops.CategoryID ?
            nextprops.CategoryID : this.state.UpsertCategory.ID;
        // console.log(attributes);
        this.state.UpsertCategory.Attributes == [] ? this.setState({ UpsertCategory: upsertCategory }) : this.setState({ Attributes: [] });

    }
    save() {
        // alert("save" + this.state.UpsertCategory.name + this.state.UpsertCategory.description + this.state.UpsertCategory.Attributes);
        // console.log(this.state.UpsertCategory.Attributes);
        let UpdatedCategory = this.state.UpsertCategory;
        let attributes: any = [];
        this.state.UpsertCategory.Attributes.map((a: any) => {
            if (a.display)
                attributes = [...attributes, a.Attribute];
        });
        // debugger;
        // alert(attributes);
        UpdatedCategory.Attributes = attributes;
        this.props.dispatch(UpsertCategoryByID(UpdatedCategory));
    }
    addAttribute() {
        let attributes: any = this.state.UpsertCategory.Attributes;
        attributes = [...attributes, { Attribute: { name: "", type: "Text", mandatory: false, value: "", CreatedBy: 3, ModifiedBy: 3 }, display: true }];
        this.setState({
            UpsertCategory: { ...this.state.UpsertCategory, Attributes: attributes }
        });

    }
    DeleteRow(id: number) {
        let items: any = this.state.UpsertCategory;
        items.Attributes[id] = false;
        this.setState({ UpsertCategory: items });
    }

    handleChange(e: any) {
        let upsertCategory = this.state.UpsertCategory;
        upsertCategory[e.target.name] = e.target.value
        this.setState({ UpsertCategory: upsertCategory });
    }

    handleCheckboxChange(index: number, e: any) {
        let UpsertCategory = this.state.UpsertCategory;
        let attribute = UpsertCategory.Attributes[index].Attribute;
        attribute[e.target.name] = e.target.checked;
        this.setState({ UpsertCategory: UpsertCategory });
    }
    handleAttributeChange(index: number, e: any) {
        // debugger;
        let UpsertCategory = this.state.UpsertCategory;
        let attribute = UpsertCategory.Attributes[index].Attribute;
        attribute[e.target.name] = e.target.value;
        this.setState({ UpsertCategory: UpsertCategory });

    }

    handleClose() {
        this.props.dispatch(ChangeCategoryModalStatus());
        this.props.UpsertCategoryStatus(false);
    }
    render() {
        return (
            <div>
                <Modal className="UpsertCategory" show={true} onHide={() => this.props.UpsertCategoryStatus(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>View & Edit :{this.state.UpsertCategory.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Title className="Description">
                        Add new category to the Classifieds
                            <Button variant="primary" onClick={this.save.bind(this)}>
                            save
                            </Button>
                    </Modal.Title>
                    <Modal.Body>
                        <div className="Form">
                            <div className="CategoryName">
                                <TextField label="Category Name" name="name" value={this.state.UpsertCategory.name} onChange={this.handleChange.bind(this)} />
                            </div>
                            <div className="CategoryIcon">
                                <Label>Icon</Label>
                                <select className="Icons">
                                    <li>
                                        <Icon iconName="Delete" className="ms-IconExample" />
                                    </li>
                                    <li>
                                        <Icon iconName="Delete" className="ms-IconExample" />
                                    </li>
                                    <li>
                                        <Icon iconName="Delete" className="ms-IconExample" />
                                    </li>


                                </select>

                            </div>
                        </div>
                        <div className="CategoryDescription">
                            <TextField label="Standard" name="description" multiline rows={3} value={this.state.UpsertCategory.description} onChange={this.handleChange.bind(this)} />
                        </div>
                        <div className="Attributes">
                            <h1>Attributes of the Category</h1>
                            <p>Attributes of an asset such as price,location,description etc</p>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <td>Field Name</td>
                                        <td className="Type">Field Type</td>
                                        <td>Values</td>
                                        <td>Mark as Mandatory</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>


                                    {this.state.UpsertCategory.Attributes.map((item: any, index: number) =>
                                        item.display &&
                                        <tr>
                                            <td>
                                                <TextField name="name" onChange={this.handleAttributeChange.bind(this, index)} value={this.state.UpsertCategory.Attributes[index].Attribute.name} />
                                            </td>
                                            <td>

                                                <select className="type" name="type" onChange={this.handleAttributeChange.bind(this, index)} value={this.state.UpsertCategory.Attributes[index].Attribute.type}>
                                                    <option>Text</option>
                                                    <option>Number</option>
                                                    <option>CheckBox</option>
                                                </select>
                                            </td>
                                            <td>
                                                <TextField name="value" onChange={this.handleAttributeChange.bind(this, index)} value={this.state.UpsertCategory.Attributes[index].Attribute.value} />
                                            </td>
                                            <td>
                                                <Checkbox name="mandatory" styles={{ root: { width: 150 } }} checked={this.state.UpsertCategory.Attributes[index].Attribute.mandatory == "1" ? true : false} onChange={this.handleCheckboxChange.bind(this, index)} />
                                            </td>
                                            <td>

                                                <Icon iconName="Delete" className="ms-IconExample" onClick={this.DeleteRow.bind(this, index)} />
                                            </td>
                                        </tr>
                                    )

                                    }


                                </tbody>
                            </Table>
                            <div className="AddAttribute" onClick={this.addAttribute.bind(this)}>
                                +Add Attribute
                            </div>
                        </div>
                    </Modal.Body>

                </Modal>


                {this.props.Updated && <Modal className="UpsertCategoryModal" show={true} onHide={this.handleClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Category Updation Successful</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose.bind(this)}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>}
            </div >

        );
    }
}
function mapStateToProps(state: any) {
    debugger;
    return {
        Category: state.CategoriesReducer.Category,
        Attributes: state.CategoriesReducer.Attributes,
        Updated: state.CategoriesReducer.UpsertCategorySuccess,
    }
}
export default connect(mapStateToProps)(UpsertCategory);














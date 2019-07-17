import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'office-ui-fabric-react/dist/css/fabric.css';
import { initializeIcons } from '@uifabric/icons';
import { connect } from "react-redux";
import { Card, Table, ButtonToolbar, Overlay, Popover, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { CategoriesFetch } from '../../Actions/CategoryActions';
import RemoveCategory from './RemoveCategory';
import UpsertCategory from './UpsertCategory';
import './Categories.sass';
initializeIcons();
class Categories extends Component<any, any>
{
    constructor(props: any) {
        super(props);
        this.state = { Categoryid: 0, DisplayPopUp: false, removeCategory: false, UpsertCategory: false ,AddCategory:false}
        this.props.dispatch(CategoriesFetch());
    }
    // componentWillMount() {
    // }
    handleClick(id: number) {
        //alert(id);
        this.setState({ Categoryid: id, DisplayPopUp: !this.state.DisplayPopUp });
    }
    UpsertCategoryStatus(status: any) {

        this.setState({ UpsertCategory: status });

    }

    RemoveCategoryStatus(status: any) {
        this.setState({ removeCategory: status });
    }

    AddCategoryStatus(status:any){
        this.setState({AddCategory:status});
    }
    render() {
        return (
            <div>
                <main className="content-wrapper">
                    <div className="header">
                        <h1>Categories</h1>
                        <p>Here you can manage categories.</p>

                        <div className="cta-button-panel" onClick={this.AddCategoryStatus.bind(this,true)}>

                            <div className="btn btn-primary">
                                + Add Category
                                </div>

                        </div>
                    </div>
                    <div className="Categories">
                        <Card className="CategoriesList">

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Description</th>
                                        <th>Created By</th>
                                        <th>Created On</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.Categories.map((Category: any) =>

                                        <tr>
                                            <td>{Category.name.trim()}</td>
                                            <td>{Category.description.trim()}</td>
                                            <td>System defined</td>
                                            <td>
                                                {
                                                    new Intl.DateTimeFormat('en-GB', {
                                                        month: 'short',
                                                        day: '2-digit',
                                                    }).format(new Date(Category.created))
                                                } ,
                                                    {
                                                    new Intl.DateTimeFormat('en-GB', {
                                                        year: 'numeric'
                                                    }).format(new Date(Category.created))
                                                }
                                            </td>
                                            <td className="MoreOptions" onClick={this.handleClick.bind(this, Category.id)}>

                                                {this.state.DisplayPopUp &&
                                                    Category.id == this.state.Categoryid &&
                                                    <Card className="PopUp">
                                                        <ListGroup>
                                                            <ListGroupItem onClick={this.UpsertCategoryStatus.bind(this, true)}>
                                                                <Card.Text >View & Edit</Card.Text>
                                                            </ListGroupItem>
                                                            <ListGroupItem onClick={this.RemoveCategoryStatus.bind(this, true)}>
                                                                <Card.Text >Remove</Card.Text>
                                                            </ListGroupItem>
                                                        </ListGroup>
                                                    </Card>
                                                }
                                            </td>


                                        </tr>

                                    )}


                                </tbody>
                            </Table>

                            {this.state.removeCategory && <RemoveCategory CategoryID={this.state.Categoryid} RemoveCategoryStatus={this.RemoveCategoryStatus.bind(this)} />}
                            {this.state.UpsertCategory && <UpsertCategory CategoryID={this.state.Categoryid} UpsertCategoryStatus={this.UpsertCategoryStatus.bind(this)} />}
                            {this.state.AddCategory && <UpsertCategory CategoryID={0} UpsertCategoryStatus={this.AddCategoryStatus.bind(this)} />}

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
        Categories: state.CategoriesReducer.Categories
    }
}
export default connect(mapStateToProps)(Categories);














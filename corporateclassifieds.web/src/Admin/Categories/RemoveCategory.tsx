import React, { Component } from 'react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { initializeIcons } from '@uifabric/icons';
import { connect } from "react-redux";
import { Button, Modal } from 'react-bootstrap';

import './RemoveCategory.sass';
import { RemoveCategoryByID, CategoriesFetch } from '../../Actions/CategoryActions';
initializeIcons();
class RemoveCategory extends Component<any, any>
{
    handleClose() {
        this.props.RemoveCategoryStatus(false);
    }

    handleYes() {
        //alert("deleted");
        debugger;
        this.props.dispatch(RemoveCategoryByID(this.props.CategoryID));
        this.props.RemoveCategoryStatus(false);

    }
    componentWillUnmount() {
        this.props.dispatch(CategoriesFetch());
    }
    render() {
        return (
            <div>

                <Modal className="RemoveCategory" show={true} onHide={this.handleClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you want to remove this category from the list ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                            No
                        </Button>
                        <Button variant="primary" onClick={this.handleYes.bind(this)}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
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
export default connect(mapStateToProps)(RemoveCategory);

















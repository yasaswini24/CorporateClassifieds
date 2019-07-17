import React, { Component } from 'react';
import { Card, Button, CardHeader, CardBody } from 'reactstrap';
import { TextField } from 'office-ui-fabric-react';
import './ReportAd.sass';
import { connect } from 'react-redux';
import { SubmitReport } from '../../../Actions/ReportActions';
interface Ireport{
    ReportDescription: string,
    ReportedBy : IUser,
    AdId : number,
    ReportCategory: string
}
interface IUser{
    ID: number
}
class ReportAd extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {  ReportDescription : "", ReportedBy: {Id: 4}, ReportCategory: "" };
    }
    change(e: any) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        );
    }
    submit = () =>{
        let report: Ireport = {ReportDescription: "", ReportedBy: {ID: 4}, AdId: 0, ReportCategory: "" };
        report.ReportDescription = this.state.ReportDescription;
        report.ReportedBy.ID = this.state.ReportedBy.Id;
        report.AdId = this.props.Adid;
        report.ReportCategory = this.state.ReportCategory;
        this.props.dispatch(SubmitReport(report)); 
        this.props.viewReport();   
        this.setState({
           ReportDescription : "", ReportedBy: {Id: 4}
        })
    }
    render() {
        return (
            <div className="ReportAdMainDiv">
                <div className="ReportAdInnerDiv">
                    <Card>
                        <CardHeader>
                            <h5 className="title">Report</h5>
                            <i className="fas fa-times closeIcon" onClick={() => { this.props.viewReport() }}></i>
                        </CardHeader>
                        <CardBody>
                            <div className="inputFieldsWrapper">
                                <p className="text-muted">Report Category</p>
                                <select className="ms-Dropdown-select" onChange = {this.change.bind(this)} name = "ReportCategory">
                                    <option>Select</option>
                                    <option>Fake Product</option>
                                    <option>Irrelavent Post</option>
                                    <option>Abuse Content</option>
                                </select>
                                <TextField label="Description" placeholder="Describe the Report here..." className='RSeportAdDesc' type="textarea" multiline rows={3} value = {this.state.Description} name="ReportDescription" onChange = {this.change.bind(this)} />
                            </div>
                            <Button className="reportButton" onClick = {() => {this.submit()}}>Report</Button>
                            <Button className="cancelButton" onClick={() => { this.props.viewReport() }}>cancel</Button>
                        </CardBody>
                    </Card> 
                </div>
            </div>
        );
    }
}

export default connect(undefined)(ReportAd);
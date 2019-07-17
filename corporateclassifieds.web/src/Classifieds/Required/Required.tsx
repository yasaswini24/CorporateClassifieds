import React,{Component} from 'react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { initializeIcons } from '@uifabric/icons';
import { connect } from "react-redux";
import './../SaleRent/SaleRent.sass'
initializeIcons();

class Required extends Component<any,any>
{
    render()
    {
        return(
            <div>
                <main className="content-wrapper">
                <div className="header">
                    <h1>Required</h1>
                    <p>Here you can manage categories.</p>

                    
                </div>
                </main>
        </div>
           
        );
    }
}
function mapStateToProps(state:any)
{
    return{
    user:state.user
    }
}
export default connect(mapStateToProps)(Required);














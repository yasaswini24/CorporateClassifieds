import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'office-ui-fabric-react/dist/css/fabric.css';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { initializeIcons } from '@uifabric/icons';
import './SideMenu.sass';
import { connect } from "react-redux";

initializeIcons();
class SideMenu extends Component<any, any>
{
  constructor(props: any) {
    super(props);
    this.state = { selectedMenuID: 'Classifieds' }
  }
  Active(e: any) {
    this.setState({ selectedMenuID: e.currentTarget.id });
    // document.getElementById(this.state.selectedMenuID).className="menu";
  }
  render() {
    return (

      <div className="sidebar">
        <nav>
          <Link to="/Classifieds/SaleRent" id="Classifieds" className={`menu${this.state.selectedMenuID == 'Classifieds' ? " active" : ""}`} onClick={this.Active.bind(this)}>
            <span className="sidebar-link-icon">
              <Icon iconName="Shop" />
            </span>
            <span className="sidebar-link-text">
              Classifieds
                    </span>
          </Link>

          <Link to="/MyClassifieds/ActiveClassifieds" id="MyClassifieds" className={`menu${this.state.selectedMenuID == 'MyClassifieds' ? " active" : ""}`} onClick={this.Active.bind(this)}>
            <span className="sidebar-link-icon">
              <Icon iconName="Shop" />
            </span>
            <span className="sidebar-link-text">
              My Classifieds
                    </span>
          </Link>

          <Link to="/Inbox/Offers" className={`menu${this.state.selectedMenuID == 'Inbox' ? " active" : ""}`} id="Inbox" onClick={this.Active.bind(this)}>
            <span className="sidebar-link-icon">
              <Icon iconName="MailSolid" />
            </span>
            <span className="sidebar-link-text">
              Inbox
                    </span>
          </Link>

          {this.props.IsUser && <Link to="/Admin/ReportedAds" className={`menu${this.state.selectedMenuID == 'Admin' ? " active" : ""}`} id="Admin" onClick={this.Active.bind(this)}>
            <span className="sidebar-link-icon">
              <Icon iconName="SecurityGroup" />
            </span>
            <span className="sidebar-link-text">
              Admin
                    </span>
          </Link>
          }

        </nav>
      </div>



    );
  }
}
function mapStateToProps(state: any) {
  debugger;
  return {
    IsUser: state.UserReducer.User.permission
  }
}
export default connect(mapStateToProps)(SideMenu);






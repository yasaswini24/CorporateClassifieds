import React from 'react';
import TopBar from "./Layout/TopBar/TopBar";
import './App.sass';
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import SideMenu from "./Layout/SideMenu/SideMenu";
import Classifieds from "./Classifieds/Classifieds";
import MyClassifieds from "./MyClassifeds/MyClassifieds";
import Admin from './Admin/Admin';
import { fetchAds } from './Actions/AdActions';
import { connect } from 'react-redux';
import ServerError from "./ErrorPages/ServerError";
import Inbox from './Inbox/Inbox';
import InfinityGIF from './Layout/Infinity.gif';

class App extends React.Component<any, any> {

  render() {
    // const { error, loading } = this.props;
    if (this.props.error) {
      return <ServerError />
    }

    return (
      <Router>
        <TopBar />

        <div className="App" >
          {this.props.loading == true && <div className="MainPageSpinner">
            {/* <h1>Team Infinity...</h1> */}
            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="loader" /> */}
            <img src={InfinityGIF} alt="loader" />
          </div>}

          <div className="row flex">

            <SideMenu />

            <div className="main-content">

              
              <Route path="/Classifieds" component={Classifieds} />
              <Route path="/MyClassifieds" component={MyClassifieds} />
              <Route path="/Admin" component={Admin} />
              <Route path="/Inbox" component={Inbox} />

              <Redirect to="/Classifieds/SaleRent"/>
            </div>

          </div>


        </div>
      </Router>

    );
  }
}

function mapStateToProps(state: any) {
  return {
    error: state.AdReducer.error,
    loading: state.AdReducer.loading
  }
}


export default connect(mapStateToProps)(App);

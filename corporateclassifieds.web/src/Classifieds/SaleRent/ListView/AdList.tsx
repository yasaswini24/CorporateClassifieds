import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import 'office-ui-fabric-react/dist/css/fabric.css';
import Icon from 'react-icons-kit';
import { ic_location_city } from 'react-icons-kit/md/ic_location_city';
import "./ListView.sass";
import { fetchImagesOfAd } from "../../../Actions/ImageActions";
import { fetchAdByID } from '../../../Actions/AdActions';

class AdList extends Component<any, any>{

  componentDidMount() {

    console.log("ad mounted");
    //this.props.dispatch(fetchImagesOfAd(this.props.item.id));

  }

  DisplayAd = (AdID: number) => {
    // alert(AdID);
    this.props.dispatch(fetchAdByID(AdID));
  }


  render() {
    debugger;
    return (<div className="ms-Grid List ListItem" dir="ltr" onClick={this.DisplayAd.bind(this, this.props.item.id)}>

      <div className="ms-Grid-row">

        <div className="ms-Grid-col ms-sm5">

          <div className="ms-Grid-col ms-sm2  imageOfAdInList">
            {

              this.props.item.images[0] == null ?
                <img className="ListProductImage" src="https://capitant.be/wp-content/themes/capitant/assets/images/no-image.png" alt="Ad" /> :
                <img className="ListProductImage" src={"data:image/jpeg;base64," + this.props.item.images[0].image} alt="Ad" />
            }
          </div>

          <div className="ms-Grid-col ms-sm8 block PostDetails">

            <div className="ms-Grid-row">
              <Icon className="CategoryIcon" size={25} icon={ic_location_city} />
              {this.props.item.name}
            </div>

            <div className="ms-Grid-row description">
              {this.props.item.description}
            </div>

          </div>

        </div>
        <div className="ms-Grid-col ms-sm7">

          <div className="ms-Grid-col ms-sm2 block Price">
            <span className="Tag">
              &#x20b9;
              </span>
            {this.props.item.price}
          </div>
          <div className="ms-Grid-col ms-sm3 block User">

            <div className="ms-Grid-row name">
              {this.props.item.createdByUser.name}
            </div>
            <div className="ms-Grid-row PostedOn">
              {
                new Intl.DateTimeFormat('en-GB', {
                  month: 'short',
                  day: '2-digit',

                }).format(new Date(this.props.item.created))
              } ,
                            {
                new Intl.DateTimeFormat('en-GB', {
                  year: 'numeric'

                }).format(new Date(this.props.item.created))
              }
            </div>

          </div>

          <div className="ms-Grid-col ms-sm3 block Expiry">

            {
              new Intl.DateTimeFormat('en-GB', {
                month: 'short',
                day: '2-digit',

              }).format(new Date(this.props.item.expiry))
            } ,
                            {
              new Intl.DateTimeFormat('en-GB', {
                year: 'numeric'

              }).format(new Date(this.props.item.expiry))
            }
          </div>

          <div className="ms-Grid-col ms-sm2  block Offers">

            {this.props.item.offersCount}

          </div>

          <div className="ms-Grid-col ms-sm2 block Comments">

            {this.props.item.commentsCount}

          </div>

        </div>

      </div>

    </div>);
  }
}

function mapStateToProps(state: any) {
  return {
    ImagesAvailable: state.ImageReducer.loaded,
    Images: state.ImageReducer.Images
  }
}
export default connect(mapStateToProps)(AdList);
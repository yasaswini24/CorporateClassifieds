import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux';
import 'office-ui-fabric-react/dist/css/fabric.css';
import FiltersBar from '../../FilterBar/FiltersBar';
import "./ListView.sass";
import AdList from './AdList';
import { fetchAds, getFilterList } from '../../../Actions/AdActions';


class ListView extends Component<any, any>{

  // scrolled = (scroll: any) => {
  //   debugger;
  //   if (scroll.target.scrollTop + scroll.target.clientHeight + 100 >= scroll.target.scrollHeight && this.props.loading == false) {
  //     this.props.dispatch(fetchAds(this.props.AdListItem.length));
  //   }
  // }

  scrolled = (scroll: any) => {
    const FilterList: any = { AdType: [...this.props.FilterList.AdType], Category: [...this.props.FilterList.Category], Posted: [...this.props.FilterList.Posted], Location: [...this.props.FilterList.Location], Search: this.props.FilterList.Search, start: this.props.AdListItem.length };
    debugger;
    if (scroll.target.scrollTop + scroll.target.clientHeight + 100 >= scroll.target.scrollHeight && this.props.loading == false) {
      this.props.dispatch(getFilterList(FilterList));
      this.props.dispatch(fetchAds(FilterList));
    }
  }



  render() {
    return (
      <div className="ListItemGrid" >
        <div className="ms-Grid List ListItemHeader" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm5">

              <div className="ms-Grid-col ms-sm3  block">
                ITEM OR SELL
                    </div>

              <div className="ms-Grid-col ms-sm10">
                <div className="ms-Grid-row">

                </div>
                <div className="ms-Grid-row block3">

                </div>
              </div>

            </div>

            <div className="ms-Grid-col ms-sm7">

              <div className="ms-Grid-col ms-sm2 block">PRICE</div>

              <div className="ms-Grid-col ms-sm3 block">
                <div className="ms-Grid-row name">POSTED  BY</div>
              </div>

              <div className="ms-Grid-col ms-sm3 block">EXPIRES ON</div>

              <div className="ms-Grid-col ms-sm2  block">OFFER COUNT</div>

              <div className="ms-Grid-col ms-sm2 block ">COMMENT COUNT</div>

            </div>


          </div>

        </div>
        <div className="Scrolltest" onScroll={this.scrolled.bind(this)} >

          {this.props.AdListItem.map((item: any, index: number) =>
            <AdList key={item.id} item={item} />
          )}

        </div>
      </div>


    );
  }
}
function mapStateToProps(state: any) {
  debugger;
  return {
    error: state.AdReducer.error,
    loading: state.AdReducer.loading,
    Ads: state.AdReducer.Ads,
    FilterList: state.AdReducer.FilterList
  }
}

export default connect(mapStateToProps, undefined)(ListView);
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux';
import FiltersBar from '../../FilterBar/FiltersBar';
import { AdCard } from './AdCard';
import './GridView.sass';
import { fetchAds, getFilterList } from '../../../Actions/AdActions';

class Gridview extends Component<any, any>{

    // scrolled = (scroll: any) => {
    //     debugger;
    //     if (scroll.target.scrollTop + scroll.target.clientHeight + 100 >= scroll.target.scrollHeight && this.props.loading == false) {
    //         this.props.dispatch(fetchAds(this.props.AdGridItem.length));
    //     }
    // }

    scrolled = (scroll: any) => {
        const FilterList: any = { AdType: [...this.props.FilterList.AdType], Category: [...this.props.FilterList.Category], Posted: [...this.props.FilterList.Posted], Location: [...this.props.FilterList.Location],Search : this.props.FilterList.Search, start: this.props.AdGridItem.length };
        if (scroll.target.scrollTop + scroll.target.clientHeight + 100 >= scroll.target.scrollHeight && this.props.loading == false) {
            debugger;
            this.props.dispatch(getFilterList(FilterList));
            debugger;
            this.props.dispatch(fetchAds(FilterList));
        }
    }


    render() {
        return (
            <div className="Gridview" onScroll={this.scrolled.bind(this)}>
                {this.props.AdGridItem.map((item: any) =>
                    <AdCard  {...this.props} key={item.id} item={item} />
                )}
            </div>

        );
    }
}
function mapStateToProps(state: any) {

    return {
        error: state.AdReducer.error,
        loading: state.AdReducer.loading,
        FilterList: state.AdReducer.FilterList
        // AdGridItem: state.AdReducer.Ads
    };
}

export default connect(mapStateToProps, undefined)(Gridview);
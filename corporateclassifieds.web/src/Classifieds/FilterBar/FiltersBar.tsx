import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { DefaultButton } from 'office-ui-fabric-react';
import { undo } from 'react-icons-kit/fa/undo'
import Icon from 'react-icons-kit';
import { list2 } from 'react-icons-kit/icomoon/list2'
import { ic_apps } from 'react-icons-kit/md/ic_apps';
import "./FiltersBar.sass";
import { connect } from 'react-redux';
import { applyFilters, changeview, clear, getFilterList, fetchAds } from '../../Actions/AdActions';
initializeIcons();



class FiltersBar extends Component<any, any>
{
  constructor(props: any) {
    super(props);
    this.state = {
      selectedItems: {
        AdType: [], Category: [], Posted: [], Location: [], Search: ""
      }
    }
  }

  ChangeView = (ViewID: number) => {
    this.props.dispatch(changeview(ViewID));
  }

  private Filter = (e: any, item: any): void => {
    debugger;
    const AdType = [...this.state.selectedItems.AdType];
    const Category = [...this.state.selectedItems.Category];
    const Posted = [...this.state.selectedItems.Posted];
    const Location = [...this.state.selectedItems.Location];
    let Search = this.state.selectedItems.Search;
    if (e.target.id == "Dropdown1") {
      if (item.selected) {
        AdType.push(item.text as string);
      }
      else {
        const currIndex = AdType.indexOf(item.text as string);
        if (currIndex > -1) {
          AdType.splice(currIndex, 1);
        }
      }
    }

    else if (e.target.id == "Dropdown2") {

      if (item.selected) {
        Category.push(item.text as string);
      }
      else {
        const currIndex = Category.indexOf(item.text as string);
        if (currIndex > -1) {
          Category.splice(currIndex, 1);
        }
      }
    }

    else if (e.target.id == "Dropdown3") {

      if (item.selected) {
        Posted.push(item.text as string);
      }
      else {
        const currIndex = Posted.indexOf(item.text as string);
        if (currIndex > -1) {
          Posted.splice(currIndex, 1);
        }
      }
    }

    else if (e.target.id == "Dropdown4") {

      if (item.selected) {
        Location.push(item.text as string);
      }
      else {
        const currIndex = Location.indexOf(item.text as string);
        if (currIndex > -1) {
          Location.splice(currIndex, 1);
        }
      }
    }
    const FiltersList = { AdType: AdType, Category: Category, Posted: Posted, Location: Location, Search: Search, start: 0 };
    this.setState({
      selectedItems: FiltersList
    });
    console.log(FiltersList);
    // this.props.dispatch(applyFilters(FiltersList));
    this.props.dispatch(clear("Classifieds"));
    this.props.dispatch(getFilterList(FiltersList));
    this.props.dispatch(fetchAds(FiltersList));
  };


  search = (e: any) => {
    const AdType = [...this.state.selectedItems.AdType];
    const Category = [...this.state.selectedItems.Category];
    const Posted = [...this.state.selectedItems.Posted];
    const Location = [...this.state.selectedItems.Location];
    let Search = this.state.selectedItems.Search;
    // if (e.key === "Enter") {
    Search = e.target.value
    debugger;
    const FiltersList = { AdType: AdType, Category: Category, Posted: Posted, Location: Location, Search: Search, state: 0 };
    this.setState({
      selectedItems: FiltersList
    });
    this.props.dispatch(clear("Classifieds"));
    this.props.dispatch(getFilterList(FiltersList));
    this.props.dispatch(fetchAds(FiltersList));
    // }
  }

  render() {
    var Categories: any = []
    return (
      <div className="ms-Grid List FiltersBar" dir="ltr">
        <div className="ms-Grid-row">

          <div className="ms-Grid FiltersBar" dir="ltr">
            <div className="ms-Grid-col ms-sm7 DropDownFilters">
              <div className="ms-Grid-col ms-sm2 AdTypeDropDown">
                <Dropdown
                  className="testing"
                  placeholder="Ad Type"
                  id="Dropdown1"
                  onChange={this.Filter.bind(this)}
                  multiSelect
                  options={[
                    { key: 'sale', text: 'For Sale' },
                    { key: 'rent', text: 'For Rent' }
                  ]}


                />
              </div>
              <div className="ms-Grid-col ms-sm3 CategoryDropDown">
                {
                  this.props.Categories.map((item: any) => {
                    debugger;
                    Categories.push({ text: item.name })
                  }
                  )

                }
                <Dropdown
                  placeholder="Category"
                  options={Categories}
                  id="Dropdown2"
                  onChange={this.Filter.bind(this)}
                  multiSelect
                />
              </div>
              <div className="ms-Grid-col ms-sm3 PostedDropDown">
                <Dropdown
                  placeholder="Posted"
                  multiSelect
                  id="Dropdown3"
                  onChange={this.Filter.bind(this)}
                  options={[
                    { key: 'vehicle', text: 'Vehicle' },
                    { key: 'property', text: 'Property' }
                  ]}
                />
              </div>
              <div className="ms-Grid-col ms-sm4 LocationDropDown">
                <Dropdown
                  placeholder="Location"
                  multiSelect
                  id="Dropdown4"
                  onChange={this.Filter.bind(this)}
                  options={[
                    { key: 'Hyderabad', text: 'Hyderabad' },
                   { key: 'Mysore', text: 'Mysore' },
                    { key: 'Kakinada', text: 'Kakinada' }
                  ]}
                />
              </div>

            </div>
            <div className="ms-Grid-col ms-sm5 Search">
              <div className="ms-Grid-col ms-sm8 SearchBar">
                <SearchBox onKeyUp={(e: any) => { this.search(e) }} tabIndex={0}/>
              </div>
              <div className="ms-Grid-col ms-sm2 Reset">
                <DefaultButton className="ResetButton">
                  <Icon size={20} icon={undo} />
                  <label>Reset</label>
                </DefaultButton>
              </div>

              <div className="ms-Grid-col ms-sm1 GridViewOption">

                <DefaultButton onClick={this.ChangeView.bind(this, 0)}>
                  <Icon size={30} icon={ic_apps} />
                </DefaultButton>

              </div>


              <div className="ms-Grid-col ms-sm1 ListViewOption" >

                <DefaultButton onClick={this.ChangeView.bind(this, 1)}>
                  <Icon size={20} icon={list2} />
                </DefaultButton>

              </div>

            </div></div>
        </div>
      </div>

    );

  }


}

function mapStateToProps(state: any) {
  return {
    Categories: state.CategoriesReducer.Categories
  }
}
export default connect(mapStateToProps)(FiltersBar);
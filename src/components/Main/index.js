import React, { Component } from 'react';
import './styles.sass';
import Item from '../Item/index';
import Pagination from '../Pagination/Pagination';
// import { hashHistory} from 'react-router';

import perfumeData from '../../assets/productlist.json';
class Homepage extends Component {
  constructor() {
      super();

      this.state = {
          perfumeItems: perfumeData,
          pageOfItems: [],
          currPage: 1,
          pageSize: 9
      };

      // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
      this.onChangePage = this.onChangePage.bind(this);
      this.onSelectSoryByChange = this.onSelectSoryByChange.bind(this);
      this.onSelectNumberChange = this.onSelectNumberChange.bind(this);
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems:  pageOfItems});
  }
  //type = price, rating, name etc
  //order = low to high vise versa
  sortData(type, order) {

    let newData = this.state.perfumeItems.slice(0);
    let newOrder = order === 'lowest' ? -1 : 1;

    newData.sort((a, b) => {
      if (a[type] < b[type])
        return newOrder;
      if (a[type] > b[type])
        return -newOrder;
      return 0;
    })
    this.setState({ perfumeItems: newData});
  }
  onSelectSoryByChange(){
    let value = document.getElementById("sort-option").value;
    if(!value) return;
    let type = value.split(' ')[0];
    let order = value.split(' ')[1];
    this.sortData(type, order);
    this.setState({currPage: 1});
  }

  onSelectNumberChange(){
    let value = document.getElementById("select-num-to-show").value;
    if(!value) return;

    this.setState({pageSize: parseInt(value)});
  }
  render() {
    return (
      <div>
          <select className="form-control" id="sort-option" onChange={this.onSelectSoryByChange}>
              <option value=''>Sort by</option>
              <option value='price lowest'>Price: Low to High</option>
              <option value='price highestt'>Price: High to Low</option>
              <option value='rating highest'>Rating</option>
              <option value='name lowest'>Name: A - Z</option>
              <option value='name highest'>Name: Z - A</option>
          </select>

          <main className="main">
              {this.state.pageOfItems.map((item, index) => <Item key={index} myData={item} />)}
          </main>
          <Pagination items={this.state.perfumeItems} onChangePage={this.onChangePage} currPage={this.state.currPage} pageSize={this.state.pageSize} />

          <select className="form-control" id="select-num-to-show" onChange={this.onSelectNumberChange}>
              <option value='9'>Select number of items to show</option>
              <option value='10'>10</option>
              <option value='30'>30</option>
              <option value='60'>60</option>
              <option value='120'>120</option>
          </select>
      </div>
    );
  }
}

export default Homepage;

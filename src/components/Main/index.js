import React, { Component } from 'react';
import './styles.sass';
import Item from '../Item/index';
import Pagination from '../Pagination/Pagination';
import { hashHistory} from 'react-router';

import myData from '../../assets/productlist.json';
class Homepage extends Component {
  constructor() {
        super();

        var exampleItems = myData;
        this.state = {
            exampleItems: exampleItems,
            pageOfItems: [],
            currPage: 1
        };

        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }
  // componentWillMount(){
  //   if(this.state.sortBy && this.state.sortBy == 'price'){
  //     this.sortByPrice();
  //   }
  // }
  onChangePage(pageOfItems, page) {
    // update state with new page of items
    this.setState({ pageOfItems:  pageOfItems});
    hashHistory.replace('/page/'+page);

  }
  //type = price, rating, name etc
  //order = low to high vise versa
  sortData(type, order) {

    let newData = this.state.exampleItems.slice(0);
    // hashHistory.replace('/page/1');
    // this.setState({currPage: 1})

    let newOrder = order === 'lowest' ? -1 : 1;

    newData.sort((a, b) => {
      if (a[type] < b[type])
        return newOrder;
      if (a[type] > b[type])
        return -newOrder;
      return 0;
    })
    this.setState({ exampleItems: newData});
  }
  onSelectChange(){
    let value = document.getElementById("sort-option").value;
    if(!value) return;
    let type = value.split(' ')[0];
    let order = value.split(' ')[1];
    this.sortData(type, order);
    this.setState({currPage: 1});
  }

  render() {
    return (
      <div>
          <select className="form-control" id="sort-option" onChange={this.onSelectChange}>
              <option value=''>Sort by</option>
              <option value='price lowest'>Price: Low to High</option>
              <option value='price highestt'>Price: High to Low</option>
              <option value='rating highest'>Rating</option>
              <option value='name lowest'>Name: A - Z</option>
              <option value='name highest'>Name: Z - A</option>
          </select>
          <main className="main">
              {this.state.pageOfItems.map((item, index) =><Item key={index} myData={item}/>)}
          </main>
          <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} currPage={this.state.currPage} />
      </div>
    );
  }
}

export default Homepage;

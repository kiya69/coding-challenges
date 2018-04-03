import React, { Component } from 'react';
import './styles.sass';
import Item from '../Item/index';
import Pagination from '../Pagination/Pagination';
import { hashHistory} from 'react-router';

import myData from '../../assets/productlist.json';
class Homepage extends Component {
  constructor() {
        super();

        // an example array of items to be paged
        var exampleItems = myData;//_.range(1, 151).map(i => { return { id: i, name: 'Item ' + i }; });
        this.state = {
            exampleItems: exampleItems,
            pageOfItems: [],
            currPage: 1
        };

        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
    }
  componentWillMount(){
    if(this.state.sortBy && this.state.sortBy == 'price'){
      this.sortByPrice();
    }
  }
  componentDidMount() {
    document.body.scrollTop = 0;
    // document.querySelector('.menu').classList.remove('open');
    // console.log('myData', myData);
  }
  onChangePage(pageOfItems) {
        // update state with new page of items
        // debugger
        this.setState({ pageOfItems:  pageOfItems});

  }
  //type = price, rating, name etc
  //order = low to high vise versa
  sortData(type, order) {

    let newData = this.state.exampleItems.slice(0);
    // browserHistory.push('/page/'+1);
    hashHistory.replace('/page/1');
    this.setState({currPage: 1})

    let newOrder = order === 'lowest' ? -1 : 1;

    //lowest first
    newData.sort((a, b) => {
      if (a[type] < b[type])
        return newOrder;
      if (a[type] > b[type])
        return -newOrder;
      return 0;
    })
    // console.log(newData);
    // this.onChangePage(newData);
    this.setState({ exampleItems: newData, sortBy: 'price' });
  }
  onSelectChange(){
    let value = document.getElementById("sort-option").value;
    if(!value) return;
    let type = value.split(' ')[0];
    let order = value.split(' ')[1];
    this.sortData(type, order);
  }
  sortByPrice() {
    let newData = this.state.exampleItems.slice(0);
    // browserHistory.push('/page/'+1);

    //lowest first
    newData.sort((a, b) => {
      if (a.price < b.price)
        return -1;
      if (a.price > b.price)
        return 1;
      return 0;
    })
    // console.log(newData);
    // this.onChangePage(newData);
    this.setState({ exampleItems: newData, sortBy: 'price' });
  }
  sortByPriceHighest() {
    let newData = this.state.exampleItems.slice(0);
    // browserHistory.push('/page/'+1);

    //lowest first
    newData.sort((a, b) => {
      if (a.price < b.price)
        return 1;
      if (a.price > b.price)
        return -1;
      return 0;
    })
    // console.log(newData);
    debugger
    // this.onChangePage(newData);
    this.setState({ exampleItems: newData, sortBy: 'price' });
  }
  // <Link to={"/page/1"} onClick={this.sortByPrice.bind(this)}>sortByPrice</Link>
  render() {
    // myData.map((e, i) => console.log('myData',e,i));
    // debugger
    return (
      <div>
          <select className="form-control" id="sort-option" onChange={() => this.onSelectChange()}>
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
          <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} currentPage={this.state.currPage} />
      </div>
    );
  }
}

export default Homepage;

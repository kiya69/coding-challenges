import React, { Component } from 'react';

import './styles.sass';

class Item extends Component {
  linkToProduct(url){
    window.location.href = url;
  }
  render() {

    let price = this.props.myData.price.toString();
    price = price.slice(0, -2) + ',' + price.slice(-2, price.length);
    let productUrl = 'https://www.flaconi.de/'+this.props.myData.slug;
    return(
      <div className="item">
        <div className="content" onClick={() => this.linkToProduct(productUrl)} >
          <img className='product-image' src={this.props.myData.image} />
          <div className='productText'>
              <div className='perfumeName'>{this.props.myData.name.split('Eau de')[0]}</div>
              <div className='perfume-type'>{this.props.myData.type}</div>
              <div className="price">{price} € /  {this.props.myData.size}</div>
          </div>
          <div className="star-ratings-sprite"><span style={{width: this.props.myData.rating + '%'}} className="star-ratings-sprite-rating"></span></div>
        </div>
      </div>
    );
  }
}

export default Item;

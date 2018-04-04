import React, { Component } from 'react';
import './styles.sass';

class ErrorPage extends Component {
  componentDidMount() {
    document.body.scrollTop = 0;
  }
  render() {
    return (
      <h3 className="error text-center">404(Page Not Found)</h3>
    );
  }
}

export default ErrorPage;

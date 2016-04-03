import React from 'react';
import { Link } from 'react-router';
import MyComponent from 'component/myComponent';

module.exports = class extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <div>
      <header>
        <ul>
          <li><Link to="/article" activeClassName="active">article</Link></li>
          <li><Link to="/article/add" activeClassName="active">article/add</Link></li>
        </ul>
      </header>
      <MyComponent/>
      {this.props.children}
    </div>;
  }
};
